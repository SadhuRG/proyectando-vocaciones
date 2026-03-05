import React from 'react';
import TeamCard from './TeamCard';

const StaticTeam = ({ members }) => (
  <div className="static-team-wrapper">
    {members.map((member) => (
      <TeamCard key={member.id} member={member} />
    ))}
  </div>
);

export default StaticTeam;