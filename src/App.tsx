import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from 'components/organisms/Layout';

import Loader from 'utils/Loader';

import * as router from './routes';

function App() {
    return (
        <Suspense fallback={<Loader />}>
            <Layout>
                <Routes>
                    <Route path="/" element={<router.Home />} />

                    <Route path="/signin" element={<router.Signin />} />

                    <Route path="/question" element={<router.Question />} />
                    <Route path="/question/:id" element={<router.PostAnswer />} />

                    <Route path="/billing" element={<router.Billing />} />
                </Routes>
            </Layout>
        </Suspense>
    );
}

export default App;
