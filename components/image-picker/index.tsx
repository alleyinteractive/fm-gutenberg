import MediaPicker from '@/components/media-picker';
import WPRESTMedia from '@/interfaces/wp-rest-media';
import ImagePreview from './preview';

interface ImagePickerProps {
  className?: string;
  imageSize?: string;
  onReset: () => void;
  onUpdate: (media: WPRESTMedia) => void;
  onUpdateURL?: (url: string) => void;
  value: number;
  valueURL?: string;
}

export default function ImagePicker({
  className = '',
  imageSize = 'thumbnail',
  onReset,
  onUpdate,
  onUpdateURL = null,
  value,
  valueURL = '',
}: ImagePickerProps) {
  return (
    <MediaPicker
      allowedTypes={['image']}
      className={className}
      icon="format-image"
      imageSize={imageSize}
      onReset={onReset}
      onUpdate={onUpdate}
      onUpdateURL={onUpdateURL}
      preview={ImagePreview}
      value={value}
      valueURL={valueURL}
    />
  );
}
