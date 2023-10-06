import { Box, Button, Dialog, TextField, Typography, styled } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { authenticateLogin, authenticateSignup } from '../../service/api'
import { DataContext } from '../../context/DataProvider'
import { useDispatch, useSelector } from 'react-redux';
import { authorizedUser, getLoggedInUser } from '../../redux/actions/userAction';
import { fetchUserData, getAuthToken } from '../../auth/auth';
import { useNavigate } from 'react-router-dom';


const Component = styled(Box)`
    height: 70vh;
    width: 90vh;
    display: flex;
`
const Image = styled(Box)`
    background: #2874f0 url("https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png") center 85% no-repeat;
    height: 81%;
    width: 28%;
    padding: 47px 35px;
    & > p , h5{
        color: #fff;
        font-weight: 600;
    }
`
export const Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 25px 35px;
    flex: 1;
    & > div, & > button, & > p{
        margin-bottom: 15px;
    }
`
const LoginButtom = styled(Button)`
    text-transform: none;
    background-color: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
    &:hover{
        background-color: #e8a584;
    }
`
const BackToLogin = styled(Button)`
   text-transform: none;
    background-color: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
    margin-bottom: 5px;
    /* &:hover{
        background-color: #d1cecc;
    } */
`

const RequestOTP = styled(Button)`
    text-transform: none;
    background-color: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`

const Text = styled(Typography)`
    font-size: 12px;
    color: #878787;
`
const CreateAccount = styled(Typography)`
    font-size: 14px;
    text-align: center;
    color: #2874f0;
    font-weight: 600;
    cursor: pointer;
