import useChildBlocks from '../useChildBlocks';

/**
 * Gets all child block attributes for a specific block.
 *
 * @param {string} clientId The block client ID.
 * @returns {Array} An array of child block attributes.
 */
export default function useChildBlocksAttributes(clientId) {
  const blocks = useChildBlocks(clientId);

  return blocks.map((block) => block.attributes);
}
