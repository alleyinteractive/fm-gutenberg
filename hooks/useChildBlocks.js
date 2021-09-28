import { store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

export default function useChildBlocks(clientId) {
  return useSelect(
    (select) => {
      const { getBlocks } = select(
        blockEditorStore,
      );

      return getBlocks(clientId)
    },
    [clientId],
  );
}
