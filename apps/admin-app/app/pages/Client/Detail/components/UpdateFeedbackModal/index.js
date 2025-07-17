import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { Button, Col, Divider, Form, Modal, Row } from 'antd';

import { clientFeedbackTypes, feedbackSourceTypes } from '@shared/shared/constantValues';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import AntTextArea from '@shared/components/UI/AntTextArea';
import { Creators } from '../../redux/actions';
import useStyles from './styles';
import { FEEDBACK_STATUSES } from '@shared/shared/constants';

const UpdateFeedbackModal = ({
  isModalVisible,
  setIsModalVisible,
  feedback,
  clientId,
}) => {
  const classes = useStyles();
  const { t } = useTranslation('clientDetail');
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [feedbackFormData, setFeedbackFormData] = useState({});

  const convertedFeedbackSourceTypes = convertConstantValuesToSelectOptions(feedbackSourceTypes);
  const convertedClientFeedbackTypes = convertConstantValuesToSelectOptions(clientFeedbackTypes);
  const isFeedbackResolved = feedback.status === FEEDBACK_STATUSES.RESOLVED;

  useEffect(() => {
    setFeedbackFormData({
      interestedUser: feedback.interestedUser,
      source: feedback.source,
      feedback: feedback.feedback,
      note: feedback.note,
      resolveNote: feedback.resolveNote || '',
      resolvedUser: feedback.resolvedUser,
    });
  }, [feedback]);

  useEffect(() => {
    form.setFieldsValue(feedbackFormData);
  }, [form, feedbackFormData]);

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = values => {
    const data = {
      ...values,
      feedbackId: feedback._id,
      clientId,
    };
    dispatch(Creators.resolveClientFeedbackRequest({ data }));
    handleCancel();
  };

  const getFooterActions = () => {
    if (isFeedbackResolved) {
      return [];
    }

    return [
      <Button key="CLIENT_DETAIL_UPDATE_FEEDBACK_MODAL_FOOTER_ACTIONS_BUTTON_BACK" onClick={handleCancel}>
        {t('button:CANCEL')}
      </Button>,
      <Button
        key="CLIENT_DETAIL_UPDATE_FEEDBACK_MODAL_FOOTER_ACTIONS_BUTTON_SUBMIT"
        type="primary"
        form="update-client-feedback"
        htmlType="submit"
        disabled={!feedbackFormData.resolveNote}
      >
        {t('button:SAVE')}
      </Button>,
    ];
  };

  return (
    <Modal
      title={t('FEEDBACKS.MODAL.UPDATE_CLIENT_FEEDBACK')}
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={getFooterActions()}
    >
      <Form
        className={classes.resetFormItemMargin}
        form={form}
        id="update-client-feedback"
        onFinish={handleSubmit}
        colon={false}
        initialValues={feedbackFormData}
        labelCol={{ span: 10 }}
        labelAlign="left"
      >
        <Row gutter={[16, 16]}>
          <Col>
            {t('FEEDBACKS.MODAL.INTERESTED_USER')}
          </Col>
          <Col>
            {feedbackFormData.interestedUser?.name}
          </Col>
        </Row>
        <Divider />
        <Row gutter={[8, 16]}>
          {
            convertedFeedbackSourceTypes.map(source => (
              <Col xs={8} key={Math.random()}>
                <Button
                  className={[classes.sourceBtn, feedbackFormData.source === source.value ? classes.btnGreen : '']}
                  disabled
                >
                  {source.label}
                </Button>
              </Col>
            ))
          }
        </Row>
        <Divider />
        <Row gutter={[16, 16]}>
          {
            convertedClientFeedbackTypes.map(feedbackType => (
              <Col xs={6} key={Math.random()}>
                <Button
                  className={[classes.feedbackBtn, feedbackFormData.feedback === feedbackType.value ? classes.btnGreen : '']}
                  disabled
                >
                  {feedbackType.label}
                </Button>
              </Col>
            ))
          }
        </Row>
        <Divider />
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item label={t('FEEDBACKS.MODAL.NOTE')}>
              <AntTextArea
                value={feedbackFormData.note}
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item
              label={t('FEEDBACKS.MODAL.RESOLVE_NOTE')}
              name="resolveNote"
            >
              <AntTextArea
                value={feedbackFormData.resolveNote}
                onChange={event => {
                  const value = _.get(event, 'target.value', '');
                  setFeedbackFormData({
                    ...feedbackFormData,
                    resolveNote: value,
                  });
                }}
                disabled={isFeedbackResolved}
              />
            </Form.Item>
          </Col>
        </Row>
        {
          isFeedbackResolved && (
            <>
              <Divider />
              <Row gutter={[16, 16]}>
                <Col>
                  {t('FEEDBACKS.MODAL.RESOLVED_USER')}
                </Col>
                <Col>
                  {feedbackFormData.resolvedUser?.name}
                </Col>
              </Row>
            </>
          )
        }
      </Form>
    </Modal>
  );
};

export default UpdateFeedbackModal;
