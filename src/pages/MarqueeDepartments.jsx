import { motion } from "framer-motion";

function Row() {
  const icons = [
    "fas fa-baby",
    "fas fa-university",
    "fas fa-brain",
    "fas fa-bone",
    "fas fa-lungs",
    "fas fa-heartbeat",
    "fas fa-wheelchair",
  ];

  return (
    <div className="flex gap-3 pr-3">
      {icons.map((icon, i) => (
        <motion.div
          key={i}
          className="w-24 h-24 grid place-items-center rounded-xl bg-[#27ae60] text-white"
          whileHover={{
            scale: 1.05,
            rotate: [0, 2, -2, 0],
            transition: { duration: 0.5 }
          }}
        >
          <motion.i 
            className={`${icon} fa-lg`}
            animate={{
              y: [0, -3, 0],
              opacity: [0.9, 1, 0.9]
            }}
            transition={{
              duration: 3 + Math.random(),
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function MarqueeDepartments() {
  return (
    <section className="py-16 bg-white">
      <motion.div 
        className="overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="flex items-center marquee-track"
          animate={{
            x: ["0%", "-100%"]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Row />
          <Row />
          <Row />
        </motion.div>
      </motion.div>
    </section>
  );
}