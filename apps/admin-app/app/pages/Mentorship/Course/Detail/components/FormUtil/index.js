import { useEffect } from 'react';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Row, Col, Form, Typography, Divider } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { LoginOutlined } from '@ant-design/icons';

import SelectLanguage from '@app/pages/Mentorship/components/Select/Language';
import SelectTopic from '@app/pages/Mentorship/components/Select/Topic';
import { INITIAL_VALUES } from './formHelper';
import { Button, Space, TextArea, TextInput, Image, RedirectButton } from '@shared/components/GUI';
import useRequestMentorshipModal from '@app/pages/Mentorship/components/RequestMentorshipModal/useRequestMentorshipModal';
import { MENTORSHIP_REQUEST_STATUSES, MENTORSHIP_REQUEST_STATUSES_TAG_COLORS, MENTORSHIP_REQUEST_STATUS_ICONS } from '@app/pages/Mentorship/constants';
import { ROUTE } from '@app/routes';
import history from '@shared/utils/history';
import permKey from '@shared/shared/permKey.json';

const { Item } = Form;

const FormUtil = ({ initialValues = INITIAL_VALUES, isPending, userNotExists, mentorshipRequest, requestStatus, showRequestMentorshipButton }) => {
  const [form] = useForm();
  const { t } = useTranslation(['mentorshipPage', 'global']);
  const { renderRequestMentorshipModal, handleRequestMentorshipBtnClick } = useRequestMentorshipModal();

  const handleSubmit = () => {
    if (userNotExists) {
      history.push(ROUTE.MENTORSHIP_PROFILE.path);
    }
    else {
      handleRequestMentorshipBtnClick({ request: initialValues });
    }
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  const renderRequestMentorshipButton = (
    <Button
      data-testid="request-mentorship"
      type="primary"
      htmlType="submit"
      icon={<LoginOutlined />}
    >{t('REQUEST_MENTORSHIP')}
    </Button>
  );

  const renderRequestStatusButton = status => {
    if (status === MENTORSHIP_REQUEST_STATUSES.ACCEPTED) {
      return (
        <RedirectButton
          color="secondary"
          icon={MENTORSHIP_REQUEST_STATUS_ICONS[status]}
          to={ROUTE.MENTORSHIP_PROGRESS.path.replace(':id', mentorshipRequest?._id)}
          text={t('SEE_MATCH_DETAILS')}
          permKey={permKey.PAGE_MENTORSHIP_MENTOR_DETAIL}
        />
      );
    }
    if (status === MENTORSHIP_REQUEST_STATUSES.PENDING) {
      return (
        <RedirectButton
          data-testid={`mentorship-${status}`}
          color={MENTORSHIP_REQUEST_STATUSES_TAG_COLORS[status]}
          icon={MENTORSHIP_REQUEST_STATUS_ICONS[status]}
          to={`${ROUTE.MENTORSHIP_PROFILE.path}?scrollToTab=requests&requestStatusFilter=${status}`}
          text={t(`MENTORSHIP_REQUEST_STATUSES.${status}`)}
          permKey={permKey.PAGE_MENTORSHIP_PROFILE}
        />
      );
    }

    return renderRequestMentorshipButton;
  };

  return (
    <Space title={t('MENTORSHIP_DETAILS')}>
      <>
        <Form
          form={form}
          initialValues={initialValues}
          id="mentorshipCourseDetailForm"
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Row gutter={[8, 8]}>
            <Col xs={{ span: 24 }}>
              <Item name="detailsOfExperience">
                <TextArea label={t('DETAILS_OF_EXPERIENCE')} disabled />
              </Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col lg={{ span: 6 }} xs={{ span: 24 }}>
              <Item name="languages">
                <SelectLanguage label={t('LANGUAGES')} disabled />
              </Item>
            </Col>
            <Col lg={{ span: 6 }} xs={{ span: 24 }}>
              <Item name="topic">
                <SelectTopic label={t('TOPIC')} disabled />
              </Item>
            </Col>
            <Col lg={{ span: 6 }} xs={{ span: 24 }}>
              <Item name="yearsOfExperience">
                <TextInput label={t('YEARS_OF_EXPERIENCE')} disabled />
              </Item>
            </Col>
          </Row>
          <Divider orientation="left" />
          {!isPending && (
          <Row gutter={[8, 8]} align="middle" justify="space-between">
            <Col>
              <Row gutter={[8, 8]} align="middle">
                <Col>
                  <div className="rounded-lg overflow-hidden">
                    <Image src={initialValues?.mentor?.picURL} width={60} height={60} preview={false} disabled />
                  </div>
                </Col>
                <Col>
                  <Typography.Title level={5} className="m-0">{get(initialValues, ['mentor', 'employeeId', 'fullName'])}</Typography.Title>
                  <Typography.Text>{get(initialValues, ['mentor', 'employeeId', 'workEmail'])}</Typography.Text>
                </Col>
              </Row>
            </Col>
            <Col>
              {requestStatus ? renderRequestStatusButton(requestStatus) : null}
              {!requestStatus && showRequestMentorshipButton ? renderRequestMentorshipButton : null}
            </Col>
          </Row>
          )}
        </Form>
        {showRequestMentorshipButton && renderRequestMentorshipModal}
      </>
    </Space>
  );
};

export default FormUtil;
