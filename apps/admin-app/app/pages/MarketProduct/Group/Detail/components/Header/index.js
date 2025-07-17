import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Row, Col, Button, Modal, Switch } from 'antd';
import { useTranslation } from 'react-i18next';

import { Creators } from '@app/pages/MarketProduct/Group/Detail/redux/actions';
import {
  getMarketProductGroupSelector,
  getProductsOfProductGroupSelector,
  updateMarketProductGroupSelector,
} from '@app/pages/MarketProduct/Group/Detail/redux/selectors';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { PRODUCT_GROUP_TYPE } from '../../../../constants';

const Header = () => {
  const [modal, modalContext] = Modal.useModal();
  const marketProductGroup = useSelector(getMarketProductGroupSelector.getData);
  const isUpdatePending = useSelector(updateMarketProductGroupSelector.getIsPending);
  const data = useSelector(getProductsOfProductGroupSelector.getData);
  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductGroupPage');

  const handleActivenessChange = () => {
    if (
      !marketProductGroup.activeness
      && marketProductGroup.type === PRODUCT_GROUP_TYPE.MANUAL
      && !data.length
    ) {
      const modalConfig = {
        content: (
          <>
            {t('ACTIVATION_VALIDATION_ERROR_TEXT')}
          </>
        ),
        icon: null,
        okText: t('OK'),
        okCancel: false,
        centered: true,
      };
      modal.confirm(modalConfig);
      return;
    }

    dispatch(
      Creators.updateMarketProductGroupRequest({
        id: marketProductGroup._id,
        body: { activeness: !marketProductGroup.activeness },
      }),
    );
  };

  const handleCopy = () => {
    const modalConfig = {
      content: (
        <>
          {t('COPY_PRODUCT_GROUP_CONFIRMATION_TEXT')}
        </>
      ),
      icon: null,
      okText: t('COPY'),
      cancelText: t('button:CANCEL'),
      onOk: () => {
        dispatch(Creators.copyMarketProductGroupRequest({ id: marketProductGroup?._id }));
      },
      centered: true,
    };
    modal.confirm(modalConfig);
  };

  const isCountryGroup = getSelectedCountry()?._id === marketProductGroup?.country;

  return (
    <>
      <Row>
        <Col flex={1} key="1">
          <PageHeader
            className="p-0 page-title"
            title={t('global:PAGE_TITLE.MARKET_PRODUCT_GROUP.DETAIL')}
          />
        </Col>
        {isCountryGroup && marketProductGroup?._id && (
          <Fragment key="2">
            <Col>
              <Button
                onClick={handleCopy}
                className="mr-2"
              >
                {t('COPY')}
              </Button>
            </Col>
            <Col className="pt-1">
              <Switch
                disabled={isUpdatePending}
                checked={marketProductGroup?.activeness}
                checkedChildren={t('global:ACTIVE')}
                unCheckedChildren={t('global:INACTIVE')}
                className={
                  marketProductGroup?.activeness
                    ? 'bg-success'
                    : 'bg-danger'
                }
                onChange={handleActivenessChange}
              />
            </Col>
          </Fragment>
        )}
      </Row>
      {modalContext}
    </>
  );
};

export default Header;
