import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isAxiosError } from 'axios';

import PaginationComponent from 'components/organisms/Common/Pagination';

import request from 'utils/axios';
import { dateForm } from 'utils/dateForm';

import styles from './styles.module.scss';

interface IBilling {
    id: string;
    type: string;
    status: string;
    createdAt: string;
    sessionCount: number;
    cost: number;
}

export default function HostBilling() {
    const { hostId } = useParams();
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);
    const [firstView, setFirstView] = useState<boolean>(true);

    const [billingList, setBillingList] = useState<IBilling[]>([]);

    useEffect(() => {
        const getBillingList = async () => {
            try {
                const res = await request(
                    'GET',
                    `/v1/hosts/${hostId}/billings?size=15&page=${currentPage}&firstView=${firstView}`
                );

                setBillingList(res.data);
                if (res.pageCount) setPageCount(res.pageCount);
            } catch (e) {
                if (isAxiosError(e)) alert(e.response?.data.message);
            }
        };

        getBillingList();
    }, [currentPage]);

    return (
        <>
            <div className={styles.buttonArea}></div>
            <div className={styles.container}>
                <table>
                    <thead>
                        <tr>
                            <th>applicationId</th>
                            <th>sessionCount</th>
                            <th>cost</th>
                            <th>createdAt</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billingList.map((billing) => (
                            <tr key={billing.id}>
                                <td>{billing.id}</td>
                                <td>{billing.sessionCount}</td>
                                <td>{`${billing.cost.toFixed(2)} $`}</td>
                                <td>{dateForm(billing.createdAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <PaginationComponent
                    pageCount={pageCount}
                    currentPage={currentPage}
                    setPage={setCurrentPage}
                    setFirstView={setFirstView}
                />
            </div>
        </>
    );
}
