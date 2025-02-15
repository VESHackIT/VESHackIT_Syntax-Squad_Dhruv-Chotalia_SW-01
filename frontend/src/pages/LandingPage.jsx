import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GamepadIcon,
  Brain,
  Trophy,
  LineChart,
  Sparkles,
  BookOpen,
  Stars,
  Loader2,
} from "lucide-react";

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollPosition;
};

const LoadingScreen = () => (
  <div className="fixed inset-0 bg-indigo-50 flex items-center justify-center z-50 transition-opacity duration-500">
    <div className="text-center">
      <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mx-auto mb-4" />
      <p className="text-indigo-600 text-lg animate-pulse">
        Loading your learning journey...
      </p>
    </div>
  </div>
);

// Sign Up Modal Component
const SignUpModal = ({ onClose }) => {
  return (
    <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <h2 className="text-2xl font-bold text-center text-purple-600">
        Sign Up
      </h2>
      <form className="mt-4 space-y-3">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button className="w-full p-2 text-white bg-purple-600 rounded-md hover:bg-purple-700">
          Sign Up
        </button>
      </form>
    </div>
  );
};

// Sign In Modal Component
const SignInModal = ({ onClose }) => {
  return (
    <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <h2 className="text-2xl font-bold text-center text-purple-600">
        Sign In
      </h2>
      <form className="mt-4 space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button className="w-full p-2 text-white bg-purple-600 rounded-md hover:bg-purple-700">
          Sign In
        </button>
      </form>
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const scrollPosition = useScrollPosition();
  const [hoveredCard, setHoveredCard] = useState(null);
  // modalType: 'signup', 'signin', or null
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const isElementInView = (offset = 0) => scrollPosition > offset;

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div
        className={`min-h-screen bg-gradient-to-b from-indigo-50 to-white transition-opacity duration-1000 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* Navigation */}
        <nav
          className={`fixed w-full bg-white/80 backdrop-blur-md z-40 transition-all duration-700 transform ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
        >
          <div className="flex items-center justify-between p-6 max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 group">
              <Brain className="h-8 w-8 text-indigo-600 group-hover:animate-wiggle" />
              <span className="text-2xl font-bold text-indigo-600 group-hover:tracking-wider transition-all">
                Lumina
              </span>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => navigate("/about")}
                className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition-all duration-300 hover:scale-105"
              >
                About
              </button>
              <button
                onClick={() => navigate("/features")}
                className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition-all duration-300 hover:scale-105"
              >
                Features
              </button>
              <button
                onClick={() => setModalType("signup")}
                className="px-4 py-2 rounded border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 hover:scale-105"
              >
                Sign Up
              </button>
              <button
                onClick={() => setModalType("signin")}
                className="px-4 py-2 rounded border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 hover:scale-105"
              >
                Sign In
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div
          className={`container mx-auto px-4 pt-32 pb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center max-w-4xl mx-auto relative">
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-transparent bg-clip-text animate-gradient relative">
              Learning Made Fun, Progress Made Real
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed transition-all duration-700 delay-300">
              Transform your learning journey with our gamified platform
              designed specifically for dyslexia. Experience personalized
              learning paths that adapt to your unique style.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setModalType("signup")}
                className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:rotate-1 group"
              >
                <span className="group-hover:animate-bounce-subtle">
                  Start Free Assessment
                </span>
              </button>
              <button
                onClick={() => navigate("/demo")}
                className="border border-indigo-600 text-indigo-600 text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-rotate-1 relative overflow-hidden group"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Watch Demo
                </span>
                <div className="absolute inset-0 bg-indigo-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              </button>
            </div>
          </div>
        </div>

        {/* About Us Section */}
        <div className="container mx-auto px-4 py-16 bg-gray-50">
          <h2 className="text-4xl font-bold text-center mb-8">About Lumina</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            At Lumina, we believe that every learner deserves a personalized
            experience. Our mission is to empower students with innovative,
            engaging, and adaptive learning solutions—especially for those with
            dyslexia. Our platform transforms traditional learning into an
            exciting, interactive adventure.
          </p>
        </div>

        {/* How It Works Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Personalized Paths",
                description:
                  "Our adaptive technology tailors learning modules to your unique needs.",
                color: "green",
              },
              {
                icon: Sparkles,
                title: "Interactive Challenges",
                description:
                  "Engage in fun, gamified challenges that reinforce core concepts.",
                color: "purple",
              },
              {
                icon: Trophy,
                title: "Achievement System",
                description:
                  "Earn badges and rewards as you progress, keeping you motivated every step of the way.",
                color: "yellow",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 border rounded-lg transition-transform duration-500 hover:scale-105"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <feature.icon
                  className={`h-10 w-10 text-${feature.color}-500 mb-4`}
                />
                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="container mx-auto px-4 py-16 bg-gray-50">
          <h2 className="text-4xl font-bold text-center mb-8">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Aisha Kumar",
                feedback:
                  "Lumina has completely transformed the way I learn. The interactive challenges keep me engaged every day!",
              },
              {
                name: "Rahul Sharma",
                feedback:
                  "The personalized learning paths have boosted my confidence and skills. Highly recommended!",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border transition-shadow duration-300 hover:shadow-xl"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <p className="text-lg italic text-gray-700 mb-4">
                  "{testimonial.feedback}"
                </p>
                <p className="text-right font-semibold text-gray-800">
                  - {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="relative overflow-hidden bg-indigo-600 text-white py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 animate-gradient-x"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2
              className={`text-3xl font-bold mb-4 transition-all duration-700 transform ${
                isElementInView(1200)
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90"
              }`}
            >
              Ready to Transform Your Learning Experience?
            </h2>
            <p
              className={`text-xl mb-8 transition-all duration-700 delay-100 transform ${
                isElementInView(1200)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Start your journey with our free assessment today.
            </p>
            <button
              onClick={() => setModalType("signup")}
              className="bg-white text-indigo-600 hover:bg-gray-100 text-lg px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:rotate-1"
            >
              Begin Free Assessment
            </button>
          </div>
        </div>

        {/* Modal Overlay */}
        {modalType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            {modalType === "signup" && (
              <SignUpModal onClose={() => setModalType(null)} />
            )}
            {modalType === "signin" && (
              <SignInModal onClose={() => setModalType(null)} />
            )}
          </div>
        )}

        <style jsx>{`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          @keyframes wiggle {
            0%,
            100% {
              transform: rotate(-3deg);
            }
            50% {
              transform: rotate(3deg);
            }
          }
          @keyframes bounce-subtle {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-2px);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animate-wiggle {
            animation: wiggle 1s ease-in-out infinite;
          }
          .animate-bounce-subtle {
            animation: bounce-subtle 2s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          @keyframes gradient-x {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 5s ease infinite;
          }
        `}</style>
      </div>
    </>
  );
};

export default LandingPage;
