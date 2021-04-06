import React from 'react';
import './Title.scss';

const Title = ({ title }) => {
  return (
    <div className="title">
      <div className="role">{title}</div>
      <div className="border" />
    </div>
  );
};

export default Title;
