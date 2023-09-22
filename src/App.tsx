import { useState } from 'react';

import Home from './pages/Home';
import Login from './pages/Login';

function App() {
    const [logined, setLogined] = useState<boolean>(false);

    return <>{!logined ? <Login setLogined={setLogined} /> : <Home />}</>;
}

export default App;
