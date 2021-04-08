import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ label, variant, ...rest }) => (
    <button className={`${variant}-button`} {...rest}>
        {label}
    </button>
);

Button.propTypes = {
    label: PropTypes.string,
    variant: PropTypes.string
};

Button.defaultProps = {
    label: null,
    variant: 'secondary'
};

export default Button;