import useChildBlocksCount from 'hooks/useChildBlocksCount';

export default function useHasChildBlocks(clientId) {
  return useChildBlocksCount(clientId) > 0;
}
