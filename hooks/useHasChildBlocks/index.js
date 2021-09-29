import useChildBlocksCount from '../useChildBlocksCount';

/**
 * Determines if a specific block has child blocks.
 *
 * @param {string} clientId The block client ID.
 * @returns {boolean} True if the block contains child blocks, otherwise false.
 */
export default function useHasChildBlocks(clientId) {
  return useChildBlocksCount(clientId) > 0;
}
