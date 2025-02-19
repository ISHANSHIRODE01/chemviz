'use client'
import React from 'react';
import { useEffect } from 'react';
import { FaFlask, FaAtom, FaDna, FaMicroscope } from 'react-icons/fa';

const ChemistryAboutUs = () => {
    useEffect(() => {
        document.title = "About-US";
    }, []);
    const teamMembers = [
        {
            name: 'Roshan singh',
            role: 'Lead Developer',
            bio: '',
            image: '',
            icon: <FaFlask />
        },
        {
            name: 'Ishaan shirode',
            role: 'Chemical Engineer',
            bio: '',
            image: '',
            icon: <FaAtom />
        },
        {
            name: 'Rishit shetty',
            role: 'Biochemist',
            bio: '',
            image: '',
            icon: <FaDna />
        },
        {
            name: 'Sayyed Sharique ',
            role: 'Lead style designer',
            bio: '',
            image: '',
            icon: <FaMicroscope />
        }
    ];

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-blue-600 text-white py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">About Us</h1>
                    <p className="text-xl">Advancing Chemistry, Improving Lives</p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12">
                <section className="mb-16">
                    <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
                    <p className="text-lg mb-4">
                        At ChemInnovate, we are dedicated to pushing the boundaries of chemical research and innovation. Our team of expert scientists works tirelessly to develop new solutions that address global challenges in health, energy, and environmental sustainability.
                    </p>
                    <p className="text-lg">
                        Through cutting-edge research and collaborative partnerships, we strive to make significant contributions to the field of chemistry and improve the quality of life for people around the world.
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-semibold mb-6">Our Approach</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Innovation</h3>
                            <p>We constantly explore new ideas and methodologies to drive breakthroughs in chemical research.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Collaboration</h3>
                            <p>We foster partnerships with academic institutions and industry leaders to accelerate scientific progress.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
                            <p>We prioritize environmentally friendly practices and develop solutions for a sustainable future.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Education</h3>
                            <p>We are committed to nurturing the next generation of chemists through mentorship and training programs.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-semibold mb-6">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center transform transition duration-300 hover:scale-105">
                                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                                <p className="text-blue-600 mb-2 flex items-center justify-center">
                                    {member.icon}
                                    <span className="ml-2">{member.role}</span>
                                </p>
                                <p className="text-gray-600 text-center">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ChemistryAboutUs;
