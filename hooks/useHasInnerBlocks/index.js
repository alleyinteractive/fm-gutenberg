import useInnerBlocksCount from '../useInnerBlocksCount';

/**
 * Determines if a specific block has inner blocks.
 *
 * @param {string} clientId The block client ID.
 * @returns {boolean} True if the block contains inner blocks, otherwise false.
 */
export default function useHasInnerBlocks(clientId) {
  return useInnerBlocksCount(clientId) > 0;
}
