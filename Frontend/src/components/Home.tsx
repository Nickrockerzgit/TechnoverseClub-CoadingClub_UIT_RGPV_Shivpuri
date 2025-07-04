

import  { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Disc as Discord } from "lucide-react";
import BIRDS from "vanta/dist/vanta.birds.min";

const Hero1 = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (typeof window !== "undefined" && !vantaEffect && vantaRef.current) {
      setVantaEffect(
        BIRDS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0x0,
          color1: 0x6b48ff,
          color2: 0xff3c3c,
          colorMode: "variance",
          birdSize: 1.2,
          wingSpan: 30.0,
          speedLimit: 4.0,
          separation: 60.0,
          alignment: 80.0,
          cohesion: 40.0,
          quantity: 4.0,
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const handleJoinClick = () => {
    navigate("/joinus"); 
  };

  return (
    <div ref={vantaRef} className="relative h-[60vh] overflow-hidden flex items-center">
      {/* Content */}
      <div className="relative z-10 max-w-4xl px-4 sm:px-6 lg:px-8 pt-16 pb-10 w-full ml-[8px]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left max-w-lg"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 mt-5">
            Welcome to <span className="text-purple-500">Technovers</span>
          </h1>
          <p className="text-xl text-gray-300">
            Join our innovative coding community where we transform ideas into reality through technology and creativity.
          </p>

          {/* Join Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8"
          >
            <button
              onClick={handleJoinClick} // Navigate to the Joinus page
              className="inline-block px-6 py-3 bg-purple-500 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-purple-600 transition-all"
            >
              Join Us
            </button>
          </motion.div>

          {/* Social Icons */}
          <div className="flex space-x-6 mt-8">
            {[
              { Icon: Github, href: "#" },
              { Icon: Linkedin, href: "#" },
              { Icon: Instagram, href: "https://www.instagram.com/technoverse_uits/" },
              { Icon: Discord, href: "#" },
            ].map(({ Icon, href }, index) => (
              <motion.a
                key={index}
                href={href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Icon className="h-6 w-6" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero1;







