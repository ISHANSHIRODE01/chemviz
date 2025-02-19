import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";

export default function StudentAndEducator() {
  return (
    <section className="py-16 bg-white ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          For Students and Educators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <a href="/learning">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-yellow-100 p-8 rounded-lg shadow-md"
            >
              <FaUserGraduate className="text-4xl text-yellow-500 mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Students</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Interactive 3D models</li>
                <li>Practice quizzes and assessments</li>
                <li>Personalized learning paths</li>
                <li>Progress tracking</li>
              </ul>
            </motion.div>
          </a>
          <a href="/learning">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-indigo-100 p-8 rounded-lg shadow-md"
            >
              <FaChalkboardTeacher className="text-4xl text-indigo-500 mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Educators</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Customizable lesson plans</li>
                <li>Virtual lab simulations</li>
                <li>Student performance analytics</li>
                <li>Collaboration tools</li>
              </ul>
            </motion.div>
          </a>
        </div>
      </div>
    </section>
  );
}