`
const accountInitialValues = {
    login: {
        view: "login",
        heading: "Login",
        subHeading: "Get access to your Orders, Wishlist and Recommendations"
    },
    signup: {
        view: "signup",
        heading: "Looks like you're new here",
        subHeading: "Sign up with your mobile number to get started"
    }
}

let signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
}

const loginInitialValues = {
    email: '',
    password: '',
}

const LoginDialog = ({ open, setOpen }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const authToken = getAuthToken(); // Check for the authentication token in local storage
    const { isloggedIn } = useSelector((state) => state.user);

    // useEffect(() => {
    if (authToken && !isloggedIn) {
        fetchUserData(authToken, dispatch);
    }
    // }, [authToken, isloggedIn]);

    const [account, toogleAccount] = useState(accountInitialValues.login)

    const [signup, setSignup] = useState(signupInitialValues);

    const [login, setLogin] = useState(loginInitialValues);

    const { setAccount } = useContext(DataContext)

    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const resetErrorState = () => {
        setFirstnameError(null)
        setLastnameError(null)
        setUsernameError(null)
        setEmailError(null)
        setPasswordError(null)
        setPhoneError(null)
    }

    const handleClose = () => {
        setOpen(false)
        toogleAccount(accountInitialValues.login)
        resetErrorState()
        setSignup(signupInitialValues);
    }

    const toggleSignup = () => {
        resetErrorState()
        toogleAccount(accountInitialValues.signup)
    }

    const toggleLogin = () => {
        resetErrorState()
        toogleAccount(accountInitialValues.login)
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value })
    }

    const signupUser = async () => {
        // console.log(signup)
        resetErrorState()
        let response = await authenticateSignup(signup)
        console.log(response)
        // if (response.response.data != null) {
        if (response.status != '200') {
            if (response.response.data.error) {
                // Map the error messages to set error state for each parameter
                response.response.data.error.forEach((error) => {
                    const { msg, params } = error;
                    // Check params and set the corresponding error state
                    if (params === 'firstname') {
                        setFirstnameError(msg);
                    } else if (params === 'lastname') {
                        setLastnameError(msg);
                    } else if (params === 'email') {
                        setEmailError(msg);
                    } else if (params === 'username') {
                        setUsernameError(msg);
                    }
                    else if (params === 'password') {
                        setPasswordError(msg);
                    }
                    else if (params === 'phone') {
                        setPhoneError(msg);
                    }
                });
                return
            }
        }
        // setSignup(signupInitialValues);
        // handleClose();
        alert("Signup successfull");
        toogleAccount(accountInitialValues.login)
        // setAccount(`${signup.firstname} ${signup.lastname}`)
    }

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const loginUser = async () => {
        // console.log(signup)
        resetErrorState()
        let response = await authenticateLogin(login)
        console.log(response)
        if (response.status !== 200) {
            if (response.response.data.error) {
                // Map the error messages to set error state for each parameter
                response.response.data.error.forEach((error) => {
                    const { msg, params } = error;
                    // Check params and set the corresponding error state
                    if (params === 'email') {
                        setEmailError(msg);
                    }
                    else if (params === 'password') {
                        setPasswordError(msg);
                    }
                });
                return
            }
        }
        setLogin(loginInitialValues)
        dispatch(getLoggedInUser(response.data))
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        const authToken = localStorage.getItem('authToken');
        // console.log(authToken)
        dispatch(authorizedUser(authToken))
        handleClose();
        if (response.status == 200) {
            alert("Login successfull");
            setAccount(`${response.data.data.firstname} ${response.data.data.lastname}`)
            if (response.data.data.role === 'admin') {
                navigate('/admin')
            }
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: "unset" } }}>
            <Component>
                <Image>
                    <Typography variant='h5'>{account.heading}</Typography>
                    <Typography style={{ marginTop: 20 }}>{account.subHeading}</Typography>
                </Image>
                {account.view === "login" ?
                    <Wrapper>
                        <TextField variant='standard' onChange={(e) => onValueChange(e)} name='email' type='text' required label="Enter Email" value={login.email}></TextField>
                        {emailError && (
                            <Typography color="red" fontSize="sm">
                                {emailError}
                            </Typography>
                        )}
                        <TextField variant='standard' onChange={(e) => onValueChange(e)} name='password' type='password' required label="Enter Password" value={login.password}></TextField>
                        {passwordError && (
                            <Typography color="red" fontSize="sm">
                                {passwordError}
                            </Typography>
                        )}
                        <Text>By continuing you agree to Flipkart's Terms of Use and Privacy Policy</Text>
                        <LoginButtom onClick={() => loginUser()}>Login</LoginButtom>
                        <Typography style={{ textAlign: "center" }}>OR</Typography>
                        <RequestOTP>Request OTP</RequestOTP>
                        <CreateAccount onClick={() => toggleSignup()}>New to Flipkart?Create an account</CreateAccount>
                    </Wrapper>
                    :
                    <Wrapper>
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name='firstname' label="Enter Firstname" value={signup.firstname}></TextField>
                        {firstnameError && (
                            <Typography color="red" fontSize="sm">
                                {firstnameError}
                            </Typography>
                        )}
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name='lastname' label="Enter Lastname" value={signup.lastname}></TextField>
                        {lastnameError && (
                            <Typography color="red" fontSize="sm">
                                {lastnameError}
                            </Typography>
                        )}
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name='username' label="Enter Username" value={signup.username}></TextField>
                        {usernameError && (
                            <Typography color="red" fontSize="sm">
                                {usernameError}
                            </Typography>
                        )}
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name='email' label="Enter Email" value={signup.email}></TextField>
                        {emailError && (
                            <Typography color="red" fontSize="sm">
                                {emailError}
                            </Typography>
                        )}
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name='password' label="Enter Password" value={signup.password}></TextField>
                        {passwordError && (
                            <Typography color="red" fontSize="sm">
                                {passwordError}
                            </Typography>
                        )}
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name='phone' label="Enter Phone" value={signup.phone}></TextField>
                        {phoneError && (
                            <Typography color="red" fontSize="sm">
                                {phoneError}
                            </Typography>
                        )}
                        <LoginButtom onClick={(e) => signupUser()}>Continue</LoginButtom>
                        <BackToLogin onClick={() => toggleLogin()}>Back to login</BackToLogin>
                    </Wrapper>
                }
            </Component>
        </Dialog>
    )
}

export default LoginDialog
