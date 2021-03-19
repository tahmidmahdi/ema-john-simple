

import { useContext, useState } from 'react';
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';
// firebase.initializeApp(firebaseConfig);




function Login() {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: "",
        email: "",
        password: "",
        photo: "",
        error: '',
        success: false
    });
    initializeLoginFramework();

    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                setUser(res)
                setLoggedInUser(res);
                history.replace(from);
            })
    }

    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                setUser(res)
                setLoggedInUser(res);
                history.replace(from);

            })
    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
            })
    }










    const handleSubmit = (e) => {
        // console.log(user.email, user.password);
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    setUser(res)
                    setLoggedInUser(res);
                    history.replace(from);
                })
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                setUser(res)
                setLoggedInUser(res);
                history.replace(from);
            })

        }

        e.preventDefault();

    }



    const handleBlur = (e) => {
        let isFieldValid = true;
        // console.log(e.target.name, e.target.value);
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
            // console.log(isEmailValid);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6
            const passwordHasNumber = /\d{1}/.test(e.target.value)
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);

        }
    }

    return (
        <div style={{ textAlign: 'center' }}>
            {

                user.isSignedIn ? <button onClick={signOut}>Sign out</button> : <button onClick={googleSignIn}>Sign in</button>

            }
            <br />
            <button onClick={fbSignIn}>Sign in Using Facebook</button>
            {
                user.isSignedIn && <div> <p>Welcome, {user.name} </p>
                    <p>Your Email: {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }

            <h1>Our own Authentication system</h1>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New User Sign Up</label>

            <form onSubmit={handleSubmit}>
                {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your name" required />}
                <br />
                <input type="text" name="email" onBlur={handleBlur} placeholder="write your email address" required />
                <br />
                <input type="password" name="password" onBlur={handleBlur} placeholder="your password" required />
                <br />
                <input type="submit" value={newUser ? 'sign up' : 'sign in'} />
            </form>

            <p style={{ color: 'red' }}>{user.error}</p>
            {
                (user.success) && <p style={{ color: 'green' }}>User {newUser ? 'Created' : "LoggedIn"} Successfully!</p>
            }

        </div>
    );
}

export default Login;
