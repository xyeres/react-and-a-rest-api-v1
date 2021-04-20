import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

export default function UserSignIn() {
    const history = useHistory();
    
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    function handleCancel(e) {
        e.preventDefault();
        history.push('/');
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }
    function handlePassChange(e) {
        setPass(e.target.value);
    }
    return (
        <div className="form--centered">
            <h2>Sign In</h2>
            <form>
                <label htmlFor="emailAddress">Email Address</label>
                <input name="emailAddress" type="email" onChange={handleEmailChange} value={email}></input>
                <label htmlFor="password">Password</label>
                <input name="password" autoComplete="false" type="password" onChange={handlePassChange} value={pass}></input>
                <button className="button" type="submit">Sign In</button>
                <button type="button" className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
            <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>

        </div>
    )
}
