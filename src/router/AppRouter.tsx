import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {routes} from "./index";

const AppRouter = () => {

    return (
        <Routes>
            {routes.map(route =>
                <Route
                    key={route.path}
                    path={route.path}
                    element={<route.component/>}
                />)
            }
        </Routes>
    );
};

export default AppRouter;