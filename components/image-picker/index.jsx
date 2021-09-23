import PropTypes from 'prop-types';
import React from 'react';

// Components.
import MediaPicker from '../media-picker';

const ImagePicker = ({
  className,
  imageSize,
  onReset,
  onUpdate,
  value,
  valueUrl,
}) => (
  <MediaPicker
    className={className}
    allowedTypes={['image']}
    imageSize={imageSize}
    onUpdate={onUpdate}
    onReset={onReset}
    value={value}
    valueUrl={valueUrl}
  />
);

ImagePicker.defaultProps = {
  className: '',
  imageSize: 'thumbnail',
  valueUrl: '',
};

ImagePicker.propTypes = {
  className: PropTypes.string,
  imageSize: PropTypes.string,
  onReset: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  valueUrl: PropTypes.string,
};

export default ImagePicker;
