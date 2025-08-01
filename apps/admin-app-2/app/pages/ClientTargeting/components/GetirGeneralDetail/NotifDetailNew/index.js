import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';

import { ROUTE } from '@app/routes';

import CollapsePanel from '../../common/CollapsePanel';
import { clientListSections } from '../../../constants';
import { getClientListData, getCollapseTriggeredKey } from '../../../redux/selectors';
import ActiveParamButtons from '../../common/ActiveParamButtons';
import SelectDateOrXDaysBeforeToday from '../../common/SelectDateOrXDaysBeforeToday';
import MultipleSelect from '../../common/MultipleSelect';
import SingleSelect from '../../common/SingleSelect';
import { NOTIF_FILTER_TYPE, NOTIF_SOURCE_TYPE } from './constants';
import RedirectButton from '../../common/RedirectButton';
import MinMaxInput from '../../common/MinMaxInput';
import CheckboxSelect from '../../common/CheckboxSelect';
import { notificationDomainType } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';

const subSectionName = 'notif';
const activeKey = `${clientListSections.getirGeneralDetail}.${subSectionName}`;

const NotifDetailNew = () => {
  const { t } = useTranslation('clientTargetingPage');
  const clientListData = useSelector(getClientListData(activeKey));
  const collapseTriggered = useSelector(getCollapseTriggeredKey(activeKey));

  const { activeIndex } = clientListData;
  const data = clientListData.params[activeIndex];

  const filterTypes = Object.values(NOTIF_FILTER_TYPE).map(filterType => {
    const label = t(`NOTIF_FILTER_TYPE_${filterType}`);
    const requestValue = filterType;
    return {
      value: label,
      key: requestValue,
    };
  });

  const sourceTypes = Object.keys(NOTIF_SOURCE_TYPE)
    .map(sourceType => ({
      value: t(`clientTargetingPage:NOTIF_SOURCE_TYPE.${sourceType}`),
      key: NOTIF_SOURCE_TYPE[sourceType].value,
    }));

  const domainTypes = Object.entries(notificationDomainType).map(([value, label]) => {
    return {
      key: value,
      value: label[getLangKey()] || label,
    };
  });

  const includedNotifs = 'includedNotifs';
  const excludedNotifs = 'excludedNotifs';

  return (
    <div id="notifRow">
      <CollapsePanel header={t('NOTIF_DETAIL_NEW')} activeKey={activeKey} triggerCollapseAction={collapseTriggered}>
        <ActiveParamButtons
          activeKey={activeKey}
          activeParamIndex={clientListData.activeIndex}
          paramsLength={clientListData.params.length}
        />
        <Row>
          <Col span={11}>
            <SingleSelect
              label={t('NOTIF_FILTER_TYPE')}
              activeKey={activeKey}
              clientListKey="notifFilterType"
              value={data.notifFilterType}
              selectable={filterTypes}
            />
          </Col>
        </Row>

        {data.notifFilterType === NOTIF_FILTER_TYPE.generalFiltering && (
          <>
            <Row justify="space-between">
              <Col span={11}>
                <SingleSelect
                  label={t('NOTIF_SOURCE')}
                  activeKey={activeKey}
                  clientListKey="notificationSource"
                  value={data.notificationSource}
                  selectable={sourceTypes}
                />
                {data.notificationSource === NOTIF_SOURCE_TYPE.PANEL.value && (
                  <SingleSelect
                    label={t('DOMAIN')}
                    activeKey={activeKey}
                    clientListKey="notificationDomainType"
                    value={data.notificationDomainType}
                    selectable={domainTypes}
                  />
                )}
                <SelectDateOrXDaysBeforeToday
                  activeKey={activeKey}
                  label={t('LAST_NOTIF_RECEIVE_DATE')}
                  startDate={data.startDate}
                  startDateType={data.startDateType}
                  startDayBeforeToday={data.startDayBeforeToday}
                  endDate={data.endDate}
                  endDateType={data.endDateType}
                  endDayBeforeToday={data.endDayBeforeToday}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <RedirectButton title={t('NOTIF_LIST')} to={ROUTE.PUSH_NOTIFICATION_LIST.path} />
              </Col>
            </Row>
            <Row justify="space-between">
              <Col span={11}>
                <MultipleSelect
                  activeKey={activeKey}
                  // TODO: Change label when text search available
                  label={t('INCLUDED_NOTIF_TEXTS_NEW')}
                  description={t('INCLUDED_NOTIF_TEXTS_DESCRIPTION_NEW')}
                  clientListKey={includedNotifs}
                  value={data[includedNotifs]}
                  mode="tags"
                  // TODO: fix when notif text search available
                  selectable={[]}
                  showCSVImporter
                />
              </Col>
              <Col span={11}>
                <MultipleSelect
                  activeKey={activeKey}
                  // TODO: Change label when text search available
                  label={t('EXCLUDED_NOTIF_TEXTS_NEW')}
                  description={t('EXCLUDED_NOTIF_TEXTS_DESCRIPTION_NEW')}
                  clientListKey={excludedNotifs}
                  value={data[excludedNotifs]}
                  mode="tags"
                  // TODO: fix when notif text search available
                  selectable={[]}
                  showCSVImporter
                />
              </Col>
            </Row>
          </>
        )}
        {data.notifFilterType === NOTIF_FILTER_TYPE.sendNotifCount && (
          <>
            <Row justify="space-between">
              <Col span={11}>
                <SelectDateOrXDaysBeforeToday
                  activeKey={activeKey}
                  label={t('SEND_NOTIF_COUNT_DATE_RANGE')}
                  startDate={data.startDate}
                  startDateType={data.startDateType}
                  startDayBeforeToday={data.startDayBeforeToday}
                  endDate={data.endDate}
                  endDateType={data.endDateType}
                  endDayBeforeToday={data.endDayBeforeToday}
                />
              </Col>
              <Col span={11}>
                <MinMaxInput
                  activeKey={activeKey}
                  minCount={data.minNotifCount}
                  maxCount={data.maxNotifCount}
                  minCountKey="minNotifCount"
                  maxCountKey="maxNotifCount"
                  label={t('MIN_MAX_VALUE')}
                  minLabel={t('MIN_VALUE')}
                  maxLabel={t('MAX_VALUE')}
                />
              </Col>
            </Row>
            <Row>
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
          </>
        )}
      </CollapsePanel>
    </div>
  );
};

export default NotifDetailNew;
