import { LOGO_URL } from "../utils/constant";
import { useState } from "react";


const Header = () => {


    const [btnNameReact, setbtnNameReact] = useState("Login");

    return (
        <div className="header">
            <div className="logo-container">
                <img
                    className="logo"
                    src= {LOGO_URL}
                    alt="logo" />
            </div>
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact Us</li>
                    <li>Cart</li>
                    <button className="login"
                        onClick={() => {
                            btnNameReact === 'Login'
                            ? setbtnNameReact("Logout")
                            : setbtnNameReact("Login")
                        }}
                    >{btnNameReact}</button>
                </ul>
            </div>
        </div>
    );
};

export default Header;