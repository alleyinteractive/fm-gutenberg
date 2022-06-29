import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import React from 'react';

function SafeHTML({
  className,
  html,
  tag: Tag,
}) {
  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(html),
      }}
    />
  );
}

SafeHTML.defaultProps = {
  className: '',
};

SafeHTML.propTypes = {
  className: PropTypes.string,
  html: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

export default SafeHTML;
