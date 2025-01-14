//UI FOR NOTES 
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
    
    const Verify = () => {
        const [otp, setOtp] = useState('');
        const [error, setError] = useState('');
        const [success, setSuccess] = useState('');
        const [resendMessage, setResendMessage] = useState('');
        const [timer, setTimer] = useState(60);
        const [isResendDisabled, setIsResendDisabled] = useState(true);

        const location = useLocation();
        const navigate = useNavigate();

        // Timer logic for countdown
        useEffect(() => {
            let countdown;
            if (timer > 0) {
                countdown = setInterval(() => {
                    setTimer((prev) => prev - 1);
                }, 1000);
            } else {
                setIsResendDisabled(false);
            }

            return () => clearInterval(countdown);
        }, [timer]);

        // Function to handle OTP verification
        const handleVerify = async (event) => {
            event.preventDefault();

            try {
                const response = await fetch('http://localhost:5000/verify-otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: location.state.email,
                        otp,
                        password: location.state.password,
                    }),
                });

                const data = await response.json();

                if (response.status === 200) {
                    setSuccess('OTP verified successfully!');
                    navigate('/LandingPage');  
                } else {
                    setError(data.message || 'Invalid OTP. Please try again.');
                }
            } catch (error) {
                setError('Server error, please try again later.');
            }
        };

        // Function to handle Resend OTP
        const handleResendOtp = async () => {
            setResendMessage('');
            setError('');
            setSuccess('');
            setTimer(60);
            setIsResendDisabled(true);

            try {
                const response = await fetch('http://localhost:5000/send-otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: location.state.username,
                        email: location.state.email,
                    }),
                });

                const data = await response.json();

                if (response.status === 200) {
                    setResendMessage('OTP has been resent to your email!');
                } else {
                    setError(data.message || 'Failed to resend OTP.');
                }
            } catch (error) {
                setError('Error resending OTP, please try again later.');
            }
        };
    
        return (
            <div className="h-screen bg-gray-100 p-5 flex flex-col justify-center items-center">
                <div className='w-full sm:w-96 bg-white p-8 rounded-lg shadow-md'>
                    <h1 className='text-center text-3xl font-bold text-blue-600'>Verify OTP</h1>
                    <p className='text-center text-sm text-gray-500 mt-4'>
                        An OTP has been sent to <span className='font-semibold'>{location.state.email}</span>
                    </p>
    
                    <form onSubmit={handleVerify} className='mt-6'>
                        <input 
                            className='w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4' 
                            placeholder='Enter OTP' 
                            type='text' 
                            value={otp} 
                            onChange={(e) => setOtp(e.target.value)} 
                        />
                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
                        {resendMessage && <p className="text-green-500 text-sm mb-2">{resendMessage}</p>}
    
                        <button 
                            className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all' 
                            type='submit'>
                            VERIFY OTP
                        </button>
                    </form>
    
                    <p className='text-center text-sm text-gray-500 mt-4'>
                        Resend OTP in <span className='font-semibold'>{timer > 0 ? `${timer}s` : ''}</span>
                    </p>
                    <button 
                        className={`mt-2 text-sm font-semibold text-blue-600 hover:underline ${isResendDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        disabled={isResendDisabled}
                        onClick={() => {
                            if (!isResendDisabled) handleResendOtp();
                        }}>
                        Resend OTP
                    </button>
                </div>
            </div>
        );
    };
    
export default Verify;
    