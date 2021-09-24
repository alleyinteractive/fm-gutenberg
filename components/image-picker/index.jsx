import PropTypes from 'prop-types';
import React from 'react';

// Components.
import MediaPicker from '../media-picker';

const ImagePicker = ({
  className,
  imageSize,
  onReset,
  onUpdate,
  onUpdateURL,
  value,
  valueURL,
}) => (
  <MediaPicker
    className={className}
    allowedTypes={['image']}
    icon="format-image"
    imageSize={imageSize}
    onUpdate={onUpdate}
    onUpdateURL={onUpdateURL}
    onReset={onReset}
    value={value}
    valueURL={valueURL}
  />
);

ImagePicker.defaultProps = {
  className: '',
  imageSize: 'thumbnail',
  onUpdate: null,
  onUpdateURL: null,
  valueURL: '',
};

ImagePicker.propTypes = {
  className: PropTypes.string,
  imageSize: PropTypes.string,
  onReset: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
  onUpdateURL: PropTypes.func,
  value: PropTypes.number.isRequired,
  valueURL: PropTypes.string,
};

export default ImagePicker;
