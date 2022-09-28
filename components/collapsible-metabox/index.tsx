import React, { useState } from 'react';
import classNames from 'classnames';

import Field from '@/interfaces/field';
import MetaBox from '../../slotfills/sections/meta-box';
import { Button } from '@wordpress/components';

interface MetaBoxProps {
  field: Field;
}

function CollapsibleMetabox({
  field,
}: MetaBoxProps) {
  const [collapsed, setCollapsed] = useState(false);
  console.log('field', field);
  return (
    <div className="fm-gutenberg-normal-metabox-container__metabox">
      <Button isLink onClick={() => setCollapsed(!collapsed)}>
        <h2>
          {field.title}
        </h2>
      </Button>
      <div className={classNames(
        'fm-gutenberg-normal-metabox-container__metabox-content',
        {
          collapsed,
        },
      )}
      >
        <MetaBox field={field} />
      </div>
    </div>
  );
}

export default CollapsibleMetabox;
