import useChildBlocks from 'hooks/useChildBlocks';

/**
 * Gets the total count of all child blocks for a specific block.
 *
 * @param {string} clientId The block client ID.
 * @returns {integer} The count of all child blocks.
 */
export default function useChildBlocksCount(clientId) {
  return useChildBlocks(clientId).length;
}
