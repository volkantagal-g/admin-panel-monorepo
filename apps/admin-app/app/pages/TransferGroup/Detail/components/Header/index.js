import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Row, Col, Button, Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import { getTransferGroupByIdSelector, inactivateTransferGroupSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { TRANSFER_GROUP_STATUS } from '@shared/shared/constants';

const Header = () => {
  const dispatch = useDispatch();
  const transferGroup = useSelector(getTransferGroupByIdSelector.getData) || {};
  const isPending = useSelector(inactivateTransferGroupSelector.getIsPending);
  const [modal, confirmationModalContext] = Modal.useModal();
  const { t } = useTranslation('transferGroupPage');

  const inactivateTransferGroup = () => {
    const modalConfig = {
      content: (
        <>
          {t('INACTIVATE_MESSAGE')}
        </>
      ),
      icon: null,
      okText: t('button:INACTIVATE'),
      cancelText: t('button:CANCEL'),
      onOk: () => {
        dispatch(Creators.inactivateTransferGroupRequest({ transferGroup: transferGroup._id }));
      },
      centered: true,
    };
    modal.confirm(modalConfig);
  };

  return (
    <>
      <Row>
        <Col flex={1}>
          <PageHeader
            className="p-0 page-title"
            title={t('global:PAGE_TITLE.TRANSFER_GROUP.DETAIL')}
          />
        </Col>
        {transferGroup.status === TRANSFER_GROUP_STATUS.ACTIVE && (
          <Col>
            <Button type="danger" onClick={inactivateTransferGroup} loading={isPending}>
              {t('button:INACTIVATE')}
            </Button>
          </Col>
        )}
      </Row>
      {confirmationModalContext}
    </>
  );
};

export default Header;
