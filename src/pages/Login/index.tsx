import React from 'react';

interface Props {
    setLogined: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login({ setLogined }: Props) {
    return <div>Login</div>;
}
