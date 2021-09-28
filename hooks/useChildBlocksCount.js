import useChildBlocks from 'hooks/useChildBlocks';

export default function useChildBlocksCount(clientId) {
  return useChildBlocks(clientId).length;
}
