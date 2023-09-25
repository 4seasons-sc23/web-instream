import { useRecoilValue } from 'recoil';

import EmailInput from 'components/molecules/Login/EmailInput';
import PasswordInput from 'components/molecules/Login/PasswordInput';

import { LoginData } from 'recoil/account';

import styles from './styles.module.scss';

export default function LoginContainer() {
    const loginData = useRecoilValue(LoginData);

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h1>IN-STREAM</h1>
            </div>
            <EmailInput />
            <PasswordInput />
            <button onClick={() => console.log(loginData)}>로그인</button>
        </div>
    );
}
