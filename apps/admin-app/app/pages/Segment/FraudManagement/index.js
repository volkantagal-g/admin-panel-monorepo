import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';

import { Button, Col, Form, Row, Select } from 'antd';

import { useTranslation } from 'react-i18next';

import { get } from 'lodash';

import { ADMIN_PANEL_CONFIGS, MARKET_CONFIG_QUERY_TYPES, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from '@app/pages/Segment/FraudManagement/redux/saga';
import reducer from '@app/pages/Segment/FraudManagement/redux/reducer';
import { Creators } from '@app/pages/Segment/FraudManagement/redux/actions';

import { usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import AntSelectWithCsvImport from '@shared/components/AntSelectWithCsvImport';
import { getUser } from '@shared/redux/selectors/auth';
import { segmentOptionSelector, segmentSelector } from '@app/pages/Segment/FraudManagement/redux/selectors';

export const getSegmentOptions = segments => {
  return segments?.map(segmentId => ({
    value: segmentId,
    label: segmentId,
  }));
};

const FraudManagementPage = () => {
  usePageViewAnalytics({ name: ROUTE.SEGMENT_FRAUD_MANAGEMENT.name, squad: ROUTE.SEGMENT_FRAUD_MANAGEMENT.squad });

  const { t } = useTranslation('segment');
  const user = getUser();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const segmentOptionsPending = useSelector(segmentOptionSelector.getIsPending);
  const configKeyDataValue = useSelector(segmentOptionSelector.getData);
  const segmentOptions = get(configKeyDataValue, 'value', []);

  const segmentIsPending = useSelector(segmentSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(Creators.getSegmentOptionsRequest(
      {
        body: {
          key: ADMIN_PANEL_CONFIGS.FRAUD_SEGMENT_OPTIONS,
          type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
        },
      },
    ));

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  return (
    <div className="bg-white">
      <Form
        form={form}
        preserve
        id="send-segment-list-form"
      >
        <div className="p-5">
          <Row gutter={24}>
            <Col lg={24} className="mb-4">
              <h4>{t('FRAUD_SEGMENT_MANAGEMENT')}</h4>
            </Col>

            <Col lg={24}>
              <Row gutter={24}>
                <Col lg={4}>
                  <Form.Item name="segmentId" className="inline" rule={[{ required: true, message: t('error:REQUIRED') }]}>
                    <Select
                      placeholder="Segment Ids"
                      options={getSegmentOptions(segmentOptions)}
                      disabled={segmentOptionsPending || segmentIsPending}
                      loading={segmentOptionsPending}
                    />
                  </Form.Item>
                </Col>
                <Col lg={8}>
                  <AntSelectWithCsvImport
                    selectWrapperProps={{ md: 24, xs: 24 }}
                    importWrapperProps={{ md: 24, xs: 24 }}
                    maxTagTextLength={15}
                    checkIsValidObjectId={false}
                    placeholder={t('ADD_CLIENT_IDS')}
                    maxTagCount={25}
                    tokenSeparators={[',']}
                    mode="tags"
                    rule={[{ required: true, message: t('error:REQUIRED'), type: 'array' }]}
                    disabled={segmentIsPending}
                    loading={false}
                    name="clientIds"
                    btnLabel={t('CSV_UPLOAD')}
                    pairValueOptions={false}
                    form={form}
                  />

                </Col>
                <Col lg={12}>
                  <Button
                    disabled={segmentIsPending}
                    className="mx-4"
                    onClick={
                      () => {
                        form.validateFields(['segmentId', 'clientIds'])
                          .then(() => {
                            dispatch(Creators.addClientsToSegmentRequest({
                              segmentId: form.getFieldValue('segmentId'),
                              clientIds: form.getFieldValue('clientIds'),
                              email: user.email,
                              onSuccess: () => {
                                form.resetFields();
                              },
                            }));
                          })
                          .catch(() => {});
                      }
                    }
                  >{t('ADD_CLIENTS_TO_SEGMENT')}
                  </Button>
                  <Button
                    disabled={segmentIsPending}
                    className="mx-4"
                    onClick={
                      () => {
                        dispatch(Creators.removeClientsFromSegmentRequest({
                          segmentId: form.getFieldValue('segmentId'),
                          clientIds: form.getFieldValue('clientIds'),
                          email: user.email,
                          onSuccess: () => {
                            form.resetFields();
                          },
                        }));
                      }
                    }
                  >{t('REMOVE_CLIENTS_FROM_SEGMENT')}
                  </Button>
                </Col>
              </Row>

            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

const reduxKey = REDUX_KEY.SEGMENT.FRAUD_MANAGEMENT;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(FraudManagementPage);
