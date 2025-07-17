import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';

import { Creators } from '../../../redux/actions';
import { signedUrlSelector } from '../../../redux/selectors';

function DownloadAttachment({ fileKey, timestamp, personId }) {
  const dispatch = useDispatch();

  const [btnState, setBtnState] = useState({ fileKey, timestamp });

  const isPending = useSelector(signedUrlSelector.getIsPending);

  const handleDownload = () => {
    dispatch(
      Creators.getSignedUrlRequest({
        fileKey: `${btnState.timestamp}_${btnState.fileKey}`,
        personId,
      }),
    );
  };

  useEffect(() => {
    setBtnState(prev => ({
      ...prev,
      isLoading: prev.isLoading ? isPending : false,
    }));
  }, [isPending]);

  return (
    <Button
      type="link"
      loading={btnState.isLoading}
      onClick={() => {
        setBtnState(prev => ({ ...prev, isLoading: true }));
        handleDownload();
      }}
    >
      {!btnState.isLoading && <CloudDownloadOutlined />}
      {btnState.fileKey}
    </Button>
  );
}

export default DownloadAttachment;
