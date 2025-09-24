import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import laptopUrl from "../assets/lap.png";
import shapeUrl from "../assets/shape1.svg";
import { Link } from "react-router-dom";
export default function UltraPremiumLaptopHero() {
  // ===== Enhanced Typewriter Effect =====
  const phrases = useRef([
    "Powerful health insights at your fingertips.",
    "Track, prevent, and optimize your wellbeing.",
    "Smart tools. Simple experience. Real results.",
  ]);
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (pause) return;
    const current = phrases.current[idx % phrases.current.length];
    const typingSpeed = deleting ? 18 : 30; // Faster typing for premium feel
    const deletingSpeed = 15;

    let t;
    if (!deleting) {
      t = setTimeout(() => {
        const next = current.slice(0, sub.length + 1);
        setSub(next);
        if (next === current) {
          setPause(true);
          setTimeout(() => {
            setPause(false);
            setDeleting(true);
          }, 1500); // Slightly longer pause
        }
      }, typingSpeed);
    } else {
      t = setTimeout(() => {
        const next = current.slice(0, Math.max(0, sub.length - 1));
        setSub(next);
        if (next.length === 0) {
          setDeleting(false);
          setIdx((v) => (v + 1) % phrases.current.length);
        }
      }, deletingSpeed);
    }
    return () => clearTimeout(t);
  }, [sub, deleting, pause, idx]);

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const laptopVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 1, 
        ease: [0.16, 1, 0.3, 1],
        delay: 0.4
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      y: -3,
      boxShadow: "0 10px 25px -5px rgba(20, 89, 29, 0.4)",
      transition: { type: "spring", stiffness: 400 }
    },
    tap: { scale: 0.98, y: 0 }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F6F1F1] to-[#e8f5e9]">
      {/* Decorative shape with animation */}
      <motion.img
        src={shapeUrl}
        alt="decor"
        aria-hidden
        draggable={false}
        className="absolute z-0 -top-[-40px] -left-[28px] w-[140px] h-[140px] sm:-top-[-70px] sm:-left-[56px] sm:w-[190px] sm:h-[190px] md:-top-[-110px] md:-left-[80px] md:w-[260px] md:h-[260px] lg:-top-[-120px] lg:-left-[90px] lg:w-[300px] lg:h-[300px]"
        initial={{ rotate: -15, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      {/* Floating particles background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#7EDF5E]/20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 60 - 30],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Animated title */}
        <motion.div 
          className="flex items-end justify-center gap-4 md:gap-6 flex-wrap md:flex-nowrap text-center"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
        >
          {["Smart", "easy", "healthy"].map((word, i) => (
            <motion.div 
              key={i} 
              className="flex items-center justify-center"
              variants={titleVariants}
            >
              <motion.h1 
                className="font-extrabold leading-none text-[#14591D] text-[3.2rem] md:text-[5rem]"
                whileHover={{ y: -3 }}
              >
                {word}
              </motion.h1>
              <motion.span 
                className="ml-3  mb-3 inline-block w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#7EDF5E]"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced typewriter effect */}
        <motion.p 
          className="mt-8 md:mt-10 text-center text-lg md:text-xl text-[#2f9e44]/90 max-w-3xl mx-auto min-h-[60px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="align-middle font-medium">{sub}</span>
          <motion.span 
            className="inline-block w-[2px] h-6 bg-[#2f9e44] ml-1 align-middle"
            animate={{ 
              opacity: [0, 1, 0],
            }}
            transition={{ 
              duration: 0.8,
              repeat: Infinity,
              repeatDelay: 0.2
            }}
          />
        </motion.p>

        {/* Premium button with animation */}
        <motion.div 
          className="mt-8 md:mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link to={'/dashboard-P'}><motion.a
            href="#start"
            className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-[#14591D] to-[#1e7e34] text-white font-semibold shadow-lg hover:shadow-xl transition-all"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Start Now
            <motion.span 
              className="inline-block ml-2"
              animate={{ x: [0, 4, 0] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity
              }}
            >
              →
            </motion.span>
          </motion.a>
          </Link>
        </motion.div>

        {/* Laptop image with advanced animation */}
        <motion.div 
          className="mt-14 md:mt-20 flex justify-center"
          variants={laptopVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.img
            src={laptopUrl}
            alt="Laptop displaying HealthSite dashboard"
            className="w-full h-auto max-w-[280px] sm:max-w-[420px] md:max-w-3xl select-none"
            draggable={false}
            whileHover={{ 
              y: -10,
              transition: { type: "spring", stiffness: 300 }
            }}
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>

      {/* Floating circles decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-[#7EDF5E]/30"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 50 - 100}px`,
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.2, 0],
              scale: [0.5, 1, 1.2],
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </section>
  );
}