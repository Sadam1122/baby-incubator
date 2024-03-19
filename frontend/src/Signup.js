import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import axios from 'axios';
import { FaLock, FaUserAlt } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [rememberMe, setRememberMe] = useState(false); // State untuk Remember Me
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if (errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/signup', values)
                .then(res => {
                    navigate('/home');
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-Up</h2>
                <form action='' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='name'><strong>Name</strong></label>
                        <div className="input-group">
                            <span className="input-group-text"><FaUserAlt /></span>
                            <input type='text' placeholder='Enter Name' name='name'
                                onChange={handleInput} className='form-control rounded-0' />
                        </div>
                        {errors.name && <span className='text-danger'> {errors.name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <div className="input-group">
                            <span className="input-group-text"><MdEmail /></span>
                            <input type='text' placeholder='Enter Email' name='email'
                                onChange={handleInput} className='form-control rounded-0' />
                        </div>
                        {errors.email && <span className='text-danger'> {errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <div className="input-group">
                            <span className="input-group-text"><FaLock /></span>
                            <input type='password' placeholder='Enter Password' name='password'
                                onChange={handleInput} className='form-control rounded-0' />
                        </div>
                        {errors.password && <span className='text-danger'> {errors.password}</span>}
                    </div>
                    <div className="mb-3">
                        <label>
                            <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />
                            Remember me
                        </label>
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Masuk</strong></button>
                    <p>Sudah Punya Akun?</p>
                    <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Sign In</Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;