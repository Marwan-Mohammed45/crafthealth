import { motion } from "framer-motion";

export default function Warnings() {
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <motion.section 
      className="py-16 md:py-24 bg-white"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-700 mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Risks of Ignoring Health{" "}
          <motion.span 
            className="inline-block w-3 h-3 bg-red-500 rounded-md align-middle"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.h2>
        
        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <motion.article 
            className="group bg-gradient-to-b from-red-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-red-500"
            variants={cardVariants}
            whileHover={{ y: -5 }}
          >
            <div className="text-red-500 mb-6 flex items-center gap-3">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </motion.div>
              <motion.div 
                className="w-full h-1 bg-gradient-to-r from-red-500 to-red-100 rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </div>
            <h3 className="text-2xl font-bold text-red-800 mb-3">Cardiovascular Diseases</h3>
            <p className="text-red-600/90 leading-relaxed">
              Neglecting regular check-ups increases heart disease risk by 40%. Early detection saves lives.
            </p>
          </motion.article>

          {/* Card 2 */}
          <motion.article 
            className="group bg-gradient-to-b from-red-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-red-500"
            variants={cardVariants}
            whileHover={{ y: -5 }}
          >
            <div className="text-red-500 mb-6">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </motion.div>
            </div>
            <h3 className="text-2xl font-bold text-red-800 mb-3">Mental Health Decline</h3>
            <p className="text-red-600/90 leading-relaxed">
              Untreated symptoms can lead to chronic anxiety and depression. Your mind matters.
            </p>
          </motion.article>

          {/* Card 3 */}
          <motion.article 
            className="group bg-gradient-to-b from-red-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-red-500"
            variants={cardVariants}
            whileHover={{ y: -5 }}
          >
            <div className="text-red-500 mb-6">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </motion.div>
            </div>
            <h3 className="text-2xl font-bold text-red-800 mb-3">Chronic Conditions</h3>
            <p className="text-red-600/90 leading-relaxed">
              Delayed diagnosis often leads to irreversible damage. Prevention is better than cure.
            </p>
          </motion.article>
        </div>

        {/* Animated warning line */}
        <motion.div 
          className="mt-16 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.section>
  );
}