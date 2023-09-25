import LoginInput from 'components/atoms/Login/LoginInput';

export default function EmailInput() {
    return (
        <div>
            <label>이메일</label>
            <LoginInput name="email" />
        </div>
    );
}
