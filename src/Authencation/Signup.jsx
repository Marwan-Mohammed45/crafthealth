import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const PRIMARY = "#7EDF5E";

const ROLES = [
  { value: "patient", label: "Patient" },
  { value: "doctor", label: "Doctor" },
];

const GENDERS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const DAYS = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const SPECIALTIES = [
  "Surgery",
  "Orthopedics",
  "Cardiology",
  "Dentistry",
  "Dermatology",
  "ENT",
  "Internal Medicine",
  "Pediatrics",
  "Psychiatry"
];

// Backend API Service
class AuthService {
  constructor() {
    this.baseURL = "https://health-craft-back-end.vercel.app/auth/api";
  }

  async signup(userType, formData) {
    try {
      const endpoint = userType === 'doctor' 
        ? `${this.baseURL}/doctor/signup` 
        : `${this.baseURL}/patient/signup`;

      const submitData = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (key === 'availableTimes' || key === 'medicalHistory' || key === 'allergies') {
          submitData.append(key, JSON.stringify(formData[key]));
        } else if (key !== 'avatarFile' && key !== 'avatarPreview') {
          submitData.append(key, formData[key]);
        }
      });

      if (formData.avatarFile) {
        submitData.append('profileImage', formData.avatarFile);
      }

      const response = await fetch(endpoint, {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      const data = await response.json();
      
      // لا نقوم بحفظ التوكن بعد التسجيل مباشرة، ننتظر التحقق أولاً
      // سنقوم بحفظ التوكن بعد التحقق الناجح في صفحة OTP
      
      return data;
    } catch (error) {
      console.error("Signup error:", error);
      throw new Error(error.message || "An error occurred during signup");
    }
  }

  getToken() {
    const token = localStorage.getItem("authToken");
    const expiry = localStorage.getItem("tokenExpiry");
    
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

  logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenExpiry");
  }
}

export const authService = new AuthService();

