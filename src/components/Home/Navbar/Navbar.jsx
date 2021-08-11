import React from 'react' ;
import "./navbar.scss" ;
import {NavLink} from 'react-router-dom' ;
const Navbar = () => {

return (
    <>
    <div className="navbar__container">
    <div className="navbar">
        <div className="navbar__heading">
            <h2>
                &lt; Nitish /&gt;
            </h2>
        </div>
        <div className="navbar__links">
            <NavLink to="/form">
                Form
            </NavLink>
            <NavLink to="/table">
                Table
            </NavLink>
            
        </div>
        <div className="navbar__heading">
            <h2>
                RedPositive
            </h2>
        </div>
    </div>
    </div>
    </>
)
}


export default Navbar ;