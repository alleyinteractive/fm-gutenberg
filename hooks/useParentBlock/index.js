import { store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Gets the parent block for a specific block.
 *
 * @param {string} clientId The block client ID.
 * @returns {string} String of the parent block, otherwise null.
 */
export default function useParentBlock(clientId) {
  return useSelect(
    (select) => select(blockEditorStore).getBlockRootClientId(clientId),
    [clientId],
  );
}
