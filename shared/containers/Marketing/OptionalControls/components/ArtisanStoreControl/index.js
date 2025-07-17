import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col, Form, Card, Button, Switch } from 'antd';

import { compose } from 'redux';

import { useDispatch, useSelector } from 'react-redux';

import LocalsChainSelect from '@shared/containers/Marketing/Select/LocalsChainSelect';
import LocalsShopSelect from '@shared/containers/Marketing/Select/LocalsShopSelect';
import { REDUX_KEY } from '@shared/shared/constants';
import { Creators as LocalsShopCreators } from '@shared/containers/Marketing/Select/LocalsShopSelect/redux/actions';
import injectSaga from '@shared/utils/injectSaga';
import saga from '@shared/containers/Marketing/OptionalControls/components/ArtisanStoreControl/redux/saga';
import injectReducer from '@shared/utils/injectReducer';
import reducer from '@shared/containers/Marketing/OptionalControls/components/ArtisanStoreControl/redux/reducer';
import { Creators } from '@shared/containers/Marketing/OptionalControls/components/ArtisanStoreControl/redux/actions';
import { localsStoreControlSelector } from '@shared/containers/Marketing/OptionalControls/components/ArtisanStoreControl/redux/selectors';

const ArtisanStoreControl = ({ parentFieldName, disabled, form, chainSelection = false, storeFieldName = 'localVerticalShopIds', cardTitle }) => {
  const { t } = useTranslation('marketing');
  const controlTitle = cardTitle || t('LOCALS_STORE_CONTROL');
  const dispatch = useDispatch();

  const isPending = useSelector(localsStoreControlSelector.getIsPending || []);

  const setChainsArtisans = () => {
    dispatch(Creators.getChainsShopsRequest({
      chainId: form.getFieldValue([...parentFieldName, 'chainId']),
      onSuccess: artisans => {
        dispatch(LocalsShopCreators.setLocalShopOptions({ options: artisans }));
        form.setFields([{
          name: [...parentFieldName, storeFieldName],
          value: artisans.map(artisan => artisan._id),
        }]);
      },
    }));
  };

  useEffect(() => {
    dispatch(Creators.initContainer());
    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  return (
    <Card size="small" title={controlTitle}>
      {chainSelection && (
        <Row gutter={24} className="mt-3 mt-md-0">
          <Col md={12} xs={24}>

            <Form.Item name={[...parentFieldName, 'isChain']} label={t('CHAIN_ARTISANS')} valuePropName="checked" initialValue={false}>
              <Switch
                disabled={disabled || isPending}
                onChange={() => {
                  dispatch(LocalsShopCreators.setLocalShopOptions({ options: [] }));
                  form.setFields([{ name: [...parentFieldName, storeFieldName], value: [] }, { name: [...parentFieldName, 'chainId'], value: null }]);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      )}

      <Form.Item noStyle dependencies={[[...parentFieldName, 'isChain'], [...parentFieldName, 'chainId']]}>
        {({ getFieldValue }) => {
          const isChain = getFieldValue([...parentFieldName, 'isChain']);
          if (isChain) {
            return (
              <Row gutter={24}>
                <Col lg={12}>
                  <LocalsChainSelect
                    onChange={() => {
                      form.setFields([{ name: [...parentFieldName, storeFieldName], value: [] }]);
                    }}
                    inline
                    fieldName={[...parentFieldName, 'chainId']}
                    disabled={disabled || isPending}
                  />
                </Col>
                <Col lg={6}>
                  <Button
                    disabled={!getFieldValue([...parentFieldName, 'chainId']) || disabled || isPending}
                    onClick={() => {
                      setChainsArtisans();
                    }}
                  >{t('BRING_ALL_CHAIN_SHOPS')}
                  </Button>
                </Col>
              </Row>
            );
          }
          return null;
        }}
      </Form.Item>
      <Form.Item noStyle dependencies={[[...parentFieldName, 'isChain']]}>
        {({ getFieldValue }) => {
          const isChain = getFieldValue([...parentFieldName, 'isChain']);
          return (
            <LocalsShopSelect
              inline={false}
              afterCsvImport={csvData => {
                // Get names from imported local ids
                dispatch(LocalsShopCreators.getLocalsShopDetailsByIdArrayRequest({
                  shopIds: csvData,
                  onSuccess: (shopDetails => {
                    dispatch(LocalsShopCreators.setLocalShopOptions({ options: shopDetails }));
                  }),
                }));
              }}
              hideCsvImport={!!isChain}
              form={form}
              mode="multiple"
              fieldName={[...parentFieldName, storeFieldName]}
              disabled={disabled || isPending}
            />
          );
        }}
      </Form.Item>

    </Card>
  );
};

const reduxKey = REDUX_KEY.MARKETING.OPTIONAL_CONTROL.LOCALS_STORE_CONTROL;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ArtisanStoreControl);
