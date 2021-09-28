import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

/**
 * A custom hook for working with linkedEntry data.
 *
 * @param array  postIDs  A list of post IDs.
 * @param string postType Optional. The post type to select. Default 'post'.
 * @returns {object} An object containing a hasResolved property
 *                   and an array of returned post objects.
 */
export default function usePosts(postIds, postType = 'post') {
  return useSelect(
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
};
