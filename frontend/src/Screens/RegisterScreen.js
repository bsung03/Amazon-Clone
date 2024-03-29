import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';




export default function RegisterScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const userRegister = useSelector((state) => state.userRegister);
    const{ userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();

    const redirect = props.location.search? props.location.search.split('=')[1] : '/';

    const sumbitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert("Password and Confirm Password do not match");
        }else{
            dispatch(register(name, email,password));
        }
    };

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo])


    return (
        <div>
            <form className='form' onSubmit={sumbitHandler}>
                <div>
                    <h1>
                        Create Account
                    </h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        placeholder="Enter Name" 
                        required 
                        onChange={(e) => setName(e.target.value)}
                    /> 
                </div>

                <div>
                    <label htmlFor="email">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Enter Email" 
                        required 
                        onChange={(e) => setEmail(e.target.value)}
                    /> 
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Enter Password" 
                        required 
                        onChange={(e) => setPassword(e.target.value)}
                    /> 
                </div>

                <div>
                    <label htmlFor="confirmPassword">Password</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        placeholder="Enter confirm password" 
                        required 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    /> 
                </div>


                <div>
                    <label/>
                    <button className="primary" type="submit">Register</button>
                </div>
                <div>
                    <label/>
                    <div>
                        Already have an account? {' '}
                        <Link to={`/signin?redirect=${redirect}`}>Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

