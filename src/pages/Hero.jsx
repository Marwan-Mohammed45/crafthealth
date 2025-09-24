import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import heroImage from "../assets/hero.png";
import logo from "../assets/icon.png"; // Make sure this is PNG with transparent background

export default function Hero() {
  // Floating animation values
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);
  const scale = useMotionValue(1);
  
  // Transform effects
  const opacity = useTransform(y, [-10, 0, 10], [0.9, 1, 0.9]);
  const shadow = useTransform(y, [-10, 0, 10], [
    "0px 5px 15px rgba(0,0,0,0.1)",
    "0px 15px 30px rgba(0,0,0,0.15)",
    "0px 5px 15px rgba(0,0,0,0.1)"
  ]);

  // Start animations
  useEffect(() => {
    const animateFloat = () => {
      animate(y, 10, {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      });
      animate(rotate, 2, {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      });
      animate(scale, 1.02, {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      });
    };
    
    animateFloat();
  }, [y, rotate, scale]);

  return (
    <motion.div  id="home"
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-between px-6 py-12 md:py-24 overflow-hidden bg-gradient-to-b from-[#f8faf7] to-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Floating Logo with Transparent Background */}
      <motion.div
        className="absolute right-8 top-8 md:right-12 md:top-12 z-10"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.img 
          src={logo} 
          alt="Company Logo"
          className="w-24 h-24 md:w-32 md:h-32 object-contain"
          style={{
            filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))",
            WebkitFilter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))"
          }}
          whileHover={{ 
            scale: 1.1,
            rotate: 5,
            filter: "drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.3))"
          }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </motion.div>

      {/* Text Content */}
      <div className="w-full md:w-1/2 space-y-6 lg:space-y-8 z-20">
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#14591D] leading-tight"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        >
          Transform Your Health{" "}
          <motion.span 
            className="ml-2 inline-block w-3 h-3 bg-[#7EDF5E] rounded-md align-middle"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.4 }}
          />
        </motion.h2>
        
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#14591D] leading-tight"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
        >
          Natural Solutions{" "}
          <motion.span 
            className="ml-2 inline-block w-3 h-3 bg-[#7EDF5E] rounded-md align-middle"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.5 }}
          />
        </motion.h2>
        
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#14591D] leading-tight"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
        >
          Lasting Wellness{" "}
          <motion.span 
            className="ml-2 inline-block w-3 h-3 bg-[#7EDF5E] rounded-md align-middle"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.6 }}
          />
        </motion.h2>
        
        <motion.p 
          className="mt-4 text-lg md:text-xl text-[#2f9e44]/90 leading-relaxed max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Our holistic approach combines cutting-edge science with traditional wisdom to help you achieve optimal health and vitality at every stage of life.
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap gap-4 pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.a 
            href="#services" 
            className="px-6 py-3 lg:px-8 lg:py-4 rounded-xl bg-[#14591D] text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            whileHover={{ 
              y: -3,
              scale: 1.05,
              boxShadow: "0px 10px 25px rgba(20, 89, 29, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Explore Services
          </motion.a>
          <motion.a 
            href="#contact" 
            className="px-6 py-3 lg:px-8 lg:py-4 rounded-xl bg-white text-[#14591D] font-semibold shadow-lg border-2 border-[#14591D]/20 hover:border-[#14591D] transition-all"
            whileHover={{ 
              y: -3,
              scale: 1.05,
              boxShadow: "0px 10px 25px rgba(20, 89, 29, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Free Consultation
          </motion.a>
        </motion.div>
      </div>
      
      {/* Animated Image Content */}
      <motion.div 
        className="w-full md:w-1/2 flex justify-center relative mt-12 md:mt-0"
      >
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.img 
            src={heroImage} 
            alt="Happy healthy person" 
            className="w-full max-w-md lg:max-w-lg rounded-2xl"
            style={{ y, opacity, scale, rotate, boxShadow: shadow }}
          />
          {/* Decorative animated elements */}
          <motion.div 
            className="absolute -bottom-4 -left-4 bg-[#7EDF5E]/20 w-24 h-24 rounded-xl -z-10"
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />
          <motion.div 
            className="absolute -top-4 -right-4 bg-[#14591D]/10 w-20 h-20 rounded-full -z-10"
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          />
        </motion.div>
      </motion.div>

      {/* Background animated elements */}
      <motion.div 
        className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#7EDF5E]/10 rounded-full -z-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      />
      <motion.div 
        className="absolute -right-20 -top-20 w-80 h-80 bg-[#14591D]/5 rounded-full -z-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      />
    </motion.div>
  );
}