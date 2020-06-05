import React from 'react';
import './Title.scss';

const Title = props => {
    const { title } = props;
    return (<><div className="title">{title}</div><div className="border"/></>);
};

export default Title;