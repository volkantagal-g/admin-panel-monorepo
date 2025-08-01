import { Button, Col, Form, Input, Modal, Popconfirm, Row, Tooltip, Typography } from 'antd';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { QuestionCircleOutlined } from '@ant-design/icons';

import AntSelect from '@shared/components/UI/AntSelect';
import MultiLanguageInput from '@shared/components/UI/MultiLanguage/Input';
import {
  ALREADY_EXISTS_ERROR_CODE,
  DOCUMENTATION_LINK,
  ERROR_TIMEOUT_MS,
  PROMO_BADGE_VARIABLE,
} from '@app/pages/Promo/constantValues';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { getSelectFilterOption } from '@shared/utils/common';
import { validate } from '@shared/yup';
import { PromoBadge } from '../../../interfaces';
import { Creators } from '../../../redux/actions';
import { badgeErrorSelector, managePromoBadgeSelector } from '../../../redux/selectors';
import {
  getInitialValues,
  getModifiedValuesBeforeSubmit,
  getPromoMechanicOptions,
  validationSchema,
} from './formHelper';

import useStyles from './styles';

type ManageModalFormProps = {
  promoBadge: PromoBadge | null;
  onClose: () => void;
  isModalVisible: boolean;
}

const ManageModalForm: FC<ManageModalFormProps> = ({ promoBadge, isModalVisible, onClose }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('promoBadgesPage');
  const isPending = useSelector(managePromoBadgeSelector.getIsPending);
  const badgeError = useSelector(badgeErrorSelector.getError);
  const [form] = Form.useForm();
  const isEditing = !!promoBadge?._id;
  const classes = useStyles();

  const handleDelete = () => {
    dispatch(Creators.deletePromoBadgeRequest({ id: promoBadge?._id }));
    onClose();
  };

  const formik = useFormik({
    validateOnChange: true,
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: getInitialValues(promoBadge),
    onSubmit: (values, helpers) => {
      const body = getModifiedValuesBeforeSubmit(values);
      dispatch(Creators.managePromoBadgeRequest({ body }));
      helpers.resetForm();
      form.resetFields();
      onClose();
    },
  });

  const handleClose = () => {
    formik.resetForm();
    form.resetFields();
    onClose();
  };

  const { handleSubmit, handleBlur, values, errors, touched, setFieldValue } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  useEffect(() => {
    if (badgeError?.response?.data?.message?.includes(ALREADY_EXISTS_ERROR_CODE)) {
      dispatch(
        ToastCreators.error({
          message: t('TOAST.ALREADY_EXISTS'),
          toastOptions: { autoClose: ERROR_TIMEOUT_MS },
        }),
      );
    }
  }, [badgeError, dispatch, t]);

  const getHelpMessage = (field: keyof PromoBadge) => {
    return (get(touched, field) && get(errors, field))
      ? get(errors, field)
      : '';
  };

  return (
    <Modal
      centered
      title={!promoBadge ? t('CREATE.TITLE') : t('UPDATE.TITLE')}
      visible={isModalVisible}
      onCancel={handleClose}
      width={900}
      footer={[
        <Popconfirm
          title={t('UPDATE.DELETE_CONFIRMATION')}
          okText={t('OK')}
          cancelText={t('CANCEL')}
          onConfirm={handleDelete}
          key="addRoleModalConfirmButtonPopConfirm"
          disabled={!promoBadge}
        >
          <Button
            key="delete"
            danger
            disabled={!promoBadge}
            className={!promoBadge ? 'mr-2' : ''}
          >
            {t('button:DELETE')}
          </Button>
        </Popconfirm>,
        <Button key="back" onClick={handleClose}>
          {t('button:CANCEL')}
        </Button>,
        <Button
          key="submit"
          type="primary"
          form="manage-promo-badge"
          htmlType="submit"
          loading={isPending}
        >
          {!promoBadge ? t('button:CREATE') : t('button:UPDATE')}
        </Button>,
      ]}
    >
      <Form
        form={form}
        id="manage-promo-badge"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row>
          <Col span={24}>
            <Form.Item
              help={getHelpMessage('name')}
              validateStatus={getHelpMessage('name') ? 'error' : 'success'}
              name="name"
              label={t('HEADER.NAME')}
            >
              <Input
                value={values.name}
                onChange={e => setFieldValue('name', e.target.value)}
                onBlur={handleBlur}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              help={getHelpMessage('promoMechanic')}
              validateStatus={
                getHelpMessage('promoMechanic') ? 'error' : 'success'
              }
              name="promoMechanic"
              label={t('LIST.PROMO_MECHANIC')}
            >
              <AntSelect
                value={values.promoMechanic}
                options={getPromoMechanicOptions()}
                onChange={(promoMechanic: number) => {
                  setFieldValue('promoMechanic', promoMechanic);
                }}
                autoComplete="off"
                showSearch
                filterOption={getSelectFilterOption}
                disabled={isEditing}
                onBlur={handleBlur}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} className="mb-3">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Typography.Text
                copyable={{ text: PROMO_BADGE_VARIABLE.REQUIRED_PRODUCT_COUNT }}
                strong
                className={classes.alternateBadge}
              >
                {PROMO_BADGE_VARIABLE.REQUIRED_PRODUCT_COUNT}{' '}
                <Tooltip
                  title={t('TOOLTIP.REQUIRED_PRODUCT_COUNT')}
                  color="black"
                >
                  <QuestionCircleOutlined />
                </Tooltip>
              </Typography.Text>
              <Typography.Text
                copyable={{ text: PROMO_BADGE_VARIABLE.REQUIRED_PRODUCT_AMOUNT }}
                strong
                className={classes.defaultBadge}
              >
                {PROMO_BADGE_VARIABLE.REQUIRED_PRODUCT_AMOUNT}{' '}
                <Tooltip title={t('TOOLTIP.REQUIRED_PRODUCT_AMOUNT')}>
                  <QuestionCircleOutlined />
                </Tooltip>
              </Typography.Text>
              <Typography.Text
                copyable={{ text: PROMO_BADGE_VARIABLE.MAX_ITEM_COUNT }}
                strong
                className={classes.defaultBadge}
              >
                {PROMO_BADGE_VARIABLE.MAX_ITEM_COUNT}{' '}
                <Tooltip title={t('TOOLTIP.MAX_ITEM_COUNT')}>
                  <QuestionCircleOutlined />
                </Tooltip>
              </Typography.Text>
              <Typography.Text
                copyable={{ text: PROMO_BADGE_VARIABLE.DISCOUNT_AMOUNT }}
                strong
                className={classes.defaultBadge}
              >
                {PROMO_BADGE_VARIABLE.DISCOUNT_AMOUNT}{' '}
                <Tooltip title={t('TOOLTIP.DISCOUNT_AMOUNT')}>
                  <QuestionCircleOutlined />
                </Tooltip>
              </Typography.Text>
              <Typography.Text
                copyable={{ text: PROMO_BADGE_VARIABLE.DISCOUNTED_PRICE }}
                strong
                className={classes.defaultBadge}
              >
                {PROMO_BADGE_VARIABLE.DISCOUNTED_PRICE}{' '}
                <Tooltip title={t('TOOLTIP.DISCOUNTED_PRICE')}>
                  <QuestionCircleOutlined />
                </Tooltip>
              </Typography.Text>
              <Typography.Text
                copyable={{ text: PROMO_BADGE_VARIABLE.MIN_REQUIRED_ITEM_COUNT }}
                strong
                className={classes.defaultBadge}
              >
                {PROMO_BADGE_VARIABLE.MIN_REQUIRED_ITEM_COUNT}{' '}
                <Tooltip title={t('TOOLTIP.MIN_REQUIRED_ITEM_COUNT')}>
                  <QuestionCircleOutlined />
                </Tooltip>
              </Typography.Text>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24} className="mb-3">
            {t('DOCUMENTATION.TEXT')}{' '}
            <a href={DOCUMENTATION_LINK.PROMO_BADGE_VARIABLES}>
              {t('DOCUMENTATION.LINK_TEXT')}
            </a>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              tooltip={t('TOOLTIP.PRODUCT_LISTING_PAGE_BADGE')}
              label={t('HEADER.PRODUCT_LISTING_PAGE_BADGE')}
              className="mb-0"
            >
              <MultiLanguageInput
                fieldPath={['productListingPage']}
                formik={formik}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              tooltip={t('TOOLTIP.PRODUCT_DETAIL_PAGE_BADGE')}
              label={t('HEADER.PRODUCT_DETAIL_PAGE_BADGE')}
              className="mb-0"
            >
              <MultiLanguageInput
                fieldPath={['productDetailPage']}
                formik={formik}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              tooltip={t('TOOLTIP.BASKET_NOT_APPLIED_BADGE')}
              label={t('HEADER.BASKET_NOT_APPLIED_BADGE')}
              className="mb-0"
            >
              <MultiLanguageInput
                fieldPath={['basketNotApplied']}
                formik={formik}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              tooltip={t('TOOLTIP.BASKET_APPLIED_BADGE')}
              label={t('HEADER.BASKET_APPLIED_BADGE')}
              className="mb-0"
            >
              <MultiLanguageInput
                fieldPath={['basketApplied']}
                formik={formik}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ManageModalForm;
