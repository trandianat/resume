import React from 'react';
import './Title.scss';

const Title = ({ title }) => {
    return (<><div className="title">{title}</div><div className="border"/></>);
};

export default Title;