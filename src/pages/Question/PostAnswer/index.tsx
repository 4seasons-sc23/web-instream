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
            <div>
                <div className={styles.title}>문의내역</div>
                <div className={styles.textBox}>
                    <span className={styles.bold}>title</span>
                    <span>{errorData?.question.title}</span>
                </div>
                <div className={styles.divider} />
                <div className={styles.textBox}>
                    <span className={styles.bold}>author</span>
                    <span>{errorData?.writer.userName}</span>
                </div>
                <div className={styles.divider} />
                <div className={styles.contentContainer}>
                    <span className={styles.bold}>content</span>
                    <span className={styles.contentBox}>{errorData?.question.content}</span>
                    <div className={styles.buttonArea}>
                        <button onClick={onClickButton}>
                            {!isEdit
                                ? !errorData?.answer
                                    ? '답변 등록하기'
                                    : '답변 수정하기'
                                : '취소'}
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.answerBox}>
                <div>.</div>
                <div>.</div>
                <div>.</div>
                <div className={styles.bold}>answer</div>
                {isEdit ? (
                    <div className={styles.textareaBox}>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        />
                        <div className={styles.textareaButton}>
                            <button onClick={onClickSubmitButton}>등록</button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.answerText}>
                        {errorData?.answer
                            ? `${errorData.answer.content}`
                            : '아직 등록된 답변이 없습니다.'}
                    </div>
                )}
            </div>
        </div>
    );
}
