import useChildBlocks from '../useChildBlocks';
import useParentBlock from '../useParentBlock';

/**
 * Gets the current index of a specific block relative to its sibilings.
 *
 * @param {string} clientId The block client ID.
 * @returns {integer} The block index.
 */
export default function useChildBlockIndex(clientId) {
  // Get the parent block.
  const parentBlockClientId = useParentBlock(clientId);

  // Get all children of that parent block.
  const chlidBlocks = useChildBlocks(parentBlockClientId);

  if (!chlidBlocks) {
    return null;
  }

  // Get the index.
  return chlidBlocks.findIndex((block) => block.clientId === clientId);
}
