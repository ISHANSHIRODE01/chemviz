import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

const Testimonial = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: "This platform revolutionized how I teach chemistry. My students are more engaged than ever!",
      author: "Dr. Emily Johnson, Chemistry Professor",
    },
    {
      id: 2,
      text: "I finally understand complex reactions thanks to the 3D visualizations. It's like having a lab in my pocket!",
      author: "Alex Chen, Undergraduate Student",
    },
    {
      id: 3,
      text: "The interactive models made studying for my AP Chemistry exam so much easier and fun!",
      author: "Sarah Thompson, High School Senior",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-16 bg-gray-100 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto"
          >
            <p className="text-lg italic mb-4">
              {testimonials[currentTestimonial].text}
            </p>
            <p className="font-semibold">
              {testimonials[currentTestimonial].name}
            </p>
            <p className="text-gray-600">
              {testimonials[currentTestimonial].role}
            </p>
          </motion.div>
        </div>
      </section>
  )
}

export default Testimonial