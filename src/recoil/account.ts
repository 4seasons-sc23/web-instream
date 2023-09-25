import { atom } from 'recoil';

import { ISignupData, ILoginData } from 'types/account';

export const SignupData = atom<ISignupData>({
    key: 'SignupData',
    default: { email: '', password: '' },
});

export const LoginData = atom<ILoginData>({
    key: 'LoginData',
    default: { email: '', password: '' },
});
