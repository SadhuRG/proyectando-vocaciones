import React from 'react';

const TeamCard = ({ member }) => (
  <div className="member-card">
    {member.isLeader && <span className="badge-leader">Director</span>}
    <div className="image-wrapper">
      <img src={member.image} alt={member.name} className="member-img" />
      <div className="overlay"></div>
    </div>
    <div className="card-content">
      <h3 className="member-name">{member.name}</h3>
      <p className="member-role">{member.role}</p>
    </div>
  </div>
);

export default TeamCard;