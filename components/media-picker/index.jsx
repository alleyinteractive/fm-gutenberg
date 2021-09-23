import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
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
  // TODO: Mimic what core is doing here for image selection/URL entry to the extent possible.
  console.log(valueUrl);

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
      <MediaUploadCheck>
        <MediaUpload
          title={__('Select/add File', 'wp-starter-plugin')}
          onSelect={onUpdate}
          allowedTypes={allowedTypes}
          value={value}
          render={({ open }) => (
            <>
              {value !== 0 && media !== null ? (
                <div>
                  <img
                    alt=""
                    src={getMediaUrl(media, imageSize)}
                  />
                  <div
                    style={{
                      background: 'white',
                      left: '50%',
                      padding: 5,
                      position: 'absolute',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 10,
                    }}
                  >
                    <Button
                      isPrimary
                      isLarge
                      onClick={open}
                      style={{ marginBottom: 0 }}
                    >
                      { __('Replace File', 'wp-starter-plugin')}
                    </Button>
                    <Button
                      isLink
                      isDestructive
                      onClick={onReset}
                      style={{ marginBottom: 0 }}
                    >
                      { __('Remove File', 'wp-starter-plugin')}
                    </Button>
                  </div>
                </div>
              ) : null}
              {value === 0 ? (
                <div
                  style={{
                    background: 'white',
                    padding: 5,
                  }}
                >
                  <Button
                    isPrimary
                    onClick={open}
                  >
                    { __('Select/add File', 'wp-starter-plugin')}
                  </Button>
                </div>
              ) : null}
            </>
          )}
        />
      </MediaUploadCheck>
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
