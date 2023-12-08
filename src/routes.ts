import { lazy } from 'react';

export const Home = lazy(() => import('./pages/Home'));

export const Signin = lazy(() => import('./pages/Signin'));

export const Question = lazy(() => import('./pages/Question'));
export const PostAnswer = lazy(() => import('./pages/Question/PostAnswer'));

export const Billing = lazy(() => import('./pages/Billing'));
export const HostBilling = lazy(() => import('./pages/Billing/HostBilling'));
