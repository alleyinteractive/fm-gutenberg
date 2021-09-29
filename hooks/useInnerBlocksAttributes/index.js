import useInnerBlocks from '../useInnerBlocks';

/**
 * Gets all child block attributes for a specific block.
 *
 * @param {string} clientId The block client ID.
 * @returns {Array} An array of child block attributes.
 */
export default function useInnerBlocksAttributes(clientId) {
  const blocks = useInnerBlocks(clientId);

  return blocks.map((block) => block.attributes);
}
