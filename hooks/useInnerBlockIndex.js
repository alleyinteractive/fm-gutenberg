import { store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

export default function useInnerBlockIndex(clientId) {
  return useSelect(
    (select) => {
      const rootBlockClientId = select(blockEditorStore).getBlockRootClientId(clientId);
      const blocks = select(blockEditorStore).getBlocks(rootBlockClientId);
      return blocks.findIndex((block) => block.clientId === clientId);
    },
    [clientId],
  );
}
