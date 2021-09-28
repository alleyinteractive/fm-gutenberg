import { store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

export default function useParentBlockAttributes(clientId) {
  return useSelect(
    (select) => {
      const {
        getBlockAttributes,
        getBlockRootClientId,
      } = select(blockEditorStore);

      // Get parent block client ID.
      const rootBlockClientId = getBlockRootClientId(clientId);

      // Get parent block attributes.
      return getBlockAttributes(rootBlockClientId);
    },
    [clientId],
  );
}
