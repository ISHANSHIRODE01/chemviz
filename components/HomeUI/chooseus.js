import { motion } from "framer-motion";
import { FaAtom } from "react-icons/fa";
import { AiOutlineExperiment } from "react-icons/ai";
import { BiTestTube } from "react-icons/bi";
import Link from "next/link";
export default function ChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/elements" className="block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-blue-100 h-full p-6 rounded-lg shadow-md"
            >
              <FaAtom className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">3D Simulations</h3>
              <p>
                Experience chemistry in three dimensions with our cutting-edge
                simulations.
              </p>
            </motion.div>
          </Link>
          <Link href="/table" className="block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-purple-100 p-6 rounded-lg shadow-md"
            >
              <AiOutlineExperiment className="text-4xl text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Interactive Periodic Table
              </h3>
              <p>
                Explore elements and their properties through our interactive
                periodic table.
              </p>
            </motion.div>
          </Link>
          <Link href="/" className="block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-green-100 p-6 rounded-lg shadow-md"
            >
              <BiTestTube className="text-4xl text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Real-time Reactions
              </h3>
              <p>
                Witness chemical reactions unfold before your eyes in real-time
                visualizations.
              </p>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
