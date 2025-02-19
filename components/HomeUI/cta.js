import { motion } from "framer-motion";
export default function Cta() {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Revolutionize Your Chemistry Learning?
        </h2>
        <p className="text-xl mb-8">
          Join thousands of students and educators who are already benefiting
          from our platform.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-yellow-300 transition duration-300"
        >
          Get Started for Free
        </motion.button>
      </div>
    </section>
  );
}
