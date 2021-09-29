import useInnerBlocks from '../useInnerBlocks';

/**
 * Gets the total count of all child blocks for a specific block.
 *
 * @param {string} clientId The block client ID.
 * @returns {integer} The count of all child blocks.
 */
export default function useInnerBlocksCount(clientId) {
  return useInnerBlocks(clientId).length;
}
