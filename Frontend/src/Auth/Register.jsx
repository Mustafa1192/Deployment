//UI FOR NOTES 
import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const RegistrationForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Add state for password visibility

    const navigate = useNavigate();

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    // Password validation regex (at least 8 characters, one uppercase, one lowercase, one special character)
    const isValidPassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const emailRegex = /^[a-zA-Z0-9._%+-]+@aiktc\.ac\.in$/;
    
        if (!name || !email || !password) {
            setError('All fields are required.');
            return;
        }
    
        if (!emailRegex.test(email)) {
            setError('Please use an email ending with @aiktc.ac.in.');
            return;
        }
    
        if (!isValidPassword(password)) {
            setError('Your password must be at least 8 characters long and include at least one uppercase letter (A-Z), one lowercase letter (a-z), and one special character.');
            return;
        }
    
        setError(''); // Clear errors before further processing
    
        try {
            const response = await fetch('https://deployment-2-99do.onrender.com/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: name, email }),
            });
    
            const result = await response.json();
    
            if (response.status === 200) {
                setSuccess('OTP sent to your email.');
                navigate('/Verify', { state: { email, password, name } });
            } else {
                setError(result.message || 'Something went wrong!');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Server error. Please try again later.');
        }
    };
    

    return (
        <div className="h-screen bg-gray-100 p-5 flex justify-center items-center">
            <div className='pt-10 w-full sm:w-96 md:w-80'>
                    <h1 className='text-center text-4xl font-bold text-blue-700'>Hi, BScIT! Champ</h1>
                <p className='text-center text-lg text-gray-600 mt-4'>Join Bsc IT Originals Notes and start organizing smarter</p>

                <form onSubmit={handleSubmit} className='mt-8 text-center flex flex-col items-center'>
                    <input 
                        className='p-3 w-full sm:w-80 bg-white rounded-lg shadow border-gray-300 focus:ring-2 focus:ring-blue-500' 
                        placeholder='Full Name' 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <br />
                    <input 
                        className='p-3 w-full sm:w-80 bg-white rounded-lg shadow border-gray-300 focus:ring-2 focus:ring-blue-500' 
                        placeholder='Email Address' 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <br />
                    <div className='relative w-full sm:w-80 bg-white rounded-lg shadow border-gray-300'>
                        <input 
                            className='p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none' 
                            placeholder='Create Password' 
                            type={showPassword ? "text" : "password"} 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <span 
                            className="absolute right-3 top-3 text-gray-500 cursor-pointer" 
                            onClick={togglePasswordVisibility}
                        >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>

                    {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
                    {success && <p className="text-green-500 mt-3 text-sm">{success}</p>}

                    <button 
                        className='p-3 w-full sm:w-80 mt-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition' 
                        type="submit"
                    >
                        Send OTP
                    </button>
                </form>

                <Link to="/Login">
                    <h2 className='text-center mt-6 text-gray-600'>Already have an account?&nbsp;
                        <span className='text-blue-600 font-medium'>Login here</span>
                    </h2>
                </Link>
            </div>
        </div>
    );
};

export default RegistrationForm;
