import React, {useEffect, useState} from "react";

import "@styles/pages/auth/Register.css"
import * as gateway from "@components/common/Gateway";
import {Link} from "react-router-dom";

export default function Register() {
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const [userIdCheck, setUserIdCheck] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        if (userPassword !== '' && confirmPassword !== '') {
            if (userPassword !== confirmPassword) {
                setPasswordError('Passwords do not match');
            } else {
                setPasswordError('');
                setPasswordMatch(true);
            }
        }
    }, [userPassword, confirmPassword]);

    useEffect(() => {
        if (userIdCheck) {
            setUserIdCheck(false);
        }
    },[userId]);

    const duplicateCheck = async () => {
        if (userId.trim() === '') {
            alert("ID를 입력해주세요.");
            return;
        }

        try {
            const response = await gateway.post("/auth/existsUserId", {userId});

            if (!response.data.data) {
                setUserIdCheck(true);
                alert("사용 가능한 ID 입니다.");
            } else {
                alert("사용중인 ID 입니다.");
            }
        } catch (e) {
            console.error(e);
        }
    }

    const register = async () => {
        if (!userIdCheck) {
            alert("ID 중복 체크를 해주세요");
            return;
        }

        if (!passwordMatch) {
            alert("비밀번호를 확인해주세요.");
            return;
        }

        try {
            const payload = {
                userId
                , userPassword
                , userEmail
                , userName
            }

            const response = await gateway.post("/auth/register", payload);

            if (response.data.code === '0000') {
                alert("회원가입에 성공하셨습니다.");
                window.location.href = "/";
            } else {
                alert("회원가입에 실패하였습니다.");
            }
        } catch (e) {
            console.error(e);
            alert("회원가입 중 오류가 발생했습니다.");
        }
    }

    return (
        <div className="page-container">
            <main className="signup-container">
                <div className="signup-card">
                    <div className="signup-header">
                        <h1>Create an Account</h1>
                        <p>Join us today and get started with your new account</p>
                    </div>

                    <div className="signup-form">
                        <div className="form-group">
                            <label htmlFor="email">ID</label>
                            <input
                                type="text"
                                id="userId"
                                name="userId"
                                onChange={(e) => setUserId(e.target.value)}
                                placeholder="Enter your ID"
                                required
                            />
                            <button onClick={duplicateCheck} disabled={userIdCheck}>중복확인</button>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                onChange={(e) => setUserPassword(e.target.value)}
                                placeholder="Create a password"
                                required
                            />
                            <small className="form-hint">Password must be at least 8 characters long</small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                required
                                className={passwordError ? 'input-error' : ''}
                            />
                            {passwordError && <small className="error-message">{passwordError}</small>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="firstName">Name</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Enter your first name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={(e) => setUserEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="agreeTerms"
                                name="agreeTerms"
                                required
                            />
                            <label htmlFor="agreeTerms">
                                I agree to the <a href="#" className="terms-link">Terms of Service</a> and <a href="#"
                                                                                                              className="terms-link">Privacy
                                Policy</a>
                            </label>
                        </div>

                        <button className="btn btn-signup-submit" onClick={register}>Create Account</button>
                    </div>

                    <div className="signup-footer">
                        <p>Already have an account? <Link to="/">Sign In</Link></p>
                    </div>
                </div>
            </main>
        </div>
    );
}
