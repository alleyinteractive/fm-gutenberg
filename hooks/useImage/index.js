import { useSelect } from '@wordpress/data';

/**
 * Gets image data for a specific attachment.
 *
 * @param {int} imageId Image Id.
 * @returns {object} Image data.
 */
const useImage = (imageId) => {
  // Get image data.
  const image = useSelect(
    (select) => select('core').getMedia(imageId),
    [imageId],
  );

  /* eslint-disable camelcase */
  return {
    id: imageId,
    src: image?.source_url,
    alt: image?.alt_text,
    raw: image,
    height: image?.media_details?.sizes?.large?.height || image?.media_details?.height,
    width: image?.media_details?.sizes?.large?.width || image?.media_details?.width,
  };
};

export default useImage;
