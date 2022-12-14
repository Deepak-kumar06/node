import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from "../App"

const Navbar = () => {
    const { state, dispatch } = useContext(UserContext);

    const ToggleButton = () => {
        console.log(state)
        if (state) {
            return (
                <>
                    <li className="nav-item">
                        <NavLink className="nav-link" to={"/logout"}>Logout</NavLink>
                    </li>
                </>
            )
        } else {
            return (<>
                <li className="nav-item">
                    <NavLink className="nav-link" to={"/login"}>Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to={"/register"}>Register</NavLink>
                </li>
            </>)
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light sticky-lg-top sticky-top">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to={"/"}>Primotech</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse  justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav me-2 mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to={"/"}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={"/about"}>About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={"/contact"}>Contact</NavLink>
                            </li>
                            <ToggleButton />
                        </ul>
                    </div>
                </div>
            </nav>
        </>

    )
}

export default Navbar