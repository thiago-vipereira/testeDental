import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite/no-important';

import { styles } from './LogoStyles';

const propTypes = {
  /** The url of the image that is going to be shown */
  src: PropTypes.string.isRequired,
  /** A short description of the image, screen readers use it to describe the image */
  alt: PropTypes.string.isRequired
}

const defaultProps = {
  src: '',
  alt: '',
};

/**
 * A component to handle the logo of the clinic in the login page.
 */

function Logo({ src, alt }) {
  return (
    <div className={css(styles.logoContainer)}>
      <img className={css(styles.logoImg)} src={src} alt={alt} />
    </div>
  );
}

Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;

export default Logo;
