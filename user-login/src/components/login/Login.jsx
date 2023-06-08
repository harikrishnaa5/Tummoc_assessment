import React, { useState } from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
// import {Link} from "react-router-dom"

const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            login({
                name: name,
                email: email,
                password: password,
                loggedIn: true,
            })
        );
    };
    return (
        <div className="login">
            <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
                <h1>Login Here</h1>
                <input
                    type="fullName"
                    placeholder="Full Name"
                    name="fullName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="submit-btn">
                    Log in 
                </button>
            {/* <p className="register-linklog">New user? <Link className="register-link" to="/register">sign up</Link></p> */}
            </form>
        </div>
    );
};

export default Login;
