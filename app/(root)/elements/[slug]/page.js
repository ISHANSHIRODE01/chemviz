"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "next-sanity";
import { FaAtom, FaWeightHanging, FaLayerGroup, FaTable } from "react-icons/fa";
import Image from "next/image";
import "@google/model-viewer";
import { urlFor } from "../../../../sanity/lib/image";
const sanityClient = createClient({
  projectId: "l13cjbqn", // Replace with your Sanity project ID
  dataset: "elements", // Replace with your dataset name
  useCdn: true, // Use the CDN for fast response times
});

export default function Page({ params }) {
  const [activeTab, setActiveTab] = useState("properties");
  const [expandedSection, setExpandedSection] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [answerFeedback, setAnswerFeedback] = useState("");
  const [element, setElement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const { slug } = React.use(params);

  let totelems = [
    "hydrogen",
    "helium",
    "lithium",
    "beryllium",
    "boron",
    "carbon",
    "nitrogen",
    "oxygen",
    "fluorine",
    "neon",
    "sodium",
    "magnesium",
    "aluminum",
    "silicon",
    "phosphorus",
    "sulfur",
    "chlorine",
    "argon",
    "potassium",
    "calcium",
    "scandium",
    "titanium",
    "vanadium",
    "chromium",
    "manganese",
    "iron",
    "cobalt",
    "nickel",
    "copper",
    "zinc",
    "gallium",
    "germanium",
    "arsenic",
    "selenium",
    "bromine",
    "krypton",
    "rubidium",
    "strontium",
    "yttrium",
    "zirconium",
    "niobium",
    "molybdenum",
    "technetium",
    "ruthenium",
    "rhodium",
    "palladium",
    "silver",
    "cadmium",
    "indium",
    "tin",
    "antimony",
    "tellurium",
    "iodine",
    "xenon",
    "cesium",
    "barium",
    "lanthanum",
    "cerium",
    "praseodymium",
    "neodymium",
    "promethium",
    "samarium",
    "europium",
    "gadolinium",
    "terbium",
    "dysprosium",
    "holmium",
    "erbium",
    "thulium",
    "ytterbium",
    "lutetium",
    "hafnium",
    "tantalum",
    "tungsten",
    "rhenium",
    "osmium",
    "iridium",
    "platinum",
    "gold",
    "mercury",
    "thallium",
    "lead",
    "bismuth",
    "polonium",
    "astatine",
    "radon",
    "francium",
    "radium",
    "actinium",
    "thorium",
    "protactinium",
    "uranium",
    "neptunium",
    "plutonium",
    "americium",
    "curium",
    "berkelium",
    "californium",
    "einsteinium",
    "fermium",
    "mendelevium",
    "nobelium",
    "lawrencium",
    "rutherfordium",
    "dubnium",
    "seaborgium",
    "bohrium",
    "hassium",
    "meitnerium",
    "darmstadtium",
    "roentgenium",
    "copernicium",
    "nihonium",
    "flerovium",
    "moscovium",
    "livermorium",
    "tennessine",
    "oganesson",
  ];

  const ELEMENT_Queries = `*[_type == "element" && name == "${slug}"][0] {
    name,
    symbol,
    atomicNumber,
    atomicMass,
    group,
    period,
    image,
    video,
    properties[] {
      name,
      value
    },
    uses[] {
      value
    },
    isotopes[] {
      name,
      value
    },
    funFacts[],
    quizQuestions[] {
      question,
      options,
      correctAnswer
    }
  }`;

  useEffect(() => {
    document.title = `${slug} - Element Exploration`; // Set your custom title here
  }, [slug]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setExpandedSection(null);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuizQuestion(0);
    setUserScore(0);
    setAnswerFeedback("");
  };

  const handleQuizAnswer = (selectedAnswer) => {
    if (
      selectedAnswer ===
      element.quizQuestions[currentQuizQuestion].correctAnswer
    ) {
      setUserScore(userScore + 1);
      setAnswerFeedback("Correct!");
    } else {
      setAnswerFeedback("Incorrect, try again!");
    }
    if (currentQuizQuestion < element.quizQuestions.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1);
    } else {
      setQuizStarted(false);
    }
  };

  useEffect(() => {
    const fetchElementData = async () => {
      try {
        if (slug) {
          const data = await sanityClient.fetch(ELEMENT_Queries);
          if (data) {
            setElement(data);
          } else {
            setError("Element not found");
          }
        } else {
          setError("Invalid element slug");
        }
      } catch (err) {
        setError("Failed to fetch element data");
      } finally {
        setLoading(false);
      }
    };

    fetchElementData();
  }, [slug, ELEMENT_Queries]);

  // Block rendering until loading is complete
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Loading...</h1>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">{error}</h1>
      </div>
    );
  }

  if (totelems.includes(slug)) {
    return (
      <div className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <div className="relative h-96 bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-white mb-4 hover:text-yellow-300 transition-colors duration-300">
                {element.name}
              </h1>
              <p className="text-4xl font-semibold text-white hover:text-yellow-300 transition-colors duration-300">
                {element.symbol}
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black opacity-30"></div>
        </div>

        {/* Element Overview Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <Image
                src={urlFor(element.image).url()}
                alt={element.name}
                width={400} // Specify appropriate width
                height={256} // Specify appropriate height
                className="w-full h-64 object-cover rounded-lg"
                priority // Optional: Add this for images above the fold for better performance
              />
            </div>
            <div className="md:w-2/3 md:pl-8">
              <h2 className="text-3xl font-bold mb-4">Basic Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <FaAtom className="text-blue-500 mr-2" />
                  <span>Atomic Number: {element.atomicNumber}</span>
                </div>
                <div className="flex items-center">
                  <FaWeightHanging className="text-green-500 mr-2" />
                  <span>Atomic Mass: {element.atomicMass}</span>
                </div>
                <div className="flex items-center">
                  <FaLayerGroup className="text-yellow-500 mr-2" />
                  <span>Group: {element.group}</span>
                </div>
                <div className="flex items-center">
                  <FaTable className="text-red-500 mr-2" />
                  <span>Period: {element.period}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive 3D Model Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-3xl font-bold mb-4">3D Model</h2>
            <div
              className="bg-gray-200 rounded-lg flex items-center justify-center"
              style={{ height: "50vh" }}
            >
              <model-viewer
                src={`/elements/${slug}.glb`}
                alt="A 3D model of Helium"
                auto-rotate
                camera-controls
                style={{ width: "100%", height: "100%" }}
                ar
                touch-action="pan-y"
                ar-placement="wall"
              ></model-viewer>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-3xl font-bold mb-4">Video</h2>
            <div
              className="bg-gray-200 rounded-lg flex items-center justify-center"
              style={{ height: "560px" }}
            >
              <iframe
                src="https://drive.google.com/file/d/1gxh0wMohRuj5zLhpEz6YBGntaDLQrWJN/preview"
                width="315"
                height="560"
                allow="autoplay"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Detailed Information Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex mb-4">
              {["properties", "uses", "isotopes"].map((tab) => (
                <button
                  key={tab}
                  className={`mr-4 px-4 py-2 rounded-lg ${
                    activeTab === tab ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {activeTab === "properties" && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Properties</h3>
                {element.properties.map((prop, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 bg-gray-100 rounded-lg cursor-pointer"
                    onClick={() => toggleSection(`property-${index}`)}
                  >
                    <h4 className="font-semibold">{prop.name}</h4>
                    {expandedSection === `property-${index}` && (
                      <p className="mt-2">{prop.value}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "uses" && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Uses</h3>
                <ul className="list-disc list-inside">
                  {element.uses.map((use, index) => (
                    <li key={index} className="mb-2">
                      {use.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "isotopes" && (
              <div>
                <h3 className="text-2xl font-bold mb-4">Isotopes</h3>
                {element.isotopes.map((isotope, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 bg-gray-100 rounded-lg cursor-pointer"
                    onClick={() => toggleSection(`isotope-${index}`)}
                  >
                    <h4 className="font-semibold">{isotope.name}</h4>
                    {expandedSection === `isotope-${index}` && (
                      <p className="mt-2">{isotope.value}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Fun Facts and Trivia Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-yellow-100 rounded-lg shadow-lg p-8">
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Did You Know?</h3>
              <p className="text-center">
                {element.funFacts[currentFactIndex]?.value}
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => {
                  setCurrentFactIndex(
                    (prevIndex) => (prevIndex + 1) % element.funFacts.length
                  );
                }}
              >
                Next Fact
              </button>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Quiz Time!</h3>
              {!quizStarted ? (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onClick={startQuiz}
                >
                  Start Quiz
                </button>
              ) : (
                <div>
                  <p className="mb-4">
                    {element.quizQuestions[currentQuizQuestion].question}
                  </p>
                  {answerFeedback && (
                    <p className="font-semibold">{answerFeedback}</p>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    {element.quizQuestions[currentQuizQuestion].options.map(
                      (option, index) => (
                        <button
                          key={index}
                          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                          onClick={() => handleQuizAnswer(index)}
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
              {!quizStarted && userScore > 0 && (
                <p className="mt-4">
                  Your score: {userScore}/{element.quizQuestions.length}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* comments Section */}
      </div>
    );
  } else {
    return <div>no elements found</div>;
  }
}
