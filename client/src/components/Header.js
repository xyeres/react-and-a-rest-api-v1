import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../Context';
/**
  * Site's header, stateless component
*/
export default function Header() {
    const context = useContext(Context);
    const authUser = context.authenticatedUser;

    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <nav>
                    <ul className="header--signedout">
                        {
                            authUser ?
                                <React.Fragment>
                                    <span>Welcome, {authUser.firstName}!</span>
                                    <li><Link to="/signout">Sign Out</Link></li>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <li><Link to="/signup">Sign Up</Link></li>
                                    <li><Link to="/signin">Sign In</Link></li>
                                </React.Fragment>
                        }
                    </ul>
                </nav>
            </div>
        </header>
    )
}
