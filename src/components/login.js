import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios'
import "/Users/mms/Documents/Development/githubs-projects/React-Chart/src/styles.css";

function Login() {

    const history = useHistory();

    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() =>{
       // sessionStorage.getItem('username') ?  <Navbar></Navbar> : undefined 
    })
console.log("localStorage: "+localStorage.getItem('username'))
localStorage.removeItem('username')

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const handleSubmit = async (event) => {

        //Prevent page reload
        event.preventDefault();

        // User Login info
        const database = await axios.get('http://localhost:3000/users/');

        console.log("database: " + database)

        var { uname, pass } = document.forms[0];

        // Find user login info

        const userData = database.data.find((user) => user.username === uname.value);

        // Compare user info
        if (userData) {
            if (userData.password !== pass.value) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                localStorage.setItem('username', userData.username);
                setIsSubmitted(true);
             
                history.push('/home')
                
            }
        } else {
            // Username not found
            setErrorMessages({ name: "uname", message: errors.uname });
        }
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // JSX code for login form
    const renderForm = (
        <div className="form">
            <label>Username: admin123</label>
            <br></br>
            <label>Password: admin123</label>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Username </label>
                    <input type="text" name="uname"  required />
                    {renderErrorMessage("uname")}
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="pass" required />
                    {renderErrorMessage("pass")}
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );

    return (
        <div className="app">
            <h3>Login</h3>
            <div className="login-form">
                <div className="title">Sign In</div>
                {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
            </div>
        </div>
    );
}

export default Login;


