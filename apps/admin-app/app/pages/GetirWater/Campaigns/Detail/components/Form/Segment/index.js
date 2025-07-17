import { Form, Row, Col, Upload, Button, Select, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import AntCard from '@shared/components/UI/AntCard';
import { getBase64, convertConstantValuesToSelectOptions } from '@shared/utils/common';

import { segmentTypeList } from '../../../../constants';
import { Creators } from '../../../redux/actions';
import useStyles from './styles';

const Segment = ({ setSegmentType, segmentType }) => {
  const [segmentForm] = Form.useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation('getirWaterCampaignsPage');
  const classes = useStyles();

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

  const handleOnChangeSegmentType = segmentTypeInputValue => {
    setSegmentType(segmentTypeInputValue);
  };

  return (
    <Form id="edit-segment-info" layout="vertical" form={segmentForm}>
      <AntCard bordered={false} title={t('FORM.SEGMENT.TITLE')}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item name="segmentFile" valuePropName="fileList" label={t('FORM.SEGMENT.FILE.TITLE')} getValueFromEvent={normFile}>
              <Upload {...fileProps}>
                <Button type="primary" className="w-100" disabled={!segmentType} icon={<UploadOutlined />}>
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
    </Form>
  );
};

export default Segment;
