import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import request from 'utils/axios';

import styles from './styles.module.scss';

interface IErrorData {
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
    answer: {
        content: string;
        status: 'N' | 'Y';
        createdAt: string;
    } | null;
}

export default function PostAnswer() {
    const { id } = useParams();

    const [errorData, setErrorData] = useState<IErrorData>();
    const [inputText, setInputText] = useState<string>('');

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [isFirstEdit, setIsFirstEdit] = useState<boolean>(true);

    const getErrorData = async () => {
        try {
            const res = await request('GET', `/v1/admins/errors/${id}`);

            setErrorData(res);
            if (res.answer) {
                setInputText(res.answer.content);
                setIsFirstEdit(false);
            }
        } catch (e) {
            if (isAxiosError(e)) alert(e.response?.data.message);
        }
    };

    useEffect(() => {
        getErrorData();
    }, []);

    const onClickButton = () => {
        setIsEdit((prev) => !prev);
    };

    const onClickSubmitButton = async () => {
        try {
            await request(
                isFirstEdit ? 'POST' : 'PATCH',
                `/v1/admins/errors/${errorData?.question.errorId}/answer`,
                {
                    answerContent: inputText,
                }
            );
            setIsEdit(false);
            getErrorData();
        } catch (e) {
            if (isAxiosError(e)) alert(e.response?.data.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.buttonArea}>
                <button onClick={onClickButton}>{!isEdit ? '답변 등록하기' : '취소'}</button>
            </div>
            <div>
                <div>question</div>
                <div>title: {errorData?.question.title}</div>
                <div>author: {errorData?.writer.userName}</div>
                <div>content: {errorData?.question.content}</div>
            </div>
            <div>
                <div>answer</div>
                {isEdit ? (
                    <div>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        />
                        <button onClick={onClickSubmitButton}>등록</button>
                    </div>
                ) : (
                    <div>
                        {errorData?.answer ? (
                            <div>{errorData.answer.content}</div>
                        ) : (
                            <div>아직 등록된 답변이 없습니다.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
