/* global wp */
import { useState } from 'react';
import { cloneDeep } from 'lodash';

const usePostMeta = () => {
  const meta = wp.data.select('core/editor').getEditedPostAttribute('meta') ?? {};
  const [stateMeta, setStateMeta] = useState(meta);
  const setMeta = (next) => {
    wp.data.dispatch('core/editor').editPost({ meta: next });
    setStateMeta(next);
  };
  /**
   * Define a wrapper for the setMeta function that performs a recursive clone
   * of the meta object to ensure that there are no issues related to updating
   * objects or array values within meta keys not triggering React or
   * Gutenberg's state management system realizing that there is a change due
   * to the fact that sub-items are stored as object references. These bugs are
   * extremely difficult to find and correct, so it makes sense to include this
   * functionality here as a catch-all on updates.
   * @param {object} next - The new value for meta.
   */
  const setMetaSafe = (next) => setMeta(cloneDeep(next));

  return [stateMeta, setMetaSafe];
};

/**
 * A custom React hook that wraps the window wp object for working with a specific
 * postmeta value. It returns the value for the specified meta key as well as a
 * setter for the meta value. This hook is intended to reduce boilerplate code
 * in components that need to read and write postmeta. It differs from
 * usePostMeta in that it operates on a specific meta key/value pair.
 * By default, it operates on postmeta for the current post.
 * @param {string} metaKey - The meta key for which to manage the value.
 * @returns {array} An array containing the postmeta value and an update function.
 */
const usePostMetaValue = (metaKey) => {
  const [meta, setMeta] = usePostMeta();

  /**
   * A helper function for setting the value for the meta key that this hook is
   * responsible for.
   * @param {*} value - The value to set for the key.
   */
  const setPostMetaValue = (value) => {
    const freshMeta = wp.data.select('core/editor').getEditedPostAttribute('meta') ?? {};
    setMeta({ ...freshMeta, [metaKey]: value });
  };

  return [meta[metaKey], setPostMetaValue];
};

export default usePostMetaValue;
