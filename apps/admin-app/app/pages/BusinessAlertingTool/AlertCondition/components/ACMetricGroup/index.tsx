import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';
import { Col, Form, Row, Select } from 'antd';
import { DatabaseOutlined, InfoCircleOutlined } from '@ant-design/icons';

import { getLangKey } from '@shared/i18n';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { REDUX_KEY } from '@shared/shared/constants';

// Redux
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { filterMetricGroupsSelector, getMetricGroupSelector } from './redux/selectors';

import { getMetricGroupsOptions } from './utils';
import useStyles from './styles';

const reduxKey = REDUX_KEY.BUSINESS_ALERTING_TOOL.METRIC_GROUP.COMPONENTS.SELECT;

function ACMetricGroup({ formik, isFormEditable = true }: { formik: any, isFormEditable: boolean | undefined }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation(['batAlertConditionCommon']);

  const { setFieldValue, values } = formik;

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  const metricGroups = useSelector(filterMetricGroupsSelector.getData);
  const metricGroupsIsPending = useSelector(filterMetricGroupsSelector.getIsPending);
  const selectedMetricGroup = useSelector(getMetricGroupSelector.getData);

  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(Creators.filterPermittedMetricGroupsRequest({ limit: 50, offset: 0, fields: 'name' }));

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  useEffect(() => {
    if (values?.metricGroup) {
      dispatch(Creators.getMetricGroupRequest({ metricGroupId: values.metricGroup }));
    }
  }, [dispatch, values.metricGroup]);

  const metricGroupsOptions = useMemo(
    () => getMetricGroupsOptions(metricGroups),
    [metricGroups],
  );

  return (
    <Row>
      <Col xs={24} md={12}>
        <div className={classes.metricGroupContainer}>
          <div className={classes.iconContainer}>
            <DatabaseOutlined />
          </div>
          <div className={classes.contentContainer}>
            <Form.Item
              name={['metricGroup']}
              rules={[{ required: true, message: t('error:REQUIRED') }]}
            >
              <Select
                disabled={metricGroupsIsPending || !isFormEditable}
                placeholder={t('batAlertConditionCommon:METRIC_GROUP')}
                options={metricGroupsOptions}
                onChange={handleMetricGroupOnChange}
                optionFilterProp="label"
                showSearch
              />
            </Form.Item>
            {!isEmpty(selectedMetricGroup) && (
              <span>
                <InfoCircleOutlined />
                &nbsp;
                {selectedMetricGroup?.description?.[getLangKey()]}
              </span>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );

  function handleMetricGroupOnChange(metricGroupId: MongoIDType) {
    setFieldValue('metricGroup', metricGroupId);
  }
}

export default ACMetricGroup;
