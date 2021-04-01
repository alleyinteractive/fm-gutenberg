/**
 * Given a media object returned from the WordPress REST API, extracts the
 * thumbnail image for the media item if it exists, or the full size image
 * if it does not. Returns an empty string if unable to find either.
 * @param {object} media - A media object returned by the WordPress API.
 * @param {string} size - Size to request if requested.
 * @returns {string} - The URL to the image, or an empty string on failure.
 */
export default function getImageThumbnail(media, size = 'post-thumbnail') {
  let mediaType = 'image';

  if (media && (undefined !== media.media_type || undefined !== media.type)) {
    mediaType = media.media_type || media.type;
  }

  if (mediaType === 'image') {
    // If we're uploading, we'll get the media_details array.
    if (media.media_details) {
      const {
        media_details: {
          sizes: {
            [size]: {
              source_url: thumbnailUrl = '',
            } = {},
            thumbnail: {
              source_url: defaultUrl = '',
            } = {},
          } = {},
        } = {},
      } = media;

      return thumbnailUrl || defaultUrl;
    }

    const {
      sizes: {
        [size]: {
          url: thumbnailUrl = '',
        } = {},
        thumbnail: {
          url: defaultUrl = '',
        } = {},
      } = {},
    } = media;

    return thumbnailUrl || defaultUrl;
  }

  if (mediaType === 'file') {
    const {
      url: fileUrl = '',
    } = media;

    return fileUrl;
  }

  return '';
}
