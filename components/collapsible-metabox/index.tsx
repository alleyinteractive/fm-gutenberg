import React, { useState } from 'react';
import classNames from 'classnames';
import { uid } from 'react-uid';

import Field from '@/interfaces/field';
import { Button } from '@wordpress/components';
import MetaBox from '../meta-box';

import './index.scss';

interface MetaBoxProps {
  field: {
    title: string;
    fm: Field;
  }
}

function CollapsibleMetabox({
  field,
}: MetaBoxProps) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="fm-gutenberg-normal-metabox-container__metabox">
      {/* @ts-ignore */}
      <Button isLink onClick={() => setCollapsed(!collapsed)}>
        <h2>
          {field.title}
          <span className={classNames(
            'fm-gutenberg-normal-metabox',
            { 'fm-gutenberg-normal-metabox__down': collapsed },
            { 'fm-gutenberg-normal-metabox__up': !collapsed },
          )}
          />
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
