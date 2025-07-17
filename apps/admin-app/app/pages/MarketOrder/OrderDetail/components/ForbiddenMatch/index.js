import { Form, Modal, Space as AntSpace } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { Creators } from '../../redux/actions';
import { orderDetailSelector } from '../../redux/selectors';
import { Collapse, TextArea, Button } from '@shared/components/GUI';

const ForbiddenMatch = () => {
  const [modal, confirmationModalContext] = Modal.useModal();

  const dispatch = useDispatch();
  const { t } = useTranslation('marketOrderPage');
  const [form] = Form.useForm();

  const orderDetail = useSelector(orderDetailSelector.getData);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { forbiddenMatch: '' },
    onSubmit: () => {
      confirmSave();
    },
  });

  const { handleSubmit, values, setFieldValue } = formik;

  function confirmSave() {
    const modalConfig = {
      content: <>{t('CONFIRM_MESSAGE')}</>,
      icon: null,
      okText: t('button:SAVE'),
      cancelText: t('button:CANCEL'),
      onOk: () => {
        const body = {
          client: orderDetail?.client?.client?._id,
          description: values.forbiddenMatch,
          person: orderDetail?.courier.courier?.person,
        };
        dispatch(Creators.createForbiddenMatchRequest({ body }));
        setFieldValue('forbiddenMatch', '');
        form.setFieldsValue({ forbiddenMatch: '' });
      },
      centered: true,
    };
    modal.confirm(modalConfig);
  }

  return (
    <Collapse
      expandIconPosition="right"
      title={t('FORBIDDEN_MATCH')}
    >
      <TextArea
        value={values.forbiddenMatch}
        onChange={event => {
          setFieldValue('forbiddenMatch', event.target.value);
        }}
        name="forbiddenMatch"
        hasForm
      />
      <AntSpace className="w-100" direction="vertical" align="end">
        <Button
          size="extra-small"
          type="primary"
          onClick={handleSubmit}
          disabled={!values.forbiddenMatch}
        >
          {t('button:SAVE')}
        </Button>
      </AntSpace>
      {confirmationModalContext}
    </Collapse>
  );
};

export default ForbiddenMatch;
