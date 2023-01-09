import React from 'react';
import { PanelRow, Button } from '@wordpress/components';

interface AddMoreButtonProps {
  addMoreLabel: string,
  addNew: () => void,
  limit?: number,
  minimumCount?: number,
}

export default function AddMoreButton({
  addMoreLabel,
  addNew,
  limit,
  minimumCount,
}: AddMoreButtonProps) {
  if ((limit === 0 || (limit > 1 && limit > minimumCount))) {
    return (
      <PanelRow>
        <Button
          isSecondary
          onClick={addNew}
        >
          {addMoreLabel}
        </Button>
      </PanelRow>
    );
  }
  return null;
}
