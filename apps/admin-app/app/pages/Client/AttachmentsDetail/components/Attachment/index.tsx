/* eslint-disable jsx-a11y/media-has-caption */
import { Image } from 'antd';

import { AllowedMimeType } from '../../types';
import { isAllowedImage, isAllowedVideo, isPdf } from '../../utils';

type AttachmentProps = {
  type: AllowedMimeType;
  url: string;
}

const Attachment: React.FC<AttachmentProps> = ({ type, url }) => {
  return (
    <>
      {isAllowedImage(type) && (
        <Image
          src={url}
          style={{ maxHeight: '80vh' }}
        />
      )}

      {isAllowedVideo(type) && (
        <video width="100%" controls>
          <source src={url} type={type} />
        </video>
      )}

      {isPdf(type) && (
        <iframe
          title="PDF View"
          src={url}
          style={{
            width: '100%',
            height: '80vh',
            borderWidth: '0',
          }}
        />
      )}
    </>
  );
};

export default Attachment;
