import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="login-title">My Account</h1>
                <p className="login-subtitle">Sign in to access your dashboard</p>

                <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" placeholder="Enter your email" required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Enter your password" required />
                    </div>
                    <button type="submit" className="btn-login">Sign In</button>

                    <div className="login-footer">
                        <a href="#" className="forgot-password">Forgot Password?</a>
                        <p>Don't have an account? <Link to="/register" className="register-link">Create one</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
