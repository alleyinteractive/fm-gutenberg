import { useSelect } from '@wordpress/data';
import { uid } from 'react-uid';

import CollapsibleMetabox from '../../components/collapsible-metabox';
import './style.scss';

const FmGutenbergMetaBoxes = () => {
  const post = useSelect((select) => (
    select('core/editor').getCurrentPost()
  ));
  console.log('post', post);
  const {
    fm_gutenberg_fields: {
      normal: normalFields = [],
    } = [],
  } = post;
  return (
    normalFields.map((field) => (
      <CollapsibleMetabox field={field} key={uid(field)} />
    ))
  );
};

export default FmGutenbergMetaBoxes;
