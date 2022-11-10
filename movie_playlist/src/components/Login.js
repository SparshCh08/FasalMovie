import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";

import {
    MDBContainer,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBInput,
    MDBCheckbox
} from 'mdb-react-ui-kit';

const LOGIN_URL = "/auth";
const REGISTER_URL = '/register';

const Login = () => {

    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const errRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const [ruser, rsetUser] = useState('');
    const [rpwd, rsetPwd] = useState('');
    const [rmatchPwd, rsetMatchPwd] = useState('');
    const [rerrMsg, rsetErrMsg] = useState('');

    // Register

    useEffect(() => {
        rsetErrMsg('');
    }, [ruser, rpwd, rmatchPwd]);

    const rhandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user: ruser, pwd: rpwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            rsetUser('');
            rsetPwd('');
            rsetMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                rsetErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                rsetErrMsg('Username Taken');
            } else {
                rsetErrMsg('Registration Failed')
            }
        }
    };



    // Login

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            console.log(JSON.stringify(response.data));
            const accessToken = response?.data?.accessToken;
            console.log({ user, pwd, accessToken })
            setAuth({ user, pwd, accessToken, from });
            setUser("");
            setPwd("");
            navigate(from, { replace: true });
        } catch (err) {
            console.log(err)
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing Username or Password");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
        }

    };

    // Bootstrap
    const [justifyActive, setJustifyActive] = useState('tab1');

    const handleJustifyClick = (value) => {
        if (value === justifyActive) {
            return;
        }
        setJustifyActive(value);
    };
    // Bootstrap

    return (
        < div className='container-fluid align-items-center' >
            <p
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
            >
                {errMsg}
            </p>
            <MDBContainer className="bradius bg-dark text-white p-3 my-5 d-flex flex-column w-50">

                <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                            Login
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                            Register
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>

                    <MDBTabsPane show={justifyActive === 'tab1'}>

                        <div className="text-center mb-4"></div>
                        <form onSubmit={handleSubmit}>
                            <MDBInput wrapperClass='mb-4' label='Username' type='text'
                                id="username"
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                            />
                            <MDBInput wrapperClass='mb-4' label='Password' type='password'
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                            <div className="d-flex justify-content-between mx-4 mb-4">
                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                                <a href="!#">Forgot password?</a>
                            </div>
                            <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
                        </form>

                    </MDBTabsPane>

                    <MDBTabsPane show={justifyActive === 'tab2'}>

                        <div className="text-center mb-4"></div>
                        <form onSubmit={rhandleSubmit}>
                            <MDBInput wrapperClass='mb-4' label='Username' type='text'
                                id="username"
                                autoComplete="off"
                                onChange={(e) => rsetUser(e.target.value)}
                                value={ruser}
                                required
                            />
                            <MDBInput wrapperClass='mb-4' label='New Password' type='password'
                                id="newpassword"
                                onChange={(e) => rsetPwd(e.target.value)}
                                value={rpwd}
                                required
                            />
                            <MDBInput wrapperClass='mb-4' label='Re-enter Password' type='password'
                                id="confirm_pwd"
                                onChange={(e) => rsetMatchPwd(e.target.value)}
                                value={rmatchPwd}
                                required
                            />

                            <div className='d-flex justify-content-center mb-4'>
                                <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
                            </div>

                            <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
                        </form>
                    </MDBTabsPane>

                </MDBTabsContent>

            </MDBContainer>
        </div >
    );
};

export default Login;