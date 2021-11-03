import useInnerBlocks from '../useInnerBlocks';

/**
 * Gets all child block attributes for a specific block.
 *
 * @param {string} clientId The block client ID.
 * @returns {Array} An array of child block attributes.
 */
const useInnerBlocksAttributes = (clientId) => {
  const blocks = useInnerBlocks(clientId);

  return blocks.map((block) => block.attributes);
};

export default useInnerBlocksAttributes;
