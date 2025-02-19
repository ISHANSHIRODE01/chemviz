import { motion } from "framer-motion"
import Image from "next/image"
export default function Learn() {
    return(
        <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Learn by Doing
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2"
            >
              <Image
                src="/images/image.png"
                alt="Chemistry Simulation"
                className="rounded-lg shadow-md"
                width={1920}
                height={1080}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:w-1/2"
            >
              <h3 className="text-2xl font-semibold mb-4">
                Simulate Chemical Reactions
              </h3>
              <p className="mb-6">
                Our platform allows you to simulate complex chemical reactions,
                helping you understand the underlying principles and mechanisms.
              </p>
              <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-600 transition duration-300">
                Try a Simulation
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    )
}