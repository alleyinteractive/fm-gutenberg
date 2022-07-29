import WPRESTMedia from '@/interfaces/wp-rest-media';
import getMediaURL from '@/services/media/get-media-url';
import { BlockIcon, MediaPlaceholder } from '@wordpress/block-editor';
import { Button, Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import styled from 'styled-components';
import SafeHTML from '../safe-html';

const Container = styled.div`
  display: block;
  position: relative;
`;

const DefaultPreview = styled.div`
  background: #fafafa;
  border: 1px solid #ececec;
  border-radius: 3px;
  padding: 1em;
  width: 100%;
`;

const PreviewLabel = styled.p`
  font-weight: 800;
`;

const MimeType = styled.span`
  color: #999;
  text-style: italic;
`;

interface PreviewProps {
  src: string;
}

interface MediaPickerProps {
  allowedTypes?: string[];
  className?: string;
  icon?: string;
  imageSize?: string;
  label?: string;
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
  label = '',
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
  const media = useSelect((select) => (value ? select('core').getMedia(value) || null : {}), [value]);

  // getEntityRecord returns `null` if the load is in progress.
  if (value !== 0 && media === null) {
    return (
      <Spinner />
    );
  }

  // If we have a valid source URL of any type, display it.
  const src = media ? getMediaURL(media, imageSize) : valueURL;
  const {
    fm_media_preview: fmMediaPreview,
    link: mediaLink = '',
    mime_type: mimeType = '',
    title: {
      rendered: mediaTitle = '',
    } = {},
  } = media;
  if (src) {
    return (
      <Container className={className}>
        {Preview ? (
          <Preview src={src} />
        ) : (
          <DefaultPreview className="fm-gutenberg-media-picker__preview">
            {label ? (<PreviewLabel>{label}</PreviewLabel>) : null}
            <p>{__('Selected file:', 'fm-gutenberg')}</p>
            <SafeHTML
              html={fmMediaPreview}
              tag="div"
            />
            <p><a href={mediaLink}>{mediaTitle}</a></p>
            <MimeType>{mimeType}</MimeType>
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
        labels={{ title: label }}
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
