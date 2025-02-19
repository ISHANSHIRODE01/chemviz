import { motion } from "framer-motion"
import Image from "next/image"

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            className="w-full h-full"
            animate={{ rotate: 360, scale: [1, 7, 1] }} // Added scale animation
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          >
            <Image
              src="/images/image copy.png"
              alt="3D Molecular Model"
              width={1920}
              height={1080}
              className="w-full h-full object-cover opacity-30 overflow-hidden"
              style={{ objectPosition: "center" }}
            />
          </motion.div>
        </div>
        <div className="z-10 text-center text-white">
          <h1 className="text-6xl font-bold mb-4">
            Engage with Chemistry Like Never Before
          </h1>
          <p className="text-xl mb-8">
            Experience interactive 3D visualizations and simulations
          </p>
          <a href="/login">
            <button className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-300 transition duration-300">
              Start Learning Now
            </button>
          </a>
        </div>
      </section>
    )}