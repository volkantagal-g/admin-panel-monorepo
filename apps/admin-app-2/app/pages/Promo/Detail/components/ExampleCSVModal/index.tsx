import { Button, Modal, Table } from 'antd';
import _ from 'lodash';

import { DownloadOutlined, ProfileOutlined } from '@ant-design/icons';

import React from 'react';

import { t } from '@shared/i18n';
import useStyles from './styles';
import { useToggle } from '@shared/hooks';
import { downloadDataAsCSV } from '@shared/utils/common';

type DataType = Record<string, string>

type PropTypes = {
  exampleCsv: Record<string, string | boolean | number>[];
  disabled?: boolean;
  modalProps?: Record<string, any>;
}

const transformRowData = (data: Record<string, string | boolean | number>) => {
  const transformedData = Object.fromEntries(Object.entries(data).map(([key, value]) => {
    return [key, _.isBoolean(value) ? JSON.stringify(value) : value];
  }));

  const uniqueRowKey = _.random(0, 1000000);

  return {
    ...transformedData,
    key: uniqueRowKey,
  };
};

export function ExampleCSV({ exampleCsv, disabled, modalProps = {} }: PropTypes) {
  const classes = useStyles();

  const [isVisible, toggleVisible] = useToggle();

  const columns = Object.keys(exampleCsv[0] ?? {}).map(key => {
    return {
      title: key,
      dataIndex: key,
      key,
    };
  });

  const tableData = exampleCsv.map(transformRowData);

  const handleDownload = () => {
    const data = tableData.map(({ key, ...rest }) => rest);
    downloadDataAsCSV({
      data,
      columns: [Object.fromEntries(Object.keys(data[0] ?? {}).map(key => [key, key]))],
    });
  };

  return (
    <>
      <Button
        icon={<ProfileOutlined />}
        onClick={toggleVisible}
        className="ml-1"
        disabled={disabled}
      >
        {t('global:EXAMPLE_CSV')}
      </Button>
      <Modal
        title={t('global:EXAMPLE_CSV')}
        centered
        visible={isVisible}
        onOk={toggleVisible}
        okButtonProps={{ disabled }}
        onCancel={toggleVisible}
        className={classes.modal}
        footer={[
          <Button key="back" disabled={disabled} onClick={toggleVisible}>
            {t('global:CANCEL')}
          </Button>,
          <Button key="submit" type="primary" disabled={disabled} onClick={toggleVisible}>
            {t('global:OK')}
          </Button>,
          <Button
            key="download"
            disabled={disabled}
            icon={<DownloadOutlined />}
            onClick={handleDownload}
          >
            {t('global:DOWNLOAD')}
          </Button>,
        ]}
        {...modalProps}
      >
        <div className={classes.container}>
          <Table
            dataSource={tableData}
            columns={columns}
            scroll={{ x: 520 }}
            size="small"
            className={classes.table}
            pagination={false}
            showHeader
            footer={() => null}
            tableLayout="fixed"
          />
        </div>
      </Modal>
    </>
  );
}
