import { useTranslation } from 'react-i18next';
import { Col, Row, Skeleton, Typography, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  InfoCircleOutlined,
  LoadingOutlined,
  WarningOutlined,
} from '@ant-design/icons';

import { Creators } from '../../../redux/actions';
import { Button, TextArea, Tag, Space } from '@shared/components/GUI';
import { agentGuidanceContentSelector } from '../../../redux/selectors';
import { contentValidationSchema } from '../../Filter/formHelpers';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { validate } from '@shared/yup';

const KnowledgeContent = () => {
  const { t } = useTranslation('agentGuidancePage');
  const dispatch = useDispatch();
  const filters = useSelector(agentGuidanceContentSelector.getFilters);
  const isPending = useSelector(agentGuidanceContentSelector.getIsPending);
  const isUpdatePending = useSelector(
    agentGuidanceContentSelector.getIsUpdatePending,
  );
  const knowledgeContent = useSelector(agentGuidanceContentSelector.getData);
  const selectedType = useSelector(
    agentGuidanceContentSelector.getSelectedType,
  );
  const isAgentAssistance = useSelector(
    agentGuidanceContentSelector.isAgentAssistance,
  );

  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(() => contentValidationSchema(t)),
    initialValues: { content: '' },
    onSubmit: formValues => {
      if (!Object.values(filters).every(Boolean)) {
        dispatch(ToastCreators.error({ message: t('CONTENT_UPDATE_ERROR') }));
      }
      else {
        dispatch(
          Creators.updateAgentGuidanceContentRequest({
            data: { ...filters, content: formValues.content },
            onSuccess,
          }),
        );
        dispatch(Creators.setFilters({ filters }));
      }
    },
  });

  const handleRefresh = () => {
    dispatch(Creators.getAgentGuidanceContentRequest({ filters }));
  };

  const { values, handleSubmit, setFieldValue, errors, resetForm } = formik;

  const handleContentUpdateSuccess = () => {
    Modal.success({
      content: t('KNOWLEDGE.UPDATE_FEEDBACK_MESSAGE'),
      okText: t('global:OK'),
      centered: true,
    });
  };

  function onSuccess() {
    resetForm(false);
    handleContentUpdateSuccess();
  }

  const hasKnowledgeContent = !!knowledgeContent;
  const isKnowledgeContentType = filters?.type === 'knowledge';
  return (
    <Row gutter={[16, 16]} style={{ minHeight: '200px' }}>
      <Col span={24}>
        {!isAgentAssistance ? (
          <>
            <Space>
              {isPending ? (
                <Skeleton active />
              ) : (
                <div className="py-3">
                  {hasKnowledgeContent ? (
                    <Typography.Text className="py-2">
                      {knowledgeContent}
                    </Typography.Text>
                  ) : (
                    <Tag
                      icon={<InfoCircleOutlined />}
                      color="secondary"
                      side="medium"
                    >
                      { isKnowledgeContentType
                        ? t('NO_KNOWLEDGE_CONTENT_PLACEHOLDER')
                        : t('NO_LLM_CONTENT_PLACEHOLDER')}
                    </Tag>
                  )}
                </div>
              )}
            </Space>
            {!isKnowledgeContentType && !hasKnowledgeContent ? null : (
              <TextArea
                label={
                  isKnowledgeContentType
                    ? t('KNOWLEDGE.KNOWLEDGE_PLACEHOLDER')
                    : t('KNOWLEDGE.LLM_CONTENT_PLACEHOLDER')
                }
                name="content"
                value={values.content}
                onChange={({ target }) => setFieldValue('content', target.value)}
                hasForm
                autoSize
                errors={errors}
              />
            )}
            <Row justify="center" gutter={[8, 8]} style={{ gap: 10 }}>
              <Button
                icon={isUpdatePending && <LoadingOutlined />}
                size="small"
                disabled={isUpdatePending}
                onClick={handleSubmit}
                style={{ display: !isKnowledgeContentType && !hasKnowledgeContent ? 'none' : 'block' }}
              >
                {hasKnowledgeContent
                  ? t('global:UPDATE')
                  : `${t('global:ADD')} ${selectedType}`}
              </Button>

              {hasKnowledgeContent && (
                <Button
                  color="secondary"
                  size="small"
                  onClick={handleRefresh}
                  disabled={isPending}
                >
                  {t('REFRESH')}
                </Button>
              )}
            </Row>
          </>
        ) : (
          <Space>
            <Tag icon={<WarningOutlined />} color="warning" side="medium">
              {t('AGENT_ASSISTANCE_DISABLED')}
            </Tag>
          </Space>
        )}
      </Col>
    </Row>
  );
};

export default KnowledgeContent;
