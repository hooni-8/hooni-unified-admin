import React, {useState} from "react";
import * as gateway from "@components/common/Gateway";

import "@styles/pages/auth/login.css"
import {Link} from "react-router-dom";

export default function Login() {

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        if (userId.trim() === '' || password.trim() === '') {
            alert('아이디와 비밀번호를 입력해주세요.');
            return;
        }

        const payload = {
            userId, password
        }

        try {
            const response = await gateway.post("/auth/login", payload);

            if (response.status === 200) {
                if (response.data.code === '0000') {
                    localStorage.setItem('accessToken', response.data.accessToken);
                    localStorage.setItem('refreshToken', response.data.refreshToken);
                    window.location.href = "/home";
                } else {
                    alert("아이디와 비밀번호를 확인해주세요.");
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            login();
        }
    }

    return (
        <div className="page-container">
            <main className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <h1>Welcome Back</h1>
                        <p>Sign in to your account to continue</p>
                    </div>

                    <div className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={(e) => setUserId(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleEnter}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div className="form-options">
                            <div className="remember-me">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    name="rememberMe"
                                />
                                <label htmlFor="rememberMe">Remember me</label>
                            </div>
                            <a href="#" className="forgot-password">Forgot Password?</a>
                        </div>

                        <button
                            type="button"
                            className="btn btn-login-submit"
                            onClick={login}
                        >Sign In</button>
                    </div>

                    <div className="login-footer">
                        <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                    </div>
                </div>
            </main>
        </div>
    );
}