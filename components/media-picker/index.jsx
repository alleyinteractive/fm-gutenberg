import { MediaPlaceholder } from '@wordpress/block-editor';
import { Button, Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import React from 'react';

const MediaPicker = ({
  onUpdate,
  value,
}) => {
  // If we don't have a value, display a MediaPlaceholder to get it.
  if (!value) {
    return (
      <MediaPlaceholder
        icon="pdf"
        labels={{
          title: __('Select File', 'wp-starter-plugin'),
        }}
        onSelect={({ id }) => onUpdate(id)}
        value={value}
      />
    );
  }

  // Get the media URL given the media ID.
  const {
    attachment = null,
  } = useSelect((select) => ({
    attachment: select('core').getEntityRecord(
      'postType',
      'attachment',
      value,
    ),
  }), [value]);

  // getEntityRecord returns `null` if the load is in progress.
  if (attachment === null) {
    return (
      <Spinner />
    );
  }

  // getEntityRecord will return `undefined` if the load failed.
  const sourceUrl = attachment && attachment.source_url
    ? attachment.source_url
    : '';

  // Display the asset URL and remove button.
  return (
    <>
      <p>
        {sourceUrl ? (
          <>
            <strong>{__('Selected File:', 'wp-starter-plugin')}</strong>
            {' '}
            {sourceUrl}
          </>
        ) : (
          <Spinner />
        )}
      </p>
      <p>
        <Button
          isPrimary
          onClick={() => onUpdate(0)}
        >
          {__('Deselect File', 'wp-starter-plugin')}
        </Button>
      </p>
    </>
  );
};

MediaPicker.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default MediaPicker;
