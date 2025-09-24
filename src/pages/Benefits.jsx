import { motion } from "framer-motion";
import deco from "../assets/shape2.svg";

export default function PremiumBenefits() {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const hoverCard = {
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const hoverIcon = {
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, 0],
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section id="services" className="relative overflow-hidden py-20 bg-gradient-to-b from-[#F6F1F1] to-[#e8f5e9]">
      {/* Animated decorative element */}
      <motion.img
        src={deco}
        alt=""
        aria-hidden
        draggable={false}
        className="absolute z-0 right-0 top-0 w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:w-[200px] md:h-[200px]"
        initial={{ x: 50, opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: 0.8,
          rotate: [0, 5, 0]
        }}
        transition={{
          x: { duration: 0.8, ease: "easeOut" },
          rotate: { 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#7EDF5E]/10"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 50 - 25],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-[#14591D] mb-4"
            whileHover={{
              textShadow: "0 0 10px rgba(126, 223, 94, 0.3)"
            }}
          >
            Benefits of Our Platform
            <motion.span 
              className="inline-block w-3 h-3 bg-[#7EDF5E] rounded-md ml-2"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
          </motion.h2>
          <motion.p 
            className="text-xl text-[#2f9e44]/90 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Discover how our platform transforms healthcare experience
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid gap-8 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Card 1 */}
          <motion.article 
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20"
            variants={item}
            whileHover="hover"
            variants={hoverCard}
          >
            <motion.div 
              className="mb-6 p-4 bg-[#F6F1F1] rounded-full w-max"
              variants={hoverIcon}
              whileHover="hover"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#7EDF5E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"/>
              </svg>
            </motion.div>
            <h3 className="text-2xl font-semibold text-[#14591D] mb-4">AI Diagnosis</h3>
            <p className="text-[#2f9e44]/90 mb-6">Quickly identify possible conditions using advanced AI algorithms.</p>
            <motion.a 
              href="#"
              className="inline-flex items-center text-[#14591D] font-medium group-hover:text-[#7EDF5E] transition-colors"
              whileHover={{ x: 5 }}
            >
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </motion.a>
          </motion.article>

          {/* Card 2 */}
          <motion.article 
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20"
            variants={item}
            whileHover="hover"
            variants={hoverCard}
          >
            <motion.div 
              className="mb-6 p-4 bg-[#F6F1F1] rounded-full w-max"
              variants={hoverIcon}
              whileHover="hover"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#7EDF5E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 1.38-1.12 2.5-2.5 2.5S7 12.38 7 11s1.12-2.5 2.5-2.5S12 9.62 12 11z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z"/>
              </svg>
            </motion.div>
            <h3 className="text-2xl font-semibold text-[#14591D] mb-4">Nearby Clinics</h3>
            <p className="text-[#2f9e44]/90 mb-6">Find hospitals and clinics near your location instantly.</p>
            <motion.a 
              href="#"
              className="inline-flex items-center text-[#14591D] font-medium group-hover:text-[#7EDF5E] transition-colors"
              whileHover={{ x: 5 }}
            >
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </motion.a>
          </motion.article>

          {/* Card 3 */}
          <motion.article 
            className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20"
            variants={item}
            whileHover="hover"
            variants={hoverCard}
          >
            <motion.div 
              className="mb-6 p-4 bg-[#F6F1F1] rounded-full w-max"
              variants={hoverIcon}
              whileHover="hover"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#7EDF5E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </motion.div>
            <h3 className="text-2xl font-semibold text-[#14591D] mb-4">Preventive Care</h3>
            <p className="text-[#2f9e44]/90 mb-6">Receive tips and recommendations to maintain a healthy lifestyle.</p>
            <motion.a 
              href="#"
              className="inline-flex items-center text-[#14591D] font-medium group-hover:text-[#7EDF5E] transition-colors"
              whileHover={{ x: 5 }}
            >
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </motion.a>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}