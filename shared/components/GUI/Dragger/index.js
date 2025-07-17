import { memo } from 'react';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import { MIME_TYPE } from '@shared/shared/constants';

const { Dragger: DraggerAntd } = Upload;

export const Dragger = memo(function Dragger({ fileList, setFileList, accept = `${MIME_TYPE.CSV}, ${MIME_TYPE.XLS}, ${MIME_TYPE.XLSX}` }) {
  const props = {
    multiple: false,
    maxCount: 1,
    accept,
    onRemove: () => {
      setFileList([]);
    },
    beforeUpload: file => {
      setFileList([file]);
      return Upload.LIST_IGNORE;
    },
    fileList,
  };

  return (
    <DraggerAntd {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">{t('UPLOAD_VIA_DRAGGER')}</p>
      <p className="ant-upload-hint">
        {t('UPLOAD_VIA_DRAGGER_EXPLANATION')}
      </p>
    </DraggerAntd>
  );
});
