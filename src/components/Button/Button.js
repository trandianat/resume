import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Button.scss';

const Button = ({ className, label, variant, ...rest }) => (
    <button className={classNames(`${variant}-button`, { [className]: className })} {...rest}>
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