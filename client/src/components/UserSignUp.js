import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'


export default function UserSignUp() {
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('');

    function handleCancel(e) {
        e.preventDefault();
        history.push('/');
    }

    function handleFirstNameChange(e) {
        setFirstName(e.target.value);
    }

    function handleLastNameChange(e) {
        setLastName(e.target.value);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePassChange(e) {
        setPass(e.target.value);
    }

    function handlePassConfirmChange(e) {
        setPassConfirm(e.target.value);
    }
    
    return (
        <div className="form--centered">
            <h2>Sign Up</h2>

            <form>
                <label htmlFor="firstName">First Name</label>
                <input name="firstName" type="text" onChange={handleFirstNameChange} value={firstName} />
                <label htmlFor="lastName">Last Name</label>
                <input name="lastName" type="text" onChange={handleLastNameChange} value={lastName} />
                <label htmlFor="emailAddress">Email Address</label>
                <input name="emailAddress" type="email" onChange={handleEmailChange} value={email} />
                <label htmlFor="password">Password</label>
                <input name="password" autoComplete="false" onChange={handlePassChange} type="password" value={pass} />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input name="confirmPassword" autoComplete="false" type="password" onChange={handlePassConfirmChange} value={passConfirm} />
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
            </form>
            <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
        </div>
    )
}
