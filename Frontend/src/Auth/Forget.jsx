//UI FOR NOTES 
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function ForgetPassword() {
    const [formData, setFormData] = useState({ email: '', otp: '', newPassword: '', confirmPassword: '' });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [resendTimer]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@aiktc\.ac\.in$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleResend = async () => {
        try {
            const response = await axios.post('http://localhost:5000/forgot-password', { email: formData.email });
            setMessageType('success');
            setMessage('OTP resent. Please check your email.');
            setResendTimer(60);
            setCanResend(false);
        } catch (error) {
            setMessageType('error');
            setMessage('Failed to resend OTP. Please try again later.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step === 1) {
            if (!validateEmail(formData.email)) {
                setMessageType('error');
                setMessage('Please use an email ending with @aiktc.ac.in.');
                return;
            }
            try {
                const response = await axios.post('http://localhost:5000/forgot-password', { email: formData.email });
                setMessageType('success');
                setMessage(response.data.message);
                setStep(2);
                setResendTimer(60);
                setCanResend(false);
            } catch (error) {
                setMessageType('error');
                setMessage(error.response.data.message);
            }
        } else if (step === 2) {
            if (formData.newPassword !== formData.confirmPassword) {
                setMessageType('error');
                setMessage('Passwords do not match');
                return;
            }
            if (!validatePassword(formData.newPassword)) {
                setMessageType('error');
                setMessage('Your password must be at least 8 characters long and include at least one uppercase letter (A-Z), one lowercase letter (a-z), and one special character.');
                return;
            }
            try {
                const response = await axios.post('http://localhost:5000/reset-password', {
                    email: formData.email,
                    otp: formData.otp,
                    newPassword: formData.newPassword
                });
                setMessageType('success');
                setMessage(response.data.message);
                setTimeout(() => navigate('/LandingPage'), 3000);
            } catch (error) {
                setMessageType('error');
                setMessage(error.response.data.message);
            }
        }
    };

    return (
        <div className="w-full h-screen bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] p-5">
            <div className='pt-16'>
                    <h1 className='text-center text-3xl font-bold text-blue-800'>Reset Your Password</h1>
                <p className='text-center text-lg text-blue-600 mt-2'>Follow the steps to recover your account</p>
            </div>

            <div className='flex justify-center items-center'>
                <form className='mt-12 text-center w-full sm:w-96 bg-white p-8 rounded-lg shadow-lg' onSubmit={handleSubmit}>
                    {step === 1 && (
                        <input
                            className='p-4 bg-gray-100 rounded-md w-full mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none'
                            placeholder='Enter your AIKTC email'
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                        />
                    )}
                    {step === 2 && (
                        <>
                            <input
                                className='p-4 bg-gray-100 rounded-md w-full mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none'
                                placeholder='Enter OTP'
                                type='text'
                                name='otp'
                                value={formData.otp}
                                onChange={handleChange}
                            />
                            {canResend ? (
                                <button
                                    className="text-blue-500 text-sm underline mb-4"
                                    type="button"
                                    onClick={handleResend}
                                >
                                    Resend OTP
                                </button>
                            ) : (
                                <p className="text-gray-500 text-sm mb-4">Resend OTP in {resendTimer}s</p>
                            )}
                            <div className='relative mb-4'>
                                <input
                                    className='p-4 bg-gray-100 rounded-md w-full focus:ring-2 focus:ring-blue-400 focus:outline-none'
                                    placeholder='New Password'
                                    type={showPassword ? "text" : "password"}
                                    name='newPassword'
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 cursor-pointer" onClick={togglePasswordVisibility}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </span>
                            </div>
                            <div className='relative mb-4'>
                                <input
                                    className='p-4 bg-gray-100 rounded-md w-full focus:ring-2 focus:ring-blue-400 focus:outline-none'
                                    placeholder='Confirm Password'
                                    type={showPassword ? "text" : "password"}
                                    name='confirmPassword'
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 cursor-pointer" onClick={togglePasswordVisibility}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </span>
                            </div>
                        </>
                    )}
                    {message && <p className={`text-center text-sm mb-4 ${messageType === 'error' ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
                    <button className='p-4 bg-blue-500 text-white rounded-md w-full hover:bg-blue-600 transition-all' type='submit'>
                        <h1 className='text-center text-white font-medium'>{step === 1 ? 'Send OTP' : 'Submit'}</h1>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgetPassword;
