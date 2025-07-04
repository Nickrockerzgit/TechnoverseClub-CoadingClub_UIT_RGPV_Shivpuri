// import React from 'react';
// import { motion } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { Github, Linkedin } from 'lucide-react';

// const Team = () => {
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   const teamMembers = [
//     {
//       name: 'John Doe',
//       role: 'Club President',
//       image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
//       github: '#',
//       linkedin: '#'
//     },
//     {
//       name: 'Jane Smith',
//       role: 'Vice President',
//       image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
//       github: '#',
//       linkedin: '#'
//     },
//     {
//       name: 'Mike Johnson',
//       role: 'Lead Developer',
//       image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
//       github: '#',
//       linkedin: '#'
//     },
//     {
//       name: 'Sarah Williams',
//       role: 'Member',
//       image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
//       github: '#',
//       linkedin: '#'
//     },
//     {
//       name: 'David Brown',
//       role: 'Member',
//       image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
//       github: '#',
//       linkedin: '#'
//     }
//   ];

//   return (
//     <div className="py-20 bg-gradient-to-b from-[#0B0B1F] to-[#1A1A3A]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           ref={ref}
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl font-bold text-white mb-6">Our Team</h2>
//           <p className="text-xl text-gray-300 max-w-2xl mx-auto">
//             Meet the passionate individuals behind Technovers who make it all possible.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
//           {teamMembers.map((member, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center"
//             >
//               <div className="relative mb-4 mx-auto w-32 h-32">
//                 <img
//                   src={member.image}
//                   alt={member.name}
//                   className="rounded-full w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20"></div>
//               </div>
//               <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
//               <p className="text-purple-400 mb-4">{member.role}</p>
//               <div className="flex justify-center space-x-4">
//                 <a href={member.github} className="text-gray-400 hover:text-white transition-colors">
//                   <Github className="h-5 w-5" />
//                 </a>
//                 <a href={member.linkedin} className="text-gray-400 hover:text-white transition-colors">
//                   <Linkedin className="h-5 w-5" />
//                 </a>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Team;










import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin } from 'lucide-react';
import axios from 'axios';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  github: string;
  linkedin: string;
}

const Team = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/team/get-team-members');
        setTeamMembers(response.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="pt-10 pb-4 sm:pb-6 lg:pb-8">   
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Our Team</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Meet the passionate individuals behind Technovers who make it all possible.
          </p>
        </motion.div>

        {/* President and Vice President - Top Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {teamMembers.slice(0, 2).map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center transform hover:scale-110 hover:rotate-3d transition-all duration-300 ease-in-out"
            >
              <div className="relative mb-4 mx-auto w-32 h-32">
                <img
                  src={`http://localhost:5001${member.image}`}
                  alt={member.name}
                  className="rounded-full w-full h-full object-cover"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
              <p className="text-purple-400 mb-4">{member.role}</p>
              <div className="flex justify-center space-x-4">
                <a href={member.github} className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href={member.linkedin} className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Team Members - Bottom Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8">
          {teamMembers.slice(2).map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (index + 2) * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center transform hover:scale-110 hover:rotate-3d transition-all duration-300 ease-in-out"
            >
              <div className="relative mb-4 mx-auto w-32 h-32">
                <img
                  src={`http://localhost:5001${member.image}`}
                  alt={member.name}
                  className="rounded-full w-full h-full object-cover"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
              <p className="text-purple-400 mb-4">{member.role}</p>
              <div className="flex justify-center space-x-4">
                <a href={member.github} className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href={member.linkedin} className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;