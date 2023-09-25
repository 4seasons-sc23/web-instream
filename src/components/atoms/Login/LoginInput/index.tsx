import { useRecoilState } from 'recoil';

import { LoginData } from 'recoil/account';

import styles from './styles.module.scss';

interface Props {
    name: 'email' | 'password';
}

export default function LoginInput({ name }: Props) {
    const [loginData, setLoginData] = useRecoilState(LoginData);

    const handleSignupData = (value: string) => {
        setLoginData({ ...loginData, [name]: value });
    };

    return (
        <>
            <input
                className={styles.input}
                value={loginData[name]}
                onChange={(e) => handleSignupData(e.target.value)}
            />
        </>
    );
}
