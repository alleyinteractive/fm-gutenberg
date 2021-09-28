import useChildBlocks from 'hooks/useChildBlocks';

export default function useChildBlocksAttributes(clientId) {
  const blocks = useChildBlocks(clientId);

  return blocks.map((block) => block.attributes);
}
