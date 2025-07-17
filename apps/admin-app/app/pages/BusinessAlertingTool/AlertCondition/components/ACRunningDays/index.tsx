import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Col, Row, Switch, Tabs, Form } from 'antd';
import { BulbFilled, BulbOutlined } from '@ant-design/icons';

import { getDaysOfWeekForCountry, isMobile } from '@shared/utils/common';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { getWeekMinutesMap, formatMinToHourRange } from './utils';
import useStyles from './styles';
import HourCard from './components/HourCard';
import PredefinedHoursSelection from './components/PredefinedHoursSelection';
import { getSelectedHours, operationHoursByDomainTypeSelector } from '../../New/redux/selectors';
import {
  getSelectedHours as getSelectedHoursInDetailPage,
  operationHoursByDomainTypeSelector as operationHoursByDomainTypeSelectorInDetailPage,
} from '../../Detail/redux/selectors';
import DaySelectionWithCopyHours from './components/DaySelectionWithCopyHours';

function ACRunningDays({ formik, isFormEditable = true, isDetailPage = false }: { formik: any, isFormEditable: boolean | undefined, isDetailPage?: boolean }) {
  const isDeviceMobile = isMobile();
  const classes = useStyles();
  const { t } = useTranslation(['batAlertConditionCommon']);
  const selectedCountry = useSelector(getSelectedCountryV2);
  const minutesMap = getWeekMinutesMap();
  const daysOfWeekCountry = getDaysOfWeekForCountry({ selectedCountry });

  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(daysOfWeekCountry[0]);
  const [isBlinking, setIsBlinking] = useState(false);
  const [blinkedDay, setBlinkedDay] = useState<number | null>(null);

  const selectedDefinedHours = useSelector(getSelectedHours.tempDefinedHours);
  const isOperationHoursPending = useSelector(operationHoursByDomainTypeSelector.getIsPending);
  const selectedDefinedHoursInDetailPage = useSelector(getSelectedHoursInDetailPage.tempDefinedHours);
  const isOperationHoursInDetailPagePending = useSelector(operationHoursByDomainTypeSelectorInDetailPage.getIsPending);

  const definedHours = isDetailPage ? selectedDefinedHoursInDetailPage : selectedDefinedHours;

  const { setFieldValue, values } = formik;

  useEffect(() => {
    if (!isDetailPage || isFormEditable) {
      setFieldValue(
        ['queryInfo', 'runningConfig', 'runningHours'],
        {
          ...values?.queryInfo?.runningConfig?.runningHours,
          ...definedHours,
        },
      );
      if (isEmpty(definedHours)) {
        setFieldValue(
          ['queryInfo', 'runningConfig', 'runningHours'],
          {},
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [definedHours]);

  const blinkOnce = () => {
    setIsBlinking(true);
    setTimeout(() => {
      setIsBlinking(false);
    }, 800);
  };

  const handleSelectedCopyHours = (id: number) => {
    blinkOnce();
    setBlinkedDay(id);
    // Calculate the selected hours for the selected day
    // Add minutes diff to the selected hours by (1440 * (id - selectedTabIndex)
    const selectedHours = values?.queryInfo?.runningConfig?.runningHours[selectedTabIndex]
      ?.map((selectedMin: number) => selectedMin + (1440 * (id - selectedTabIndex)));
    const runningHours = values?.queryInfo?.runningConfig?.runningHours;
    setFieldValue(
      ['queryInfo', 'runningConfig', 'runningHours'],
      {
        ...runningHours,
        [id]: selectedHours,
      },
    );
  };

  return (
    <Row>
      <Col xs={24}>
        <Form.Item
          name={['queryInfo', 'runningConfig', 'runningHours']}
          rules={[{ required: true, message: t('error:REQUIRED') }]}
        >
          <Tabs
            onChange={(key: string) => setSelectedTabIndex(Number(key))}
            tabBarExtraContent={(
              <PredefinedHoursSelection
                isDetailPage={isDetailPage}
                isFormEditable={isFormEditable}
              />
            )}
          >
            {
              daysOfWeekCountry.map(day => (
                <Tabs.TabPane key={day} tab={getTabTitle(day)}>
                  <div>
                    <Row className={classes.hourSelectionContainer} justify={isDeviceMobile ? 'end' : 'space-between'}>
                      <Col className={classes.contentHeader}>
                        <span>{t('batAlertConditionCommon:SELECT_HOURS')}</span>
                      </Col>
                      <Col>
                        <div className={classes.allDaySection}>
                          <DaySelectionWithCopyHours
                            handleSelectedCopyHours={handleSelectedCopyHours}
                            isFormEditable={isFormEditable}
                          />
                          <span>{t('batAlertConditionCommon:ALL_DAY')}</span>
                          <Switch
                            checked={isAllDaySwitchChecked(day)}
                            size="small"
                            onChange={status => {
                              if (!status) {
                                setFieldValue(
                                  ['queryInfo', 'runningConfig', 'runningHours'],
                                  {
                                    ...values?.queryInfo?.runningConfig?.runningHours,
                                    [day]: [],
                                  },
                                );

                                return;
                              }

                              setFieldValue(
                                ['queryInfo', 'runningConfig', 'runningHours'],
                                {
                                  ...values?.queryInfo?.runningConfig?.runningHours,
                                  [day]: [...minutesMap?.[day] || []],
                                },
                              );
                            }}
                            disabled={!isFormEditable}
                          />
                        </div>
                      </Col>
                    </Row>
                    <div className={classes.hoursContainer}>
                      {
                        minutesMap[day].map(min => (
                          <HourCard
                            key={min}
                            className={values?.queryInfo?.runningConfig?.runningHours?.[day]?.includes(min) ? classes.activeHourCard : ''}
                            onClick={() => handleHourCardOnClick(day, min)}
                            disabled={!isFormEditable || isOperationHoursPending || isOperationHoursInDetailPagePending}
                          >
                            {formatMinToHourRange(min)} - {formatMinToHourRange(min + 60)}
                          </HourCard>
                        ))
                      }
                    </div>
                  </div>
                </Tabs.TabPane>
              ))
            }
          </Tabs>
        </Form.Item>
      </Col>
    </Row>
  );

  function getTabTitle(day: number | string) {
    return (
      <div className={classes.tabTitle}>
        {t(`global:DAY_OF_WEEKS:${day}`)}
        {!isEmpty(values?.queryInfo?.runningConfig?.runningHours?.[day]) && (
          (isBlinking && day === blinkedDay) ? (
            <BulbFilled className={classes.bulbFilled} />
          ) : (<BulbOutlined />)
        )}
      </div>
    );
  }

  function handleHourCardOnClick(day: number | string, min: number) {
    const runningHours = values?.queryInfo?.runningConfig?.runningHours;
    if (runningHours?.[day]?.includes(min)) {
      const index = runningHours?.[day].indexOf(min);
      const tempRunningHours = runningHours;
      tempRunningHours?.[day].splice(index, 1);
      setFieldValue(
        ['queryInfo', 'runningConfig', 'runningHours'],
        {
          ...runningHours,
          [day]: [...tempRunningHours?.[day] || []],
        },
      );
      return;
    }

    setFieldValue(
      ['queryInfo', 'runningConfig', 'runningHours'],
      {
        ...runningHours,
        [day]: [...runningHours?.[day] || [], min],
      },
    );
  }

  function isAllDaySwitchChecked(day: number | string) {
    return ((values?.queryInfo?.runningConfig?.runningHours?.[day]?.length || 0) % 24 === 0)
      && !isEmpty(values?.queryInfo?.runningConfig?.runningHours?.[day]);
  }
}

ACRunningDays.defaultProps = { isDetailPage: false };

export default ACRunningDays;
