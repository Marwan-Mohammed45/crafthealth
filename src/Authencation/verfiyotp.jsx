import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [userType, setUserType] = useState('patient'); // patient or doctor
  const [email, setEmail] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Get email from navigation state or localStorage
  useEffect(() => {
    const userEmail = location.state?.email || localStorage.getItem('registeringEmail') || 'exa***le@gmail.com';
    setEmail(userEmail);
    
    // Save email to localStorage if coming from navigation state
    if (location.state?.email) {
      localStorage.setItem('registeringEmail', location.state.email);
    }
  }, [location]);

  // Countdown for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Auto focus next input
    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    if (pasteData.length === 6 && !isNaN(pasteData)) {
      const otpArray = pasteData.split('');
      setOtp(otpArray);
      
      // Focus last input after paste
      document.getElementById(`otp-5`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      setError('Please enter the 6-digit code');
      setIsLoading(false);
      return;
    }

    try {
      // Determine API based on user type
      const apiUrl = userType === 'doctor' 
        ? 'https://health-craft-back-end.vercel.app/auth/api/doctor/verify-otp'
        : 'https://health-craft-back-end.vercel.app/auth/api/patient/verify-otp';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.includes('***') ? email.replace('***', '') : email,
          otp: otpValue
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Account verified successfully! Redirecting...');
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          localStorage.removeItem('registeringEmail');
          navigate('/login', { 
            state: { 
              message: 'Your account has been verified successfully! Please login.',
              verified: true 
            } 
          });
        }, 2000);
      } else {
        setError(data.message || 'Error verifying code');
      }
    } catch (error) {
      setError('Connection error. Please try again.');
      console.error('Error verifying OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    
    setIsResending(true);
    setError('');
    setSuccess('');

    try {
      // Determine API based on user type
      const apiUrl = userType === 'doctor' 
        ? 'https://health-craft-back-end.vercel.app/auth/api/doctor/resend-otp'
        : 'https://health-craft-back-end.vercel.app/auth/api/patient/resend-otp';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.includes('***') ? email.replace('***', '') : email
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Verification code sent successfully!');
        setCountdown(60); // 60 seconds countdown
      } else {
        setError(data.message || 'Error resending code');
      }
    } catch (error) {
      setError('Connection error. Please try again.');
      console.error('Error resending OTP:', error);
    } finally {
      setIsResending(false);
    }
  };

  const maskedEmail = email.includes('***') 
    ? email 
    : email.replace(/(.{3})(.*)(@.*)/, '$1***$3');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F6F1F1] to-[#E8F5E5] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#7EDF5E] to-[#5ACD3E] p-6 text-center">
          <h1 className="text-2xl font-bold text-white">Email Verification</h1>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* User Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Type:
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setUserType('patient')}
                className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                  userType === 'patient'
                    ? 'bg-[#7EDF5E] text-white border-[#7EDF5E]'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                Patient
              </button>
              <button
                type="button"
                onClick={() => setUserType('doctor')}
                className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                  userType === 'doctor'
                    ? 'bg-[#7EDF5E] text-white border-[#7EDF5E]'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                }`}
              >
                Doctor
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Check Your Email
            </h2>
            <p className="text-gray-600 mb-4">
              We've sent a verification code to your email:
            </p>
            <p className="text-[#14591D] font-medium bg-[#F0F9FF] py-2 px-4 rounded-lg">
              {maskedEmail}
            </p>
            <p className="text-gray-600 mt-4">
              Please check your inbox and enter the code below to activate your account.
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4"
            >
              {success}
            </motion.div>
          )}

          {/* OTP Input Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Verification Code:
              </label>
              <div className="flex justify-center space-x-2">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-[#7EDF5E] focus:outline-none transition-colors"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </div>

            {/* Verify Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-[#7EDF5E] to-[#5ACD3E] text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                  Verifying...
                </div>
              ) : (
                'Verify Account'
              )}
            </motion.button>
          </form>

          {/* Resend Code Section */}
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              Didn't receive the code?{' '}
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={countdown > 0 || isResending}
                className={`font-semibold ${
                  countdown > 0 || isResending
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-[#7EDF5E] hover:text-[#5ACD3E]'
                }`}
              >
                {isResending ? 'Sending...' : countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
              </button>
            </p>
          </div>

          {/* Back to Login */}
          <div className="text-center mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-[#14591D] hover:text-[#7EDF5E] transition-colors"
            >
              ← Back to Login
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-center">
          <p className="text-sm text-gray-600">
            Having trouble?{' '}
            <a href="mailto:support@healthsite.com" className="text-[#7EDF5E] hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOtp;