import React from 'react';
import {BrowserRouter as Router } from 'react-router-dom';

import DashBoard from '@layout/DashBoard';

function App() {
    return (
        <Router>
            <DashBoard />
        </Router>
    );
}

export default App;