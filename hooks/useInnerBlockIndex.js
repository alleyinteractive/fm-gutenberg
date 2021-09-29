import useParentBlock from 'hooks/useParentBlock';
import useChildBlocks from 'hooks/useChildBlocks';

/**
 * Gets the current index of a specific block relative to its sibilings.
 *
 * @param {string} clientId The block client ID.
 * @returns {integer} The block index.
 */
export default function useInnerBlockIndex(clientId) {
  // Get the parent block.
  const parentBlockClientId = useParentBlock(clientId);

  if (!parentBlockClientId) {
    return null;
  }

  // Get all children of that parent block.
  const chlidBlocks = useChildBlocks(parentBlockClientId);

  // Get the index.
  return chlidBlocks.findIndex((block) => block.clientId === clientId);
}
