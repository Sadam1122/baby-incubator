import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { FaLock, FaUserAlt } from 'react-icons/fa'; 
import Validation from './LoginValidation';
import axios from 'axios';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [rememberMe, setRememberMe] = useState(false); 
    const navigate = useNavigate(); 

    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        
        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:8081/login', values)
                .then(res => {
                    const responseData = res.data;
                    if (responseData === "Success") {
                        navigate('/home');
                    } else if (responseData === "Fail") {
                        alert("No record existed");
                    } else {
                        alert("Unknown response from server");
                    }
                })
                .catch(err => {
                    console.error('Error while logging in:', err);
                    alert('Error while logging in. Please try again later.');
                });
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <form onSubmit={handleSubmit}>
                    <h2>Sign-In</h2>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <div className="input-group">
                            <span className="input-group-text"><FaUserAlt /></span> {/* FaUserAlt icon */}
                            <input type='email' placeholder='Enter Email' name='email'
                                onChange={handleInput} className='form-control rounded-0' />
                        </div>
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <div className="input-group">
                            <span className="input-group-text"><FaLock /></span>
                            <input type='password' placeholder='Enter Password' name='password'
                                onChange={handleInput} className='form-control rounded-0' />
                        </div>
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Masuk</strong></button>
                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />
                            Remember me
                        </label>
                    </div>
                    <p>Belum Punya Akun?</p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Sign Up</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;