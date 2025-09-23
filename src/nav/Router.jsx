import React from 'react';
import {Route, Routes} from "react-router-dom";

import Home from "@pages/Home";

import Login from "@pages/auth/Login";
import Register from "@pages/auth/Register";

// profile
import CommonCode from "@pages/profile/CommonCode";
import Project from "@pages/profile/Project";
import UserDescription from "@pages/profile/UserDescription";


export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/home" element={<Home />} />

            <Route path="/profile">
                <Route path="common-code" element={<CommonCode />} />
                <Route path="project" element={<Project />} />
                <Route path="user-description" element={<UserDescription />} />
            </Route>

        </Routes>
    )
}