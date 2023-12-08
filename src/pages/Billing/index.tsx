import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';

import PaginationComponent from 'components/organisms/Common/Pagination';

import request from 'utils/axios';

import styles from './styles.module.scss';

interface IBilling {
    id: string;
    account: string;
    name: string;
    cost: number;
    startAt: string | null;
    endAt: string | null;
}

export default function Billing() {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);
    const [firstView, setFirstView] = useState<boolean>(true);

    const [billingList, setBillingList] = useState<IBilling[]>([]);

    const [startAt, setStartAt] = useState<string>('');
    const [endAt, setEndAt] = useState<string>(new Date().toISOString());

    useEffect(() => {
        const getBillingList = async () => {
            try {
                const res = await request(
                    'GET',
                    `/v1/admins/billings?page=${currentPage}&size=15&firstView=${firstView}&startAt=${startAt}&endAt=${endAt}`
                );

                setBillingList(res.data);
                if (res.pageCount) setPageCount(res.pageCount);
            } catch (e) {
                if (isAxiosError(e)) alert(e.response?.data.message);
            }
        };

        getBillingList();
    }, [startAt, endAt, currentPage]);

    return (
        <>
            <div className={styles.buttonArea}>
                <span>startAt</span>
                <input
                    type="date"
                    value={startAt.split('T')[0]}
                    max={endAt.split('T')[0]}
                    onChange={(e) => setStartAt(new Date(e.target.value).toISOString())}
                />
                <span>endAt</span>
                <input
                    type="date"
                    value={endAt.split('T')[0]}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setEndAt(new Date(e.target.value).toISOString())}
                />
            </div>
            <div className={styles.container}>
                {billingList.length > 0 ? (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>hostid</th>
                                    <th>name</th>
                                    <th>cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {billingList.map((billing) => (
                                    <tr key={billing.id}>
                                        <td
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => navigate(`/billing/${billing.id}`)}
                                        >
                                            {billing.id}
                                        </td>
                                        <td>{billing.name}</td>
                                        <td>{`${Number(billing.cost).toFixed(2)} $`}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <PaginationComponent
                            currentPage={currentPage}
                            pageCount={pageCount}
                            setPage={setCurrentPage}
                            setFirstView={setFirstView}
                        />
                    </>
                ) : (
                    <div>빌링내역이 없습니다.</div>
                )}
            </div>
        </>
    );
}
