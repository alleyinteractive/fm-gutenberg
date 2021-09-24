import { MediaPlaceholder, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import React from 'react';

// Services.
import getMediaUrl from '../../services/media/get-media-url';

const MediaPicker = ({
  allowedTypes,
  className,
  imageSize,
  onReset,
  onUpdate,
  value,
  valueUrl,
}) => {
  // Get the media object, if given the media ID.
  const {
    media = null,
  } = useSelect((select) => ({
    media: value ? select('core').getMedia(value) : null,
  }), [value]);

  // getEntityRecord returns `null` if the load is in progress.
  if (value !== 0 && media === null) {
    return (
      <Spinner />
    );
  }

  return (
    <div
      className={className}
      style={{
        backgroundColor: '#007CBA',
        display: 'inline-block',
        position: 'relative',
      }}
    >
      <MediaPlaceholder
        allowedTypes={allowedTypes}
        disableMediaButtons={!!valueUrl}
        mediaPreview={valueUrl ? (
          <img
            alt={__('Edit image', 'wp-starter-plugin')}
            className="edit-image-preview"
            src={valueUrl}
            title={__('Edit image', 'wp-starter-plugin')}
          />
        ) : null}
        onSelect={(data) => console.log(data)}
        onSelectURL={(data) => console.log(data)}
        value={{ id: value, src: getMediaUrl(media, imageSize) }}
      />
    </div>
  );
};

MediaPicker.defaultProps = {
  allowedTypes: [],
  className: '',
  imageSize: 'thumbnail',
  valueUrl: '',
};

MediaPicker.propTypes = {
  allowedTypes: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  imageSize: PropTypes.string,
  onReset: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  valueUrl: PropTypes.string,
};

export default MediaPicker;
