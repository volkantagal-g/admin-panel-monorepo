/* eslint-disable react/require-default-props */
import { CloudDownloadOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

import { downloadDataAsCSVV2 } from '@shared/utils/common';

export function CSVDownloader({
  showIcon,
  jsonData,
  fileName,
  buttonText,
  tooltipTitle,
  ...antdButtonRest
}: {
  showIcon?: boolean;
  jsonData: any;
  fileName: string;
  buttonText: React.ReactNode;
  tooltipTitle?: string;
  antdButtonRest?: any;
}) {
  const button = (
    <Button
      onClick={() => downloadDataAsCSVV2(jsonData, fileName)}
      icon={showIcon && <CloudDownloadOutlined />}
      {...antdButtonRest}
    >
      {buttonText || 'CSV'}
    </Button>
  );

  if (tooltipTitle) {
    return (
      <Tooltip title={tooltipTitle}>
        {button}
      </Tooltip>
    );
  }

  return button;
}
