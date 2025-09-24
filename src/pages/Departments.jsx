import { motion } from "framer-motion";

export default function AnimatedDepartments() {
  const departments = [
    ["fas fa-baby", "Pediatrics"],
    ["fas fa-tooth", "Dentistry"],
    ["fas fa-brain", "Neurology"],
    ["fas fa-bone", "Orthopedics"],
    ["fas fa-lungs", "Pulmonology"],
    ["fas fa-heartbeat", "Cardiology"],
    ["fas fa-wheelchair", "Rehabilitation"],
    ["fas fa-user-md", "General Medicine"],
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12
      }
    }
  };

  const hoverEffect = {
    hover: {
      y: -8,
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const iconAnimation = {
    hover: {
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "mirror"
      }
    }
  };

  return (
    <section id="about" className="py-16 bg-[#F6F1F1]">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl font-bold text-[#14591D] mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Our Departments
          <motion.span 
            className="inline-block w-2 h-2 bg-[#7EDF5E] rounded-full ml-2"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
        </motion.h2>

        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {departments.map(([icon, name], index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover="hover"
              className="group"
            >
              <motion.div
                className="flex flex-col items-center justify-center bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all"
                variants={hoverEffect}
              >
                <motion.div
                  className="mb-3 p-3 bg-[#F6F1F1] rounded-full"
                  variants={iconAnimation}
                  whileHover="hover"
                >
                  <i className={`${icon} fa-2x text-[#7EDF5E]`}></i>
                </motion.div>
                <h3 className="text-[#14591D] font-semibold text-center">
                  {name}
                </h3>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}