import React from 'react';
import { motion } from 'framer-motion';
import TeamCard from './TeamCard';

const InfiniteSlider = ({ members, duration = 20 }) => {
    const duplicatedMembers = [...members, ...members, ...members];

    return (
        <div className="carousel-container">
            <motion.div
                className="carousel-inner"
                animate={{ x: ['0%', '-33.33%'] }}
                transition={{
                    x: { repeat: Infinity, repeatType: "loop", duration: duration, ease: "linear" },
                }}
                whileHover={{ animationPlayState: "paused" }}
            >
                {duplicatedMembers.map((member, index) => (
                    <TeamCard key={`${member.id}-${index}`} member={member} />
                ))}
            </motion.div>
        </div>
    );
};

export default InfiniteSlider;