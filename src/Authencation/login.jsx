import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const PRIMARY = "#7EDF5E";

// Backend API Service
class AuthService {
  constructor() {
    this.baseURL = "https://health-craft-back-end.vercel.app/auth/api";
  }

  async login(userType, email, password) {
    try {
      const endpoint = userType === 'doctor' 
        ? `${this.baseURL}/doctor/signin` 
        : `${this.baseURL}/patient/signin`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: email,
          password: password 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      
      // Save token and user info in localStorage
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userType", userType);
        localStorage.setItem("user", JSON.stringify(data.user || data));
        
        // Set expiry for 7 days
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);
        localStorage.setItem("tokenExpiry", expiryDate.toISOString());
      }
      
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error.message || "An error occurred during login");
    }
  }

  logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenExpiry");
  }

  getToken() {
    const token = localStorage.getItem("authToken");
    const expiry = localStorage.getItem("tokenExpiry");
    
    // Check if token expired
    if (token && expiry && new Date() > new Date(expiry)) {
      this.logout();
      return null;
    }
    
    return token;
  }

  getUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  getUserType() {
    return localStorage.getItem("userType");
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  // Add token header for future requests
  getAuthHeader() {
    const token = this.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
}

export const authService = new AuthService();

export default function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    email: "", 
    password: "" 
  });
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [userType, setUserType] = useState("patient");

  // Animations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.4, 
        when: "beforeChildren", 
        staggerChildren: 0.1 
      } 
    }
  };
  
  const fadeItem = { 
    hidden: { opacity: 0, y: 15 }, 
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      } 
    } 
  };

  const scaleItem = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      } 
    }
  };

  // CSS Classes
  const fieldWrap = "group relative mb-4";
  const label = "absolute -top-2 start-3 inline-flex items-center gap-1 rounded-full bg-white z-10 px-2 text-xs text-zinc-600 transition-colors group-focus-within:text-[var(--primary)] font-medium";
  const input = "w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 pt-5 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all duration-200 shadow-sm hover:shadow";
  const sectionCard = "rounded-2xl border border-zinc-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm";

  // Update form fields
  function update(key, value) { 
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors.length > 0) setErrors([]);
  }

  // Validate form data
  function validate() {
    const errs = [];
    
    if (!form.email.trim()) {
      errs.push("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.push("Invalid email format");
    }
    
    if (!form.password) {
      errs.push("Password is required");
    } else if (form.password.length < 6) {
      errs.push("Password must be at least 6 characters");
    }
    
    return errs;
  }

  // Handle login submission
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate form
    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Attempt login
      const result = await authService.login(userType, form.email, form.password);
      
      console.log("Login successful:", result);
      
      // Redirect after successful login
      setTimeout(() => {
        if (userType === 'doctor') {
          navigate("/doctor/dashboard", { 
            state: { message: "Login successful!" } 
          });
        } else {
          navigate("/patient/dashboard", { 
            state: { message: "Login successful!" } 
          });
        }
      }, 500);
      
    } catch (error) {
      console.error("Login failed:", error);
      setErrors([error.message || "Login failed. Please check your credentials and try again"]);
    } finally {
      setIsLoading(false);
    }
  }

  // Handle demo login
  function handleDemoLogin() {
    setForm({
      email: userType === 'doctor' ? "doctor@demo.com" : "patient@demo.com",
      password: "123456"
    });
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 py-8 flex items-center justify-center"
      style={{ ['--primary']: PRIMARY }}
    >
      <div className="w-full max-w-md mx-4">
        {/* Main Card */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className={sectionCard}
        >
          {/* Header */}
          <motion.div 
            variants={fadeItem}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <motion.div 
                whileHover={{ rotate: -5, scale: 1.1 }}
                className="h-12 w-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center border border-[var(--primary)]/20"
              >
                <span className="text-xl font-bold" style={{ color: PRIMARY }}>H</span>
              </motion.div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Login to Your Account</h1>
            <p className="text-gray-600 text-sm">Welcome back. Select your role and enter your details</p>
          </motion.div>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* User Type Selection */}
            <motion.div variants={fadeItem} className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">I am a:</label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  onClick={() => setUserType("patient")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`rounded-xl border-2 p-3 text-sm font-medium transition-all duration-200 ${
                    userType === "patient"
                      ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] shadow-md"
                      : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span>Patient</span>
                  </div>
                </motion.button>
                
                <motion.button
                  type="button"
                  onClick={() => setUserType("doctor")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`rounded-xl border-2 p-3 text-sm font-medium transition-all duration-200 ${
                    userType === "doctor"
                      ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] shadow-md"
                      : "border-gray-300 bg-white text-gray-600 hover:border-gray-400"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    <span>Doctor</span>
                  </div>
                </motion.button>
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div variants={fadeItem} className={fieldWrap}>
              <label className={label}>Email Address</label>
              <input 
                className={input}
                type="email" 
                value={form.email} 
                onChange={(e) => update("email", e.target.value)} 
                placeholder="you@example.com"
              />
            </motion.div>

            {/* Password Field */}
            <motion.div variants={fadeItem} className={fieldWrap}>
              <label className={label}>Password</label>
              <div className="relative">
                <input 
                  className={`${input} pr-12`}
                  type={showPwd ? "text" : "password"} 
                  value={form.password} 
                  onChange={(e) => update("password", e.target.value)} 
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPwd((v) => !v)} 
                  className="absolute inset-y-0 right-0 my-auto rounded-md px-3 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>
            </motion.div>

            {/* Error Messages */}
            {errors.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700 border border-red-200"
              >
                <div className="flex items-start">
                  <svg className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    {errors.map((error, index) => (
                      <div key={index}>• {error}</div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Remember Me & Forgot Password */}
            <motion.div variants={fadeItem} className="flex items-center justify-between mb-6">
              <label className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]" 
                />
                Remember me
              </label>
              <Link 
                to="/forgot-password" 
                className="text-sm font-medium text-[var(--primary)] hover:underline transition-colors"
              >
                Forgot password?
              </Link>
            </motion.div>

            {/* Login Button */}
            <motion.button
              variants={scaleItem}
              whileHover={{ 
                scale: isLoading ? 1 : 1.02, 
                boxShadow: isLoading ? "none" : "0 8px 20px rgba(126, 223, 94, 0.3)" 
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full rounded-xl bg-[var(--primary)] px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 ${
                isLoading ? "opacity-80 cursor-not-allowed" : "hover:shadow-xl"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                `Sign in as ${userType === 'doctor' ? 'Doctor' : 'Patient'}`
              )}
            </motion.button>

            {/* Demo Button */}
            <motion.button
              type="button"
              onClick={handleDemoLogin}
              variants={fadeItem}
              className="w-full mt-3 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Try demo account
            </motion.button>
          </form>

          {/* Social Login */}
          <motion.div variants={fadeItem} className="mt-8">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50"
              >
                <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </motion.button>
            </div>
          </motion.div>

          {/* Sign Up Link */}
          <motion.div variants={fadeItem} className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link 
                to={  "/signup"} 
                className="font-medium text-[var(--primary)] hover:underline"
              >
                Sign up as {userType === 'doctor' ? 'Doctor' : 'Patient'}
              </Link>
            </p>
          </motion.div>
        </motion.div>

        <motion.button
          onClick={() => navigate("/")}
          className="mt-4 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to home
        </motion.button>
      </div>
    </div>
  );
}