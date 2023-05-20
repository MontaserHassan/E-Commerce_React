import React from 'react'
import './NotFound.css'
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404"></div>
                    <h1>404</h1>
                    <h2>Oops! Page Not Found</h2>
                    <p>
                        Sorry, but the page you are looking for does not exist, has been removed, or is temporarily unavailable.
                    </p>
                    <Link to="/">Back to homepage</Link>
                </div>
            </div>
        </>
    );
}



export default NotFound