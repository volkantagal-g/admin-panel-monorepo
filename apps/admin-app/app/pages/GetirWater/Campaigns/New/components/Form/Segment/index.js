import { useState } from 'react';
import { Form, Row, Col, Upload, Button, Select, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import AntCard from '@shared/components/UI/AntCard';
import { getBase64, convertConstantValuesToSelectOptions } from '@shared/utils/common';

import { segmentTypeList } from '../../../../constants';
import { Creators } from '../../../redux/actions';
import useStyles from './styles';

const Segment = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('getirWaterCampaignsPage');
  const classes = useStyles();

  const [segmentType, setSegmentType] = useState(undefined);

  const segmentTypes = convertConstantValuesToSelectOptions(segmentTypeList);

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const fileProps = {
    accept: '.csv',
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(t('success:SUCCESS'));
      }
      else if (info.file.status === 'error') {
        message.error(t('error:UNKNOWN_ERROR'));
      }
    },
    className: classes.fileUploader,
    customRequest(options) {
      const { onSuccess, onError, file } = options;
      try {
        getBase64(file, _loadedFileUrl => {
          dispatch(Creators.createSegmentRequest({ data: { file: _loadedFileUrl, onSuccess, type: segmentType } }));
        });
      }
      catch (err) {
        onError(err);
      }
    },
  };

  const handleOnChangeSegmentType = value => {
    setSegmentType(value);
  };

  return (
    <AntCard bordered={false} title={t('FORM.SEGMENT.TITLE')}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Form.Item name="segmentFile" label={t('FORM.SEGMENT.FILE.TITLE')} valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload {...fileProps}>
              <Button type="primary" icon={<UploadOutlined />} disabled={!segmentType} className="w-100">
                {t('global:UPLOAD')}
              </Button>
            </Upload>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="segmentType" label={t('FORM.SEGMENT.TYPE.TITLE')}>
            <Select options={segmentTypes} className="w-100" onChange={handleOnChangeSegmentType} />
          </Form.Item>
        </Col>
      </Row>
    </AntCard>
  );
};

export default Segment;
