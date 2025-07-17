import { Alert, Col, Row } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, TextEditor } from '@shared/components/GUI';
import { Creators } from '../../redux/actions';
import { completeTestSelector } from '../../redux/selectors';

const CompleteModal = ({
  showCompleteModal,
  setShowCompleteModal,
  completeForm,
  setCompleteForm,
  classes,
  testId,
  setIsFormEditable,
}) => {
  const { t } = useTranslation('abTestingV2Page');
  const dispatch = useDispatch();

  const isCompletePending = useSelector(completeTestSelector.getIsPending);

  const handleOk = () => {
    if (
      completeForm &&
      Object.values(completeForm).every(text => text !== '' && text)
    ) {
      setShowCompleteModal(false);
      setIsFormEditable(false);
      dispatch(
        Creators.completeABTestRequest({ requestData: { ...completeForm, testId } }),
      );
    }
  };

  return (
    <Modal
      title={t('COMPLETE')}
      visible={showCompleteModal}
      closable
      onOk={handleOk}
      confirmLoading={isCompletePending}
      okButtonProps={{
        disabled: Object.values(completeForm).some(
          text => text === '' || !text,
        ),
      }}
      onCancel={() => setShowCompleteModal(false)}
      centered={false}
      width={800}
    >
      <Alert
        message={<Trans>{t('CONCLUSION_DESCRIPTION')}</Trans>}
        type="warning"
        showIcon
        className={classes.conclusionDescriptionAlert}
      />
      <Row className={classes.completeEditorWrapper}>
        <Col className={classes.completeEditor}>
          <TextEditor
            value={completeForm.observations || null}
            onChange={htmlValue => {
              setCompleteForm({ ...completeForm, observations: htmlValue });
            }}
            autoComplete="off"
            label={t('OBSERVATIONS')}
          />
        </Col>
        <Col className={classes.completeEditor}>
          <TextEditor
            value={completeForm.conclusion || null}
            onChange={htmlValue => {
              setCompleteForm({ ...completeForm, conclusion: htmlValue });
            }}
            autoComplete="off"
            label={t('CONCLUSION')}
          />
        </Col>
        <Col className={classes.completeEditor}>
          <TextEditor
            value={completeForm.insights}
            onChange={htmlValue => {
              setCompleteForm({ ...completeForm, insights: htmlValue });
            }}
            autoComplete="off"
            label={t('INSIGHTS')}
          />
        </Col>
      </Row>
    </Modal>
  );
};
export default CompleteModal;
