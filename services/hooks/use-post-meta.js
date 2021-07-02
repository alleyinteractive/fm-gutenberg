import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';

/**
 * A custom React hook that wraps useEntityProp for working with postmeta. It
 * returns an array that contains a copy of postmeta for the current post, as
 * well as a helper function that sets a meta value for a given key. This hook
 * is intended to reduce boilerplate code in components that need to read and
 * write postmeta.
 * @returns {array} An array containing an object representing postmeta and an update function.
 */
const usePostMeta = () => {
  // Get the current post type, since we need to pass the post type as an argument to useEntityProp.
  const type = useSelect((select) => select('core/editor').getCurrentPostType(), []);

  // Get the value of meta and a function for updating meta from useEntityProp.
  const [meta, setMeta] = useEntityProp('postType', type, 'meta');

  /**
   * A helper function for updating postmeta that accepts a meta key and meta
   * value rather than entirely new meta object.
   * @param {string} key - The meta key to update.
   * @param {*} value - The meta value to update.
   */
  const setPostMeta = (key, value) => setMeta({
    ...meta,
    [key]: value,
  });

  return [meta, setPostMeta];
};

export default usePostMeta;
