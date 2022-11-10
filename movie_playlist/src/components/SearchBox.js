import React from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faRightFromBracket,
    faUser
} from "@fortawesome/free-solid-svg-icons";

const SearchBox = (props) => {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const logout = async () => {
        // if used in more components, this should be in context
        // axios to /logout endpoint
        setAuth({});
        navigate("/login");
    };
    return (
        <div className="col col-sm-4 d-flex justify-content-center align-items-center">
            <input
                className="form-control"
                value={props.value}
                onChange={(event) => props.setSearchMovie(event.target.value)}
                placeholder='Type to Search...'
            ></input>
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            <FontAwesomeIcon icon={faUser} />
            &nbsp;
            &nbsp;
            &nbsp;
            <div>{auth.user}</div>
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            <FontAwesomeIcon type="button" onClick={logout} icon={faRightFromBracket} />
        </div >
    );
};

export default SearchBox;