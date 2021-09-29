import { store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Get all children blocks of any given block.
 *
 * @param {string} clientId The block client ID.
 * @returns {Array} An array of child blocks.
 */
export default function useChildBlocks(clientId) {
  return useSelect(
    (select) => {
      const { getBlocks } = select(
        blockEditorStore,
      );

      return getBlocks(clientId);
    },
    [clientId],
  );
}