export default function SignupForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    avatarFile: null,
    avatarPreview: "",
    isVerified: false,
    role: "patient",

    // Patient specific
    age: "",
    gender: "",
    address: "",
    medicalHistory: [],
    allergies: [],

    // Doctor specific
    specialty: "",
    experience: "",
    clinicAddress: "",
    availableTimes: [],
  });

  const [chipInputs, setChipInputs] = useState({ medicalHistory: "", allergies: "" });
  const [timeSlot, setTimeSlot] = useState({ day: "", start: "", end: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  // Animations
  const containerVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25, when: "beforeChildren", staggerChildren: 0.05 } },
    exit: { opacity: 0, y: 16, transition: { duration: 0.2 } },
  };
  
  const fadeItem = { 
    hidden: { opacity: 0, y: 10 }, 
    show: { opacity: 1, y: 0, transition: { duration: 0.2 } } 
  };

  // Update form fields
  function update(key, value) { 
    setForm((p) => ({ ...p, [key]: value }));
    if (errors.length > 0) setErrors([]);
  }

  // Handle avatar upload
  function onAvatarChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors(["Please select a valid image file"]);
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(["Image size should be less than 5MB"]);
      return;
    }
    
    update("avatarFile", file);
    const reader = new FileReader();
    reader.onload = () => update("avatarPreview", String(reader.result || ""));
    reader.readAsDataURL(file);
  }

  // Chip input functions
  function addChip(field) {
    const value = (chipInputs[field] || "").trim();
    if (!value) return;
    if (form[field].includes(value)) return;
    update(field, [...form[field], value]);
    setChipInputs((p) => ({ ...p, [field]: "" }));
  }

  function removeChip(field, value) { 
    update(field, form[field].filter((v) => v !== value)); 
  }

  // Time slot functions
  function addTimeSlot() {
    const { day, start, end } = timeSlot;
    if (!day || !start || !end) {
      setErrors(["Please fill all time slot fields"]);
      return;
    }
    
    if (start >= end) {
      setErrors(["End time must be after start time"]);
      return;
    }
    
    update("availableTimes", [...form.availableTimes, { day, start, end }]);
    setTimeSlot({ day: "", start: "", end: "" });
  }

  function removeTimeSlot(index) {
    const next = [...form.availableTimes];
    next.splice(index, 1);
    update("availableTimes", next);
  }

  // Form validation
  function validate() {
    const errs = [];
    
    // Common validations
    if (!form.name.trim()) errs.push("Name is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.push("Invalid email format");
    if (form.password.length < 6) errs.push("Password must be at least 6 characters");
    if (!/^\+?\d{7,15}$/.test((form.phone || "").replace(/\s/g, ""))) errs.push("Invalid phone number");

    // Role-specific validations
    if (form.role === "patient") {
      if (!form.age || form.age < 0 || form.age > 150) errs.push("Valid age is required");
      if (!form.gender) errs.push("Gender is required");
      if (!form.address.trim()) errs.push("Address is required");
    } else {
      if (!form.specialty) errs.push("Specialty is required");
      if (!form.experience || form.experience < 0) errs.push("Valid years of experience is required");
      if (!form.clinicAddress.trim()) errs.push("Clinic address is required");
    }
    
    return errs;
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    
    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Prepare form data for submission
      const submitData = { ...form };
      delete submitData.avatarPreview;
      
      // Call signup API
      const result = await authService.signup(form.role, submitData);
      
      console.log("Signup successful:", result);
      
      // حفظ البريد الإلكتروني للاستخدام في صفحة التحقق
      localStorage.setItem('registeringEmail', form.email);
      
      // التوجيه إلى صفحة التحقق بعد التسجيل الناجح
      setTimeout(() => {
        navigate("/verify-otp", { 
          state: { 
            email: form.email,
            userType: form.role,
            message: "Account created successfully! Please verify your email." 
          } 
        });
      }, 1000);
      
    } catch (error) {
      console.error("Signup failed:", error);
      setErrors([error.message || "Signup failed. Please try again."]);
    } finally {
      setIsLoading(false);
    }
  }

  // Segmented indicator for LTR
  const isPatient = form.role === "patient";
  const indicatorStyle = { left: isPatient ? 4 : "calc(50% + 4px)" };

  // UI classes
  const fieldWrap = "group relative";
  const label = "absolute -top-2 start-3 inline-flex items-center gap-1 rounded-full bg-white px-2 text-xs text-zinc-600 transition-colors group-focus-within:text-[var(--primary)] font-medium";
  const input = "w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 pt-3 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition shadow-sm hover:shadow";
  const sectionCard = "rounded-2xl border border-zinc-200 bg-white/70 p-5 shadow-sm";

  return (
    <div dir="ltr" className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 py-10" style={{ ['--primary']: PRIMARY }}>
      <div className="mx-auto max-w-4xl px-4">
        {/* Brand row + Back button */}
        <div className="mb-6 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, y: -8 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.35 }} 
            className="flex items-center gap-2"
          >
            <motion.div 
              whileHover={{ rotate: -3, scale: 1.05 }} 
              className="h-9 w-9 overflow-hidden rounded-xl ring-1 ring-[var(--primary)]/40 bg-[var(--primary)]/10 flex items-center justify-center"
            >
              <div className="h-5 w-5 flex items-center justify-center font-bold" style={{ color: PRIMARY }}>
                H
              </div>
            </motion.div>
            <motion.span 
              initial={{ opacity: 0, x: -6 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ delay: 0.1 }} 
              className="text-xl font-extrabold tracking-wide" 
              style={{ color: PRIMARY }}
            >
              Craft Health
            </motion.span>
          </motion.div>

          <motion.button
            onClick={() => navigate("/")}
            className="group inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-700 hover:bg-zinc-50 transition shadow-sm"
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span>Back</span>
          </motion.button>
        </div>

        {/* Title + role switch */}
        <motion.div 
          initial={{ opacity: 0, y: -6 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.3 }} 
          className="mb-5 flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Create Account</h1>
            <p className="text-zinc-500">Choose your role and complete the details.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700 text-sm">
              {form.role === "patient" ? "Patient" : "Doctor"}
            </span>
            <div className="relative rounded-2xl bg-white p-1 ring-1 ring-zinc-200">
              <div className="grid grid-cols-2">
                {ROLES.map((r) => (
                  <button 
                    key={r.value} 
                    type="button" 
                    onClick={() => update("role", r.value)} 
                    className={`relative z-10 px-3 py-1.5 text-sm transition ${
                      form.role === r.value ? "text-black" : "text-zinc-500 hover:text-zinc-700"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
              <motion.span 
                layout 
                transition={{ type: "spring", stiffness: 300, damping: 30 }} 
                className="absolute inset-y-1 w-1/2 rounded-xl bg-[var(--primary)]/15 ring-1 ring-[var(--primary)]/40" 
                style={indicatorStyle} 
              />
            </div>
          </div>
        </motion.div>

        {/* Error Messages */}
        {errors.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-700 border border-red-200"
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

        {/* Centered form */}
        <div className="flex w-full justify-center">
          <section className={`${sectionCard} w-full max-w-2xl`}>
            <motion.form 
              onSubmit={handleSubmit} 
              initial="hidden" 
              animate="show" 
              variants={{ show: { transition: { staggerChildren: 0.04 } } }} 
              className="grid grid-cols-1 gap-4"
            >
              {/* Common Fields */}
              <motion.div variants={fadeItem} className={fieldWrap}>
                <label className={label}>Full Name</label>
                <input 
                  className={input} 
                  value={form.name} 
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Enter your full name"
                />
              </motion.div>

              <motion.div variants={fadeItem} className={fieldWrap}>
                <label className={label}>Email Address</label>
                <input 
                  type="email" 
                  className={input} 
                  value={form.email} 
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="your.email@example.com"
                />
              </motion.div>

              <motion.div variants={fadeItem} className={fieldWrap}>
                <label className={label}>Password</label>
                <input 
                  type="password" 
                  className={input} 
                  value={form.password} 
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="At least 6 characters"
                />
              </motion.div>

              <motion.div variants={fadeItem} className={fieldWrap}>
                <label className={label}>Phone Number</label>
                <input 
                  className={input} 
                  value={form.phone} 
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+1234567890"
                />
              </motion.div>

              {/* Profile Image Upload */}
              <motion.div variants={fadeItem} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                <div className="md:col-span-2">
                  <div className={fieldWrap}>
                    <label className={label}>Profile Image (Optional)</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={onAvatarChange} 
                      className="block w-full rounded-xl border border-dashed border-zinc-300 bg-white px-3 py-3 transition hover:border-[var(--primary)]/60" 
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm text-zinc-600">Preview</span>
                  <div className="h-24 w-24 overflow-hidden rounded-xl ring-1 ring-zinc-200 bg-white flex items-center justify-center">
                    <AnimatePresence initial={false}>
                      {form.avatarPreview ? (
                        <motion.img 
                          key={form.avatarPreview} 
                          src={form.avatarPreview} 
                          alt="avatar preview" 
                          className="h-full w-full object-cover" 
                          initial={{ opacity: 0, scale: 0.95 }} 
                          animate={{ opacity: 1, scale: 1 }} 
                          exit={{ opacity: 0, scale: 0.95 }} 
                          transition={{ duration: 0.25 }} 
                        />
                      ) : (
                        <motion.span 
                          key="no-img" 
                          className="text-xs text-zinc-400" 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          exit={{ opacity: 0 }}
                        >
                          No image
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeItem} className="flex items-center gap-2">
                <input 
                  id="verified" 
                  type="checkbox" 
                  checked={form.isVerified} 
                  onChange={(e) => update("isVerified", e.target.checked)} 
                  className="rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                />
                <label htmlFor="verified" className="text-sm text-zinc-700">
                  Verified account
                </label>
              </motion.div>

              {/* Conditional Role Sections */}
              <AnimatePresence mode="wait">
                {form.role === "patient" ? (
                  <motion.div 
                    key="patient" 
                    variants={containerVariants} 
                    initial="hidden" 
                    animate="show" 
                    exit="exit" 
                    className="grid grid-cols-1 gap-4"
                  >
                    <motion.div variants={fadeItem} className={fieldWrap}>
                      <label className={label}>Age</label>
                      <input 
                        type="number" 
                        min={0} 
                        max={150}
                        className={input} 
                        value={form.age} 
                        onChange={(e) => update("age", e.target.value)}
                        placeholder="Enter your age"
                      />
                    </motion.div>
                    
                    <motion.div variants={fadeItem} className={fieldWrap}>
                      <label className={label}>Gender</label>
                      <select 
                        className={input} 
                        value={form.gender} 
                        onChange={(e) => update("gender", e.target.value)}
                      >
                        <option value="">Select Gender</option>
                        {GENDERS.map((g) => (
                          <option key={g.value} value={g.value}>{g.label}</option>
                        ))}
                      </select>
                    </motion.div>
                    
                    <motion.div variants={fadeItem} className={fieldWrap}>
                      <label className={label}>Address</label>
                      <input 
                        className={input} 
                        value={form.address} 
                        onChange={(e) => update("address", e.target.value)}
                        placeholder="Your complete address"
                      />
                    </motion.div>

                    {/* Medical History Chips */}
                    <motion.div variants={fadeItem}>
                      <div className={fieldWrap}>
                        <label className={label}>Medical History (Optional)</label>
                        <ChipInput 
                          placeholder="e.g., diabetes, hypertension" 
                          value={chipInputs.medicalHistory} 
                          onChange={(v) => setChipInputs((p) => ({ ...p, medicalHistory: v }))} 
                          onAdd={() => addChip("medicalHistory")} 
                        />
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {form.medicalHistory.map((item) => (
                          <span 
                            key={item} 
                            className="inline-flex items-center gap-1 rounded-full border border-[var(--primary)]/40 bg-[var(--primary)]/10 px-3 py-1 text-sm text-emerald-700"
                          >
                            {item}
                            <button 
                              className="ms-2 text-emerald-700/70 hover:text-emerald-900" 
                              onClick={(e) => { e.preventDefault(); removeChip("medicalHistory", item); }}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Allergies Chips */}
                    <motion.div variants={fadeItem}>
                      <div className={fieldWrap}>
                        <label className={label}>Allergies (Optional)</label>
                        <ChipInput 
                          placeholder="e.g., penicillin, peanuts" 
                          value={chipInputs.allergies} 
                          onChange={(v) => setChipInputs((p) => ({ ...p, allergies: v }))} 
                          onAdd={() => addChip("allergies")} 
                        />
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {form.allergies.map((item) => (
                          <span 
                            key={item} 
                            className="inline-flex items-center gap-1 rounded-full border border-[var(--primary)]/40 bg-[var(--primary)]/10 px-3 py-1 text-sm text-emerald-700"
                          >
                            {item}
                            <button 
                              className="ms-2 text-emerald-700/70 hover:text-emerald-900" 
                              onClick={(e) => { e.preventDefault(); removeChip("allergies", item); }}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="doctor" 
                    variants={containerVariants} 
                    initial="hidden" 
                    animate="show" 
                    exit="exit" 
                    className="grid grid-cols-1 gap-4"
                  >
                    <motion.div variants={fadeItem} className={fieldWrap}>
                      <label className={label}>Specialty</label>
                      <select 
                        className={input} 
                        value={form.specialty} 
                        onChange={(e) => update("specialty", e.target.value)}
                      >
                        <option value="">Select Specialty</option>
                        {SPECIALTIES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </motion.div>
                    
                    <motion.div variants={fadeItem} className={fieldWrap}>
                      <label className={label}>Years of Experience</label>
                      <input 
                        type="number" 
                        min={0} 
                        max={60}
                        className={input} 
                        value={form.experience} 
                        onChange={(e) => update("experience", e.target.value)}
                        placeholder="Number of years"
                      />
                    </motion.div>
                    
                    <motion.div variants={fadeItem} className={fieldWrap}>
                      <label className={label}>Clinic Address</label>
                      <input 
                        className={input} 
                        value={form.clinicAddress} 
                        onChange={(e) => update("clinicAddress", e.target.value)}
                        placeholder="Clinic complete address"
                      />
                    </motion.div>

                    <motion.div variants={fadeItem}>
                      <label className="mb-1 block text-sm font-medium text-zinc-700">Available Times (Optional)</label>
                      <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
                        <select 
                          className={input} 
                          value={timeSlot.day} 
                          onChange={(e) => setTimeSlot((p) => ({ ...p, day: e.target.value }))}
                        >
                          <option value="">Day</option>
                          {DAYS.map((d) => (<option key={d} value={d}>{d}</option>))}
                        </select>
                        <input 
                          type="time" 
                          className={input} 
                          value={timeSlot.start} 
                          onChange={(e) => setTimeSlot((p) => ({ ...p, start: e.target.value }))} 
                        />
                        <input 
                          type="time" 
                          className={input} 
                          value={timeSlot.end} 
                          onChange={(e) => setTimeSlot((p) => ({ ...p, end: e.target.value }))} 
                        />
                        <button 
                          type="button" 
                          className="rounded-xl bg-[var(--primary)] px-4 py-2 text-white shadow hover:brightness-95 transition" 
                          onClick={addTimeSlot}
                        >
                          Add Slot
                        </button>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {form.availableTimes.map((t, i) => (
                          <span 
                            key={`${t.day}-${i}`} 
                            className="inline-flex items-center gap-1 rounded-full border border-[var(--primary)]/40 bg-[var(--primary)]/10 px-3 py-1 text-sm text-emerald-700"
                          >
                            {t.day}: {t.start} - {t.end}
                            <button 
                              className="ms-2 text-emerald-700/70 hover:text-emerald-900" 
                              onClick={(e) => { e.preventDefault(); removeTimeSlot(i); }}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => navigate("/")} 
                  className="rounded-xl border border-zinc-300 bg-white px-6 py-2.5 text-zinc-700 hover:bg-zinc-50 transition font-medium"
                >
                  Cancel
                </button>
                <motion.button 
                  whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -1, boxShadow: isLoading ? "none" : "0 10px 24px rgba(126,223,94,0.25)" }} 
                  whileTap={{ scale: 0.98 }} 
                  type="submit" 
                  disabled={isLoading}
                  className={`rounded-xl bg-[var(--primary)] px-6 py-2.5 font-semibold text-white shadow transition ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </div>
                  ) : (
                    `Create ${form.role === 'patient' ? 'Patient' : 'Doctor'} Account`
                  )}
                </motion.button>
              </div>

              {/* Login CTA */}
              <div className="mt-5 text-center text-sm text-zinc-700">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-[var(--primary)] hover:underline">
                  Log in
                </Link>
              </div>
            </motion.form>
          </section>
        </div>
      </div>
    </div>
  );
}

function ChipInput({ value, onChange, onAdd, placeholder }) {
  const input = "w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition shadow-sm hover:shadow";
  
  return (
    <div className="flex items-center gap-2">
      <input
        className={input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { 
          if (e.key === "Enter") { 
            e.preventDefault(); 
            onAdd(); 
          } 
        }}
      />
      <motion.button 
        whileHover={{ scale: 1.02 }} 
        whileTap={{ scale: 0.98 }} 
        type="button" 
        onClick={onAdd} 
        className="whitespace-nowrap rounded-xl bg-[var(--primary)] px-3 py-2 text-white shadow hover:brightness-95"
      >
        Add
      </motion.button>
    </div>
  ); 
}