import { MediaPlaceholder } from '@wordpress/block-editor';
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
}) => {
  // If we don't have a value, display a MediaPlaceholder to get it.
  if (!value) {
    return (
      <MediaPlaceholder
        allowedTypes={allowedTypes}
        icon="media-default"
        labels={{
          title: __('Select File', 'wp-starter-plugin'),
        }}
        onSelect={onUpdate}
        value={value}
      />
    );
  }

  // Get the media object given the media ID.
  const {
    attachment = null,
  } = useSelect((select) => ({
    attachment: select('core').getMedia(value),
  }), [value]);

  // getEntityRecord returns `null` if the load is in progress.
  if (attachment === null) {
    return (
      <Spinner />
    );
  }

  // Get information about the asset for the preview.
  const sourceUrl = getMediaUrl(attachment, imageSize);

  // Display the asset image or URL and remove button.
  return (
    <div className={className}>
      <p>
        {sourceUrl ? (
          <>
            {attachment.media_type === 'image' ? (
              <img
                alt={__('An image preview of the selected file.', 'wp-starter-plugin')}
                src={sourceUrl}
              />
            ) : (
              <>
                <strong>{__('Selected File:', 'wp-starter-plugin')}</strong>
                {' '}
                {sourceUrl}
              </>
            )}
          </>
        ) : (
          <Spinner />
        )}
      </p>
      <p>
        <Button
          isPrimary
          onClick={onReset}
        >
          {__('Deselect File', 'wp-starter-plugin')}
        </Button>
      </p>
    </div>
  );
};

MediaPicker.defaultProps = {
  allowedTypes: [],
  className: '',
  imageSize: 'thumbnail',
};

MediaPicker.propTypes = {
  allowedTypes: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  imageSize: PropTypes.string,
  onReset: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default MediaPicker;
