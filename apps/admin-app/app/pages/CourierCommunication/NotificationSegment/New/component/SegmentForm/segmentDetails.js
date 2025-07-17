import { useState } from 'react';
import { Card, Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

const SegmentDetailsCardHeader = ({ title, lang }) => {
  return (
    <Row className="w-100">
      <Col md={12} xs={12}>{title}</Col>
      <Col md={12} xs={12} className="text-right font-weight-bold">{lang.toUpperCase()}</Col>
    </Row>
  );
};

const SegmentDetails = ({ prevData, handleData }) => {
  const classes = useStyles();
  const { t } = useTranslation(['courierSegment', 'global']);
  const [, setSegment] = useState(prevData?.segmentDetails || { title: '', description: '' });

  const handleTitleChange = e => {
    setSegment(prevState => {
      const titleValue = {
        ...prevState,
        title: e.target.value,
      };
      handleData(titleValue);
      return titleValue;
    });
  };

  const handleDescriptionChange = e => {
    setSegment(prevState => {
      const descriptionValue = {
        ...prevState,
        description: e.target.value,
      };
      handleData(descriptionValue);
      return descriptionValue;
    });
  };

  return (
    <Row gutter={24}>
      <Form.Item noStyle dependencies={['phoneLanguages']}>
        { () => {
          return (
            <Col className={classes.segmentDetailForm} md={8} xs={12}>
              <Card title={<SegmentDetailsCardHeader title={t('DETAILS')} lang="en" />} bordered>
                <div className="mt-2">
                  <Form.Item
                    className="w-100 d-inline"
                    label={t('NAME')}
                  >
                    <Row className="mt-2">
                      <Col xs={24} lg={24}>
                        <Input
                          onChange={e => {
                            handleTitleChange(e);
                          }}
                          defaultValue={prevData?.segmentDetails?.title}
                        />
                      </Col>
                    </Row>
                  </Form.Item>
                </div>
                <div className="mt-2">
                  <Form.Item
                    className="w-100 d-inline"
                    label={t('DESCRIPTION')}
                  >
                    <Row className="mt-2">
                      <Col xs={24} lg={24}>
                        <Input.TextArea
                          rows={5}
                          onChange={e => {
                            handleDescriptionChange(e);
                          }}
                          defaultValue={prevData?.segmentDetails?.description}
                        />
                      </Col>
                    </Row>
                  </Form.Item>
                </div>
              </Card>
            </Col>
          );
        }}
      </Form.Item>
    </Row>
  );
};

export default SegmentDetails;
