import { useSelect } from '@wordpress/data';

/**
 * Use a single image data given the ID.
 *
 * @param {int} imageId Image Id.
 * @returns {object} Image data.
 */
export default function useImage(imageId) {
  // Get image data based on ID.
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
}
