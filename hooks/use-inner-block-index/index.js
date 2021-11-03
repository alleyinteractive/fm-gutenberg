import useInnerBlocks from '../use-inner-blocks';
import useParentBlock from '../use-parent-block';

/**
 * Gets the current index of a specific block relative to its sibilings.
 *
 * @param {string} clientId The block client ID.
 * @returns {integer} The block index.
 */
const useInnerBlockIndex = (clientId) => {
  // Get the parent block.
  const parentBlockClientId = useParentBlock(clientId);

  // Get all children of that parent block.
  const chlidBlocks = useInnerBlocks(parentBlockClientId);

  // No child blocks found.
  if (!chlidBlocks) {
    // Returns -1 to match the `not found` value from `findIndex`.
    return -1;
  }

  // Get the index.
  return chlidBlocks.findIndex((block) => block.clientId === clientId);
};

export default useInnerBlockIndex;
