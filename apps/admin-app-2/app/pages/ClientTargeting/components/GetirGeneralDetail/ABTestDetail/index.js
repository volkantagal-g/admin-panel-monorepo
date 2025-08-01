import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { uniq } from 'lodash';
import { Row, Col } from 'antd';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import { getClientListData, getCollapseTriggeredKey } from '../../../redux/selectors';
import { Creators } from '../../../redux/actions';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import SingleSelect from '../../common/SingleSelect';
import CheckboxSelect from '../../common/CheckboxSelect';
import ABTestCodeSelect from '../../common/ABTestCodeSelect';
import ABTestCodeSelectV2 from '../../common/ABTestCodeSelectV2';
import { AB_TEST_DB_SOURCE, AB_TEST_FILTER_TYPE } from './constants';

const subSectionName = 'abTestDetail';
const activeKey = `${clientListSections.getirGeneralDetail}.${subSectionName}`;

const ABTestDetail = () => {
  const { t } = useTranslation('clientTargetingPage');
  const dispatch = useDispatch();
  const clientListData = useSelector(getClientListData(activeKey));
  const collapseTriggered = useSelector(getCollapseTriggeredKey(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const filterTypes = Object.values(AB_TEST_FILTER_TYPE).map(filterType => {
    const label = t(`AB_TEST_FILTER_TYPE_${filterType}`);
    const requestValue = filterType;
    return {
      value: label,
      key: requestValue,
    };
  });

  const dbSourceFilterTypes = Object.values(AB_TEST_DB_SOURCE).map(filterType => {
    const label = `${t(filterType)}`;
    const requestValue = filterType;
    return {
      value: label,
      key: requestValue,
    };
  });

  const formatDataABTestCodes = (testCodes = []) => {
    return uniq(testCodes).map(testCode => ({ id: testCode, label: testCode }));
  };

  const handleDBSourceChange = value => {
    dispatch(Creators.setInput({
      activeKey,
      clientListKey: 'abTestSourceAdminPanel',
      value,
    }));
    dispatch(Creators.setInput({
      activeKey,
      clientListKey: 'abTestCodes',
      value: [],
    }));
  };

  return (
    <div id="abTestDetailRow">
      <CollapsePanel header={t('AB_TEST_DETAIL')} activeKey={activeKey} triggerCollapseAction={collapseTriggered}>
        <ActiveParamButtons
          activeKey={activeKey}
          activeParamIndex={clientListData.activeIndex}
          paramsLength={clientListData.params.length}
        />
        <Row>
          <Col span={11}>
            <SingleSelect
              label={t('AB_TEST_FILTER_TYPE')}
              placeholder={t('SELECT_AB_TEST_FILTER_TYPE')}
              activeKey={activeKey}
              clientListKey="filteringType"
              value={data.filteringType}
              selectable={filterTypes}
            />
          </Col>
        </Row>

        {data.filteringType === AB_TEST_FILTER_TYPE.abTestCode && (
          <>
            <Row justify="space-between">
              <Col span={11}>
                <SingleSelect
                  label={t('AB_TEST_CODE_DB_SOURCE')}
                  placeholder={t('AB_TEST_CODE_DB_SOURCE_SELECT')}
                  activeKey={activeKey}
                  value={data.abTestSourceAdminPanel}
                  selectable={dbSourceFilterTypes}
                  onSelected={handleDBSourceChange}
                />
              </Col>
            </Row>
            {data.abTestSourceAdminPanel === AB_TEST_DB_SOURCE.MARKETING_COMMERCIAL_DB_SOURCE && (
              <Row justify="space-between">
                <Col span={11}>
                  <ABTestCodeSelect
                    activeKey={activeKey}
                    value={data.abTestCodes}
                    label={t('AB_TEST_CODES')}
                    clientListKey="abTestCodes"
                    placeholder={t('SELECT_AB_TEST_CODES')}
                    selectable={data.getABTestCodes.data}
                    tagKey="testCode"
                    tagValue="testCode"
                  />
                </Col>
              </Row>
            )}
            {data.abTestSourceAdminPanel === AB_TEST_DB_SOURCE.DATA_PANEL_DB_SOURCE && (
              <Row justify="space-between">
                <Col span={11}>
                  <ABTestCodeSelectV2
                    activeKey={activeKey}
                    value={data.abTestCodes}
                    label={t('AB_TEST_CODES')}
                    clientListKey="abTestCodes"
                    placeholder={t('SELECT_AB_TEST_CODES')}
                    selectable={formatDataABTestCodes(data.dataABTestCodes.data)}
                    tagKey="id"
                    tagValue="id"
                  />
                </Col>
              </Row>
            )}
          </>
        )}

        {data.filteringType === AB_TEST_FILTER_TYPE.dateRange && (
          <>
            <Row justify="space-between">
              <Col span={11}>
                <SelectDateOrXDaysBeforeToday
                  activeKey={activeKey}
                  label={t('AB_TEST_DATE_RANGE')}
                  startDate={data.startDate}
                  startDateType={data.startDateType}
                  startDayBeforeToday={data.startDayBeforeToday}
                  endDate={data.endDate}
                  endDateType={data.endDateType}
                  endDayBeforeToday={data.endDayBeforeToday}
                  showAllDates
                />
              </Col>
            </Row>
            <Row justify="space-between">
              <Col span={11}>
                <CheckboxSelect
                  activeKey={activeKey}
                  label={t('SELECT_ALL_COUNTRIES')}
                  value={data.ignoreCountry}
                  clientListKey="ignoreCountry"
                />
              </Col>
            </Row>
          </>
        )}

        {data.filteringType && (
          <Row justify="space-between">
            <Col>
              <CheckboxSelect
                activeKey={activeKey}
                label={t('EXCLUDE_CLIENTS')}
                value={data.excludeClients}
                clientListKey="excludeClients"
                description={t('EXCLUDE_CLIENTS_DESCRIPTION')}
              />
            </Col>
          </Row>
        )}
      </CollapsePanel>
    </div>
  );
};

export default ABTestDetail;
