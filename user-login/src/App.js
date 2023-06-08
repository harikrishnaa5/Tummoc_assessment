import React from "react";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import "./App.css";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

const App = () => {
    const user = useSelector(selectUser);
    return <div className="App">{user ? <Logout /> : <Login />}</div>;
};

export default App;
