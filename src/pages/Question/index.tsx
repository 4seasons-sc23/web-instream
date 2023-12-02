import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import PaginationComponent from 'components/organisms/Common/Pagination';

import request from 'utils/axios';
import { dateForm } from 'utils/dateForm';

import styles from './styles.module.scss';

interface IError {
    writer: {
        tenantId: string;
        userName: string;
        userAccount: string;
    };
    question: {
        errorId: number;
        tenantId: string;
        title: string;
        content: string;
        isAnswered: 'N' | 'Y';
        status: 'N' | 'Y';
        createdAt: string;
    };
}

export default function Question() {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);
    const [firstView, setFirstView] = useState<boolean>(true);

    const [errorList, setErrorList] = useState<IError[]>([]);

    const getErrorList = async (isFirstView: boolean) => {
        try {
            const res = await request(
                'GET',
                `/v1/admins/errors?size=15&page=${currentPage}&firstView=${isFirstView}`
            );

            setErrorList(res.data);
            if (res.pageCount) setPageCount(res.pageCount);
        } catch (e) {
            if (isAxiosError(e)) alert(e.response?.data.message);
        }
    };

    useEffect(() => {
        getErrorList(firstView);
    }, [currentPage]);

    return (
        <>
            <div className={styles.container}>
                {errorList.length > 0 ? (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>tenant</th>
                                    <th>title</th>
                                    <th>답변 여부</th>
                                    <th>createdAt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {errorList.map((error) => (
                                    <tr key={error.question.errorId}>
                                        <td>{error.question.errorId}</td>
                                        <td>{error.writer.userName}</td>
                                        <td
                                            style={{ cursor: 'pointer' }}
                                            onClick={() =>
                                                navigate(`/question/${error.question.errorId}`)
                                            }
                                        >
                                            {error.question.title}
                                        </td>
                                        <td>
                                            {error.question.isAnswered === 'Y'
                                                ? '답변완료'
                                                : '답변대기중'}
                                        </td>
                                        <td>{dateForm(error.question.createdAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <PaginationComponent
                            currentPage={currentPage}
                            setPage={setCurrentPage}
                            pageCount={pageCount}
                            setFirstView={setFirstView}
                        />
                    </>
                ) : (
                    <div>등록된 문의사항이 없습니다.</div>
                )}
            </div>
        </>
    );
}
