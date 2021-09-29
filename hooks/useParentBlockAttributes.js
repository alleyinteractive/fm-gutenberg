import { store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Gets the parent block attributes for a specific block.
 *
 * @param {string} clientId The block client ID.
 * @returns {array} The parent block attributes.
 */
export default function useParentBlockAttributes(clientId) {
  return useSelect(
    (select) => {
      const {
        getBlockAttributes,
        getBlockRootClientId,
      } = select(blockEditorStore);

      // Get parent block client ID.
      const rootBlockClientId = getBlockRootClientId(clientId);

      if (!rootBlockClientId) {
        return null;
      }

      // Get parent block attributes.
      return getBlockAttributes(rootBlockClientId);
    },
    [clientId],
  );
}
