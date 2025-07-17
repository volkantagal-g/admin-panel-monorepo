import { Button, Form, Modal, Popconfirm, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { Action } from 'redux';

import { useCopyPromoStyles } from './styles';
import { SelectPromo } from '@shared/containers/Select/Promo';
import { PromoDetailSlice } from '@app/pages/Promo/Detail/redux/slice';
import { useInitAndDestroyPage } from '@shared/hooks';

export type OverwriteFormType = { promoId: MongoIDType }

type PropTypes = {
  title?: string,
  onSubmit: (values: OverwriteFormType) => void,
  isRounded?: boolean,
  isPending?: boolean,
  isModalOpen: any,
  toggleModal: () => void
  creators: {
    initPage: () => Action,
    destroyPage: () => Action
  }
  slice: string
}

export function OverwriteModal({ title, onSubmit, isRounded = false, isPending, isModalOpen, toggleModal, creators, slice }: PropTypes) {
  const dispatch = useDispatch();
  const classes = useCopyPromoStyles();
  const { t } = useTranslation('promoPage');
  const promoId = useSelector(PromoDetailSlice.selectors.promoId);
  const isParent = useSelector(PromoDetailSlice.selectors.isParent);
  const [form] = Form.useForm();

  const handleFormSubmit = () => {
    toggleModal();
    form.submit();
  };

  useInitAndDestroyPage({ dispatch, Creators: creators });

  return (
    <>
      <Modal
        centered
        title={title}
        visible={isModalOpen}
        onCancel={toggleModal}
        bodyStyle={{ maxHeight: 500, overflow: 'scroll' }}
        footer={[
          <Popconfirm
            key="confirm"
            title={t('global:COMMON_CONFIRM_TEXT')}
            okText={t('OK')}
            cancelText={t('CANCEL')}
            onConfirm={handleFormSubmit}
          >
            <Button
              type="primary"
              loading={false}
            >
              {t('button:APPLY')}
            </Button>
          </Popconfirm>,
          <Button key="cancel" onClick={toggleModal} className="ml-2">
            {t('button:CANCEL')}
          </Button>,
        ]}
      >
        <Form<OverwriteFormType>
          form={form}
          layout="vertical"
          onFinish={onSubmit}
        >
          <Form.Item<OverwriteFormType>
            name="promoId"
            label={t('global:PROMO')}
            rules={[{ required: true }]}
          >
            <SelectPromo
              slice={`overwrite-modal-${slice}`}
              placeholder={t('SEARCH_PROMO')}
              allowClear
              disabled={isPending}
              className="w-100"
              excludedOptions={[promoId]}
              loading={isPending}
              showIds
              isParentPromo={isParent}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Button
        size="small"
        onClick={toggleModal}
        type="primary"
        className={isRounded ? classes.copyButton : undefined}
      >
        {t('global:OVERWRITE')}
      </Button>
    </>
  );
}
