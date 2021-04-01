import { __ } from '@wordpress/i18n';
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

// Services.
import getMediaUrl from 'services/media/get-media-url';

const ImageUpload = ({
  id,
  isSelected,
  onReset,
  onSelect,
}) => {
  const { media } = useSelect((select) => {
    const { getMedia } = select('core');
    return {
      media: id !== 0 ? getMedia(id) || {} : {},
    };
  });
  return (
    <div
      style={{
        backgroundColor: '#007CBA',
        height: id !== 0 ? 0 : 150,
        overflow: 'hidden',
        paddingTop: id !== 0 ? '56.25%' : 0,
        position: 'relative',
      }}
    >
      <MediaUploadCheck>
        <MediaUpload
          title={__('Select/add image', 'brookings')}
          onSelect={onSelect}
          allowedTypes={['image']}
          value={id}
          render={({ open }) => (
            <>
              {id !== 0 && Object.keys(media).length > 0 ? (
                <div>
                  <img
                    alt=""
                    src={getMediaUrl(media, 'post-list')}
                    style={{
                      height: '100%',
                      left: 0,
                      objectFit: 'cover',
                      position: 'absolute',
                      top: 0,
                      width: '100%',
                    }}
                  />
                  {isSelected ? (
                    <div
                      style={{
                        background: 'white',
                        left: '50%',
                        padding: '5px 0 5px 5px',
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
                        { __('Replace image', 'brookings')}
                      </Button>
                      <Button
                        isLink
                        isDestructive
                        onClick={onReset}
                        style={{ marginBottom: 0 }}
                      >
                        { __('Remove Image', 'brookings')}
                      </Button>
                    </div>
                  ) : null}
                </div>
              ) : null}
              {id === 0 ? (
                <div
                  style={{
                    background: 'white',
                    left: '50%',
                    padding: '5px',
                    position: 'absolute',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                  }}
                >
                  <Button
                    isPrimary
                    onClick={open}
                  >
                    { __('Select/add image', 'brookings')}
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

ImageUpload.defaultProps = {
  isSelected: true,
};

ImageUpload.propTypes = {
  id: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  onReset: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ImageUpload;
