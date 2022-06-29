import WPRESTMedia from '@/interfaces/wp-rest-media';
import getMediaURL from '@/services/media/get-media-url';
import { BlockIcon, MediaPlaceholder } from '@wordpress/block-editor';
import { Button, Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import styled from 'styled-components';

const Container = styled.div`
  display: block;
  position: relative;
`;

const DefaultPreview = styled.div`
  background: white;
  border: 1px solid black;
  padding: 1em;
`;

interface PreviewProps {
  src: string;
}

interface MediaPickerProps {
  allowedTypes?: string[];
  className?: string;
  icon?: string;
  imageSize?: string;
  onReset: () => void;
  onUpdate: (media: WPRESTMedia) => void;
  onUpdateURL?: (url: string) => void;
  preview?: (props: PreviewProps) => JSX.Element;
  value: number;
  valueURL?: string;
}

export default function MediaPicker({
  allowedTypes = [],
  className = '',
  icon = 'format-aside',
  imageSize = 'thumbnail',
  onReset,
  onUpdate,
  onUpdateURL = null,
  preview: Preview = null,
  value,
  valueURL = '',
}: MediaPickerProps) {
  /*
   * Get the media object, if given the media ID.
   *
   * The getMedia method is a magic method on the core-data selector and does
   * not have a type defined in the types exported by Gutenberg.
   */
  // @ts-ignore
  const media = useSelect((select) => (value ? select('core').getMedia(value) || null : null), [value]);

  // getEntityRecord returns `null` if the load is in progress.
  if (value !== 0 && media === null) {
    return (
      <Spinner />
    );
  }

  // If we have a valid source URL of any type, display it.
  const src = media ? getMediaURL(media, imageSize) : valueURL;
  if (src) {
    return (
      <Container className={className}>
        {Preview ? (
          <Preview src={src} />
        ) : (
          <DefaultPreview className="fm-gutenberg-media-picker__preview">
            <p>{__('Selected file:', 'fm-gutenberg')}</p>
            <p><a href={src}>{src}</a></p>
          </DefaultPreview>
        )}
        <Button
          isLarge
          isPrimary
          onClick={onReset}
        >
          { __('Replace', 'fm-gutenberg')}
        </Button>
      </Container>
    );
  }

  return (
    <Container className={className}>
      <MediaPlaceholder
        allowedTypes={allowedTypes}
        disableMediaButtons={!!valueURL}
        icon={<BlockIcon icon={icon} />}
        onSelect={onUpdate}
        onSelectURL={onUpdateURL}
        // This format for value is actually correct.
        // The type definition from WP is missing this format.
        // @ts-ignore
        value={{ id: value, src }}
      />
    </Container>
  );
}
