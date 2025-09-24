import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import iconUrl from "../assets/icon.png";
import { Link, useNavigate } from "react-router-dom";

const MotionLink = motion(Link);

export default function PremiumNavbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(""); // patient, doctor, admin
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [langDesktop, setLangDesktop] = useState("EN");
  const [langDesktopOpen, setLangDesktopOpen] = useState(false);
  const desktopBtnRef = useRef(null);
  const desktopDdRef = useRef(null);

  const [langMobile, setLangMobile] = useState("EN");
  const [langMobileOpen, setLangMobileOpen] = useState(false);
  const mobileBtnRef = useRef(null);
  const mobileDdRef = useRef(null);

  // إعداد flag للتبديل بين الخيارين A و B
  const [useCombinedNavItems, setUseCombinedNavItems] = useState(true); // true = الخيار B, false = الخيار A

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const baseNavItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ];

  // الحاجات الأساسية بعد تسجيل الدخول (Home فقط)
  const loggedInBaseNavItems = [
    { label: "Home", href: "/" }
  ];

  const patientNavItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "My Appointments", href: "/appointments" },
    { label: "Medical Records", href: "/medical-records" },
  ];

  const doctorNavItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Appointments", href: "/appointments" },
    { label: "My Patients", href: "/patients" },

  ];

  const adminNavItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "User Management", href: "/admin/users" },
    { label: "Analytics", href: "/admin/analytics" },
    { label: "System Settings", href: "/admin/settings" },
    { label: "Reports", href: "/admin/reports" },
    { label: "Support Tickets", href: "/admin/support" },
    { label: "Hospital Management", href: "/admin/hospitals" },
    { label: "Backup & Restore", href: "/admin/backup" }
  ];

  // Check if user is logged in with token expiry check
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("authToken");
      const storedUser = localStorage.getItem("user");
      const storedUserType = localStorage.getItem("userType");
      const tokenExpiry = localStorage.getItem("tokenExpiry");

      if (token && storedUser) {
        // اذا التوكن منتهي اعمل logout
        if (tokenExpiry && Date.now() > Number(tokenExpiry)) {
          handleLogout();
          return;
        }

        try {
          setIsLoggedIn(true);
          setUser(JSON.parse(storedUser));
          setUserType(storedUserType || JSON.parse(storedUser).role || "patient");
        } catch (err) {
          console.error(err);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setUserType("");
      }
    };

    checkAuthStatus();
    
    // Listen for storage changes (for logout from other tabs)
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (desktopDdRef.current && !desktopDdRef.current.contains(e.target) && desktopBtnRef.current && !desktopBtnRef.current.contains(e.target)) {
        setLangDesktopOpen(false);
      }
      if (mobileDdRef.current && !mobileDdRef.current.contains(e.target) && mobileBtnRef.current && !mobileBtnRef.current.contains(e.target)) {
        setLangMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenExpiry");
    setIsLoggedIn(false);
    setUser(null);
    setUserType("");
    navigate("/");
    setMobileOpen(false);
  };

  const handleNavClick = (item) => {
    setActiveLink(item.label);
    setMobileOpen(false);
    
    if (item.href) {
      navigate(item.href);
    }
  };

  // وظيفة getNavItems المعدلة - بعد تسجيل الدخول تظهر Home فقط من الأساسيات
  const getNavItems = () => {
    if (!isLoggedIn) return baseNavItems;

    if (useCombinedNavItems) {
      // الخيار B: عرض loggedInBaseNavItems (Home فقط) + القايمة الخاصة بالدور
      switch (userType) {
        case "doctor":
          return [...loggedInBaseNavItems, ...doctorNavItems];
        case "admin":
          return [...loggedInBaseNavItems, ...adminNavItems];
        case "patient":
        default:
          return [...loggedInBaseNavItems, ...patientNavItems];
      }
    } else {
      // الخيار A: عرض فقط القايمة الخاصة بالدور (بدون baseNavItems)
      switch (userType) {
        case "doctor":
          return doctorNavItems;
        case "admin":
          return adminNavItems;
        case "patient":
        default:
          return patientNavItems;
      }
    }
  };

  const navItems = getNavItems();

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      height: isScrolled ? "70px" : "80px",
      transition: { 
        type: "spring", 
        stiffness: 200,
        damping: 20,
        when: "beforeChildren"
      }
    },
  };

  const logoVariants = {
    hover: { 
      y: [0, -3, 0],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 150,
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      y: -30,
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 300 }
    },
    exit: { opacity: 0, x: -20 }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 8px 20px rgba(126, 223, 94, 0.3)",
      y: -2,
      transition: { type: "spring", stiffness: 400 }
    },
    tap: { scale: 0.98, y: 0 }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    },
    exit: { opacity: 0, y: -10, scale: 0.95 }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md ${isScrolled ? "bg-[#F6F1F1]/95 shadow-lg" : "bg-[#F6F1F1]/80"}`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-3 cursor-pointer"
          whileHover="hover"
          onClick={() => navigate("/")}
        >
          <motion.img 
            src={iconUrl} 
            alt="Logo" 
            className="w-9 h-9"
            variants={logoVariants}
          />
          <span className="text-2xl font-bold text-[#14591D] tracking-wide">HealthSite</span>
        </motion.div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6 text-[#14591D] font-semibold">
          {navItems.map((item) => (
            <motion.li 
              key={item.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={item.href}
                className="relative px-3 py-2 overflow-hidden rounded-lg transition-colors hover:bg-[#7EDF5E]/10 block"
                onClick={() => setActiveLink(item.label)}
              >
                {item.label}
                {activeLink === item.label && (
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[#7EDF5E]"
                    layoutId="activeLink"
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                )}
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <motion.button
              ref={desktopBtnRef}
              onClick={() => setLangDesktopOpen(!langDesktopOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#14591D]/20 bg-white/50 hover:bg-white transition"
              whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm font-medium">{langDesktop}</span>
              <motion.span 
                animate={{ rotate: langDesktopOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-xs"
              >
                ▼
              </motion.span>
            </motion.button>

            <AnimatePresence>
              {langDesktopOpen && (
                <motion.div
                  ref={desktopDdRef}
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-[#14591D]/10 overflow-hidden z-50"
                >
                  {["EN", "AR", "FR", "ES"].map((l) => (
                    <motion.button 
                      key={l}
                      whileHover={{ backgroundColor: "rgba(126, 223, 94, 0.1)", x: 3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setLangDesktop(l); setLangDesktopOpen(false); }} 
                      className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-2"
                    >
                      {l === "EN" && <span className="text-xs">🇬🇧</span>}
                      {l === "AR" && <span className="text-xs">🇸🇦</span>}
                      {l === "FR" && <span className="text-xs">🇫🇷</span>}
                      {l === "ES" && <span className="text-xs">🇪🇸</span>}
                      {l}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Section */}
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              {/* User Profile */}
              <div className="flex items-center gap-3 bg-white/50 rounded-xl px-3 py-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#7EDF5E] to-[#5ACD3E] flex items-center justify-center overflow-hidden">
                  {user?.profileImage || user?.avatarPreview ? (
                    <img 
                      src={user.profileImage || user.avatarPreview} 
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-sm">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-[#14591D] font-medium block text-sm">{user?.name || 'User'}</span>
                  <span className="text-[#14591D]/70 text-xs capitalize">{userType}</span>
                </div>
              </div>

              {/* Logout Button */}
              <motion.button
                onClick={handleLogout}
                className="px-4 py-2 border border-red-500 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Logout
              </motion.button>
            </div>
          ) : (
            <>
              <MotionLink
                to="/login"
                className="px-5 py-2.5 border border-[#14591D] text-[#14591D] rounded-xl hover:bg-[#14591D] hover:text-white transition-all"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Login
              </MotionLink>

              <MotionLink
                to="/signup"
                className="px-5 py-2.5 bg-gradient-to-r from-[#7EDF5E] to-[#5ACD3E] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Sign Up
              </MotionLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          onClick={() => setMobileOpen(!mobileOpen)} 
          className="md:hidden p-2 rounded-lg hover:bg-white/50 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#14591D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
            />
          </svg>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-20 md:hidden z-40"
          >
            <motion.div 
              className="absolute inset-0 bg-black/30 backdrop-blur-sm" 
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            <motion.div 
              className="relative h-[calc(100vh-5rem)] w-full bg-gradient-to-b from-[#F6F1F1] to-[#E8F5E5] shadow-xl p-6 flex flex-col overflow-y-auto"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              {/* User Info if logged in */}
              {isLoggedIn && (
                <motion.div 
                  className="bg-white rounded-xl p-4 mb-4 shadow-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#7EDF5E] to-[#5ACD3E] flex items-center justify-center overflow-hidden">
                      {user?.profileImage || user?.avatarPreview ? (
                        <img 
                          src={user.profileImage || user.avatarPreview} 
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-lg">
                          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-600 capitalize">{userType}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Language Dropdown (Mobile) */}
              <motion.div className="relative mb-6">
                <motion.button
                  ref={mobileBtnRef}
                  onClick={() => setLangMobileOpen(!langMobileOpen)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#14591D]/20 bg-white w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-sm font-medium">{langMobile}</span>
                  <motion.span 
                    className="text-xs ml-auto"
                    animate={{ rotate: langMobileOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ▼
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {langMobileOpen && (
                    <motion.div
                      ref={mobileDdRef}
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-lg border border-[#14591D]/10 overflow-hidden z-50"
                    >
                      {["EN", "AR", "FR", "ES"].map((l) => (
                        <motion.button 
                          key={l}
                          whileHover={{ backgroundColor: "rgba(126, 223, 94, 0.1)", x: 3 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => { setLangMobile(l); setLangMobileOpen(false); }} 
                          className="w-full text-left px-4 py-3 text-sm flex items-center gap-3"
                        >
                          {l === "EN" && <span className="text-xs">🇬🇧</span>}
                          {l === "AR" && <span className="text-xs">🇸🇦</span>}
                          {l === "FR" && <span className="text-xs">🇫🇷</span>}
                          {l === "ES" && <span className="text-xs">🇪🇸</span>}
                          {l}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Mobile Links */}
              <motion.nav 
                className="flex flex-col gap-2 mb-6"
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {navItems.map((item) => (
                  <motion.button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className="py-3 px-4 rounded-xl hover:bg-[#7EDF5E]/10 hover:text-[#14591D] font-medium transition-colors text-left"
                    variants={menuItemVariants}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </motion.nav>

              <motion.hr 
                className="border-[#14591D]/20 my-4"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />

              {/* Mobile Buttons */}
              <motion.div 
                className="grid grid-cols-1 gap-3 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {isLoggedIn ? (
                  <motion.button
                    onClick={handleLogout}
                    className="px-4 py-3.5 border border-red-500 text-red-500 text-center rounded-xl hover:bg-red-500 hover:text-white transition font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Logout
                  </motion.button>
                ) : (
                  <>
                    <MotionLink
                      to="/login"
                      className="px-4 py-3.5 border border-[#14591D] text-center text-[#14591D] rounded-xl hover:bg-[#14591D] hover:text-white transition font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setMobileOpen(false)}
                    >
                      Login
                    </MotionLink>
                    <MotionLink
                      to="/signup"
                      className="px-4 py-3.5 bg-gradient-to-r from-[#7EDF5E] to-[#5ACD3E] text-white font-semibold text-center rounded-xl hover:shadow-lg transition"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setMobileOpen(false)}
                    >
                      Sign Up
                    </MotionLink>
                  </>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}