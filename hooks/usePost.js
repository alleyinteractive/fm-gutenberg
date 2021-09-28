import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

/**
 * A custom hook for working with linkedEntry data.
 *
 * @param int    postId   The ID for the post to return.
 * @param string postType Optional. The post type to select. Default 'post'.
 * @returns {object} An object containing a hasResolved property
 *                   and the returned post object.
 */
export default function usePost(postId, postType = 'post') {
  return useSelect(
    (select) => {
      // Bail early if we don't have a post ID.
      if (!postId) {
        return {
          hasResolved: true,
          post: false,
        };
      }

      const getEntityArgs = ['postType', postType, postId];

      const { getEntityRecord, hasFinishedResolution } = select('core');
      const postData = getEntityRecord(...getEntityArgs);

      return {
        hasResolved: hasFinishedResolution('getEntityRecord', getEntityArgs),
        post: postData,
      };
    },
    [postId, postType],
  );
};
