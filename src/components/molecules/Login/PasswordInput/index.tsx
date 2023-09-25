import LoginInput from 'components/atoms/Login/LoginInput';

export default function PasswordInput() {
    return (
        <div>
            <label>비밀번호</label>
            <LoginInput name="password" />
        </div>
    );
}
