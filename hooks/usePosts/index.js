import { useSelect } from '@wordpress/data';

/**
 * Gets post data for a set of posts given there IDs and post type.
 *
 * @param array  postIDs  A list of post IDs.
 * @param string postType Optional. The post type to select. Default 'post'.
 * @returns {object} An object containing a hasResolved property
 *                   and an array of returned post objects.
 */
const usePosts = (postIds, postType = 'post') => useSelect(
  (select) => {
    // Bail early if we don't have a post ID.
    if (postIds.length < 1) {
      return {
        hasResolved: true,
        posts: [],
      };
    }

    const query = {
      include: postIds,
    };

    const getEntityArgs = ['postType', postType, query];

    const { getEntityRecords, hasFinishedResolution } = select('core');
    const postData = getEntityRecords(...getEntityArgs);

    return {
      hasResolved: hasFinishedResolution('getEntityRecords', getEntityArgs),
      posts: postData,
    };
  }, [postIds, postType],
);

export default usePosts;
