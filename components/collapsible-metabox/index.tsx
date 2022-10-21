import React, { useState } from 'react';
import classNames from 'classnames';
import { uid } from 'react-uid';

import Field from '@/interfaces/field';
import { Button } from '@wordpress/components';
import MetaBox from '../../slotfills/sections/meta-box';

interface MetaBoxProps {
  field: Field;
}

function CollapsibleMetabox({
  field,
}: MetaBoxProps) {
  const [collapsed, setCollapsed] = useState(false);
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
        <MetaBox field={field} key={uid(field)} />
      </div>
    </div>
  );
}

export default CollapsibleMetabox;
