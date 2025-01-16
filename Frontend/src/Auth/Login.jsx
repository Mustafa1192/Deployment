import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://deployment-2-99do.onrender.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setMessageType('success');
                setMessage(result.message);
                setTimeout(() => {
                    navigate('/LandingPage'); // Redirect to home page after successful login
                }, 2000);
            } else {
                setMessageType('error');
                setMessage(result.message);
            }
        } catch (error) {
            setMessageType('error');
            setMessage('Server error');
        }
    };

    return (
        <div className="w-full h-screen bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] flex flex-col justify-center items-center">
            <div className='w-full max-w-md p-6 bg-white rounded-xl shadow-lg'>
                <h1 className='text-2xl font-bold text-center text-[#1E293B]'>Welcome Back!</h1>
                <p className='text-center text-sm text-[#64748B] mt-2'>Log in to access your notes</p>

                <form className='mt-6 space-y-4' onSubmit={handleSubmit}>
                    <input 
                        className='w-full p-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:outline-none text-[#1E293B]' 
                        placeholder='Enter username' 
                        type='text' 
                        name='username' 
                        value={formData.username} 
                        onChange={handleChange} 
                    />
                    <div className='relative'>
                        <input 
                            className='w-full p-4 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:outline-none text-[#1E293B]' 
                            placeholder='Password' 
                            type={showPassword ? "text" : "password"} 
                            name='password' 
                            value={formData.password} 
                            onChange={handleChange} 
                        />
                        <span className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-[#9CA3AF]" onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    {message && <p className={`text-center text-sm ${messageType === 'error' ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
                    <Link to="/Forget" className='block text-right text-sm text-[#3B82F6]'>Forgot Password?</Link>

                    <button 
                        className='w-full py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg font-semibold text-sm'>
                        Log In
                    </button>
                </form>

                <div className='mt-6 text-center'>
                    <p className='text-sm text-[#1E293B]'>Don't have an account?&nbsp;
                        <Link to="/" className='text-[#3B82F6] hover:underline'>Register Now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
