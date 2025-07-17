import { useEffect, useState } from 'react';
import { Row, Card, Col, Button, TimePicker, Tooltip, Divider } from 'antd';
import { ClockCircleOutlined, LockOutlined, UnlockOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';
import { FRIDAY, MONDAY, SATURDAY, SUNDAY, THURSDAY, TUESDAY, WEDNESDAY } from '@shared/shared/constants';

const DAY_CONSTANTS = {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
};

const ValidityHours = ({ values, setTaskTimeRanges = () => {}, onDetail }) => {
  const { t } = useTranslation('courierGamificationPage');
  const classes = useStyles();
  const [timeRanges, setTimeRanges] = useState({});
  const [lockedDays, setLockedDays] = useState({});

  const convertTimeRangesToTaskFormat = tRanges => {
    const taskTimeRanges = [];

    Object.keys(tRanges).forEach(weekKey => {
      const weekData = tRanges[weekKey];

      Object.keys(weekData).forEach(date => {
        const ranges = weekData[date];

        ranges.forEach(range => {
          if (range.startTime && range.endTime) {
            const start = moment(`${date}T${range.startTime}:00.000+00:00`).toISOString();
            const end = moment(`${date}T${range.endTime}:00.000+00:00`).toISOString();

            taskTimeRanges.push({ start, end });
          }
        });
      });
    });

    return taskTimeRanges;
  };

  const handleTimeChange = (date, weekIndex, isStartTime, time, rangeIndex = 0) => {
    const formattedDate = date.format('YYYY-MM-DD');
    const weekKey = `week_${weekIndex + 1}`;

    const newTimeRanges = {
      ...timeRanges,
      [weekKey]: {
        ...timeRanges[weekKey],
        [formattedDate]: [
          ...(timeRanges[weekKey]?.[formattedDate] || []),
        ],
      },
    };

    if (!newTimeRanges[weekKey][formattedDate][rangeIndex]) {
      newTimeRanges[weekKey][formattedDate][rangeIndex] = {};
    }

    const updatedTime = time ? time.format('HH:mm') : null;
    const currentRanges = newTimeRanges[weekKey][formattedDate];
    const otherRangeIndex = rangeIndex === 0 ? 1 : 0;
    const otherRange = currentRanges[otherRangeIndex];

    const updatedRange = {
      ...currentRanges[rangeIndex],
      [isStartTime ? 'startTime' : 'endTime']: updatedTime,
    };

    if (updatedRange.startTime && updatedRange.endTime) {
      const start = moment(updatedRange.startTime, 'HH:mm');
      const end = moment(updatedRange.endTime, 'HH:mm');

      if (start.isAfter(end)) {
        return;
      }

      if (otherRange?.startTime && otherRange?.endTime) {
        const otherStart = moment(otherRange.startTime, 'HH:mm');
        const otherEnd = moment(otherRange.endTime, 'HH:mm');

        if (
          start.isBetween(otherStart, otherEnd, 'minute', '[]') ||
          end.isBetween(otherStart, otherEnd, 'minute', '[]') ||
          otherStart.isBetween(start, end, 'minute', '[]') ||
          otherEnd.isBetween(start, end, 'minute', '[]')
        ) {
          return;
        }
      }
    }

    newTimeRanges[weekKey][formattedDate][rangeIndex] = updatedRange;
    setTimeRanges(newTimeRanges);
  };

  useEffect(() => {
    setTaskTimeRanges(convertTimeRangesToTaskFormat(timeRanges));
  }, [timeRanges, setTaskTimeRanges]);

  const getDisabledTime = (date, weekIndex, isStartTime, rangeIndex = 0) => {
    const formattedDate = date.format('YYYY-MM-DD');
    const weekKey = `week_${weekIndex + 1}`;
    const timeRangesForDay = timeRanges[weekKey]?.[formattedDate] || [];
    const currentRange = timeRangesForDay[rangeIndex];
    const otherRange = timeRangesForDay[rangeIndex === 0 ? 1 : 0];

    if (isStartTime) {
      const disabledRanges = {
        disabledHours: () => {
          const hours = [];
          if (currentRange?.endTime) {
            const [endHour] = currentRange.endTime.split(':').map(Number);
            for (let i = endHour; i < 24; i++) {
              hours.push(i);
            }
          }
          if (otherRange?.startTime && otherRange?.endTime) {
            const [otherStartHour] = otherRange.startTime.split(':').map(Number);
            const [otherEndHour] = otherRange.endTime.split(':').map(Number);
            for (let i = otherStartHour; i <= otherEndHour; i++) {
              if (!hours.includes(i)) {
                hours.push(i);
              }
            }
          }
          return hours;
        },
        disabledMinutes: selectedHour => {
          const minutes = [];
          if (currentRange?.endTime) {
            const [endHour, endMinute] = currentRange.endTime.split(':').map(Number);
            if (selectedHour === endHour) {
              for (let i = endMinute; i < 60; i++) {
                minutes.push(i);
              }
            }
          }
          if (otherRange?.startTime && otherRange?.endTime) {
            const [otherStartHour, otherStartMinute] = otherRange.startTime.split(':').map(Number);
            const [otherEndHour, otherEndMinute] = otherRange.endTime.split(':').map(Number);
            if (selectedHour === otherStartHour) {
              for (let i = otherStartMinute; i < 60; i++) {
                if (!minutes.includes(i)) {
                  minutes.push(i);
                }
              }
            }
            else if (selectedHour === otherEndHour) {
              for (let i = 0; i <= otherEndMinute; i++) {
                if (!minutes.includes(i)) {
                  minutes.push(i);
                }
              }
            }
          }
          return minutes;
        },
      };
      return disabledRanges;
    }

    const disabledRanges = {
      disabledHours: () => {
        const hours = [];
        if (currentRange?.startTime) {
          const [startHour] = currentRange.startTime.split(':').map(Number);
          for (let i = 0; i < startHour; i++) {
            hours.push(i);
          }
        }
        if (otherRange?.startTime && otherRange?.endTime) {
          const [otherStartHour] = otherRange.startTime.split(':').map(Number);
          const [otherEndHour] = otherRange.endTime.split(':').map(Number);
          for (let i = otherStartHour; i <= otherEndHour; i++) {
            if (!hours.includes(i)) {
              hours.push(i);
            }
          }
        }
        return hours;
      },
      disabledMinutes: selectedHour => {
        const minutes = [];
        if (currentRange?.startTime) {
          const [startHour, startMinute] = currentRange.startTime.split(':').map(Number);
          if (selectedHour === startHour) {
            for (let i = 0; i <= startMinute; i++) {
              minutes.push(i);
            }
          }
        }
        if (otherRange?.startTime && otherRange?.endTime) {
          const [otherStartHour, otherStartMinute] = otherRange.startTime.split(':').map(Number);
          const [otherEndHour, otherEndMinute] = otherRange.endTime.split(':').map(Number);
          if (selectedHour === otherStartHour) {
            for (let i = otherStartMinute; i < 60; i++) {
              if (!minutes.includes(i)) {
                minutes.push(i);
              }
            }
          }
          else if (selectedHour === otherEndHour) {
            for (let i = 0; i <= otherEndMinute; i++) {
              if (!minutes.includes(i)) {
                minutes.push(i);
              }
            }
          }
        }
        return minutes;
      },
    };
    return disabledRanges;
  };

  const handleLockDay = (weekKey, formattedDate) => {
    setLockedDays(prev => ({
      ...prev,
      [weekKey]: {
        ...prev[weekKey],
        [formattedDate]: !prev[weekKey]?.[formattedDate],
      },
    }));
  };

  const isTimeRangeComplete = range => {
    return range && range.startTime && range.endTime;
  };

  const renderTimeRangePair = (date, weekIndex, rangeIndex, isLocked) => {
    const formattedDate = date.format('YYYY-MM-DD');
    const weekKey = `week_${weekIndex + 1}`;
    const timeRangesForDay = timeRanges[weekKey]?.[formattedDate] || [];
    const currentRange = timeRangesForDay[rangeIndex] || {};

    return (
      <div className={classes.timePickerContainer}>
        <TimePicker
          placeholder="Başlangıç"
          onChange={time => handleTimeChange(date, weekIndex, true, time, rangeIndex)}
          value={currentRange?.startTime ?
            moment(currentRange.startTime, 'HH:mm') :
            null}
          showToday={false}
          showSecond={false}
          format="HH:mm"
          disabled={isLocked || onDetail}
          {...getDisabledTime(date, weekIndex, true, rangeIndex)}
        />
        <TimePicker
          placeholder="Bitiş"
          onChange={time => handleTimeChange(date, weekIndex, false, time, rangeIndex)}
          value={currentRange?.endTime ?
            moment(currentRange.endTime, 'HH:mm') :
            null}
          showToday={false}
          showSecond={false}
          format="HH:mm"
          disabled={isLocked || onDetail}
          {...getDisabledTime(date, weekIndex, false, rangeIndex)}
        />
      </div>
    );
  };

  const renderDateRangeWithWeekGroups = (startDateStr, endDateStr) => {
    const startDate = moment(startDateStr);
    const endDate = moment(endDateStr);
    const dayDiff = endDate.diff(startDate, 'days');

    const weekGroups = [];
    let currentWeekStart = startDate.clone();

    if (dayDiff === 0) {
      weekGroups.push({
        start: startDate.clone(),
        end: startDate.clone(),
      });
    }
    else {
      while (currentWeekStart.isBefore(endDate)) {
        const currentWeekEnd = currentWeekStart.clone().add(6, 'days');
        const adjustedWeekEnd = currentWeekEnd.isSameOrAfter(endDate) ?
          endDate.clone().subtract(1, 'day') :
          currentWeekEnd;

        weekGroups.push({
          start: currentWeekStart.clone(),
          end: adjustedWeekEnd,
        });

        currentWeekStart = currentWeekStart.add(7, 'days');
      }
    }

    const firstDate = startDate.format('YYYY-MM-DD');
    const firstDayTimes = timeRanges?.week_1?.[firstDate] || [];

    const isApplyButtonDisabled = !firstDayTimes?.length ||
      !firstDayTimes.every(range => range.startTime && range.endTime);

    const firstWeekDates = [];
    const currentDate = weekGroups[0]?.start.clone();
    while (currentDate.isSameOrBefore(weekGroups[0]?.end)) {
      firstWeekDates.push(currentDate.format('YYYY-MM-DD'));
      currentDate.add(1, 'day');
    }

    const isFirstWeekComplete = firstWeekDates.every(date => {
      const ranges = timeRanges?.week_1?.[date] || [];
      return ranges.length > 0 && ranges.every(range => range.startTime && range.endTime);
    });

    const applyFirstDayTimesToAll = () => {
      const newTimeRanges = { ...timeRanges };

      weekGroups.forEach((week, weekIndex) => {
        const weekKey = `week_${weekIndex + 1}`;
        const currDate = week.start.clone();

        while (currDate.isSameOrBefore(week.end)) {
          const formattedDate = currDate.format('YYYY-MM-DD');

          if (formattedDate !== firstDate && !lockedDays[weekKey]?.[formattedDate]) {
            newTimeRanges[weekKey] = {
              ...newTimeRanges[weekKey],
              [formattedDate]: [...firstDayTimes],
            };
          }

          currDate.add(1, 'day');
        }
      });

      setTimeRanges(newTimeRanges);
    };

    const applyFirstWeekToAll = () => {
      const newTimeRanges = { ...timeRanges };
      const firstWeekTimes = timeRanges?.week_1 || {};

      weekGroups.forEach((week, weekIndex) => {
        if (weekIndex === 0) return;

        const weekKey = `week_${weekIndex + 1}`;
        const currDate = week.start.clone();

        while (currDate.isSameOrBefore(week.end)) {
          const formattedDate = currDate.format('YYYY-MM-DD');
          const currentDayName = currDate.format('dddd').toUpperCase();

          if (!lockedDays[weekKey]?.[formattedDate]) {
            const firstWeekMatchingDate = Object.keys(firstWeekTimes).find(date => moment(date).format('dddd').toUpperCase() === currentDayName);

            if (firstWeekMatchingDate) {
              const firstWeekDayTimes = firstWeekTimes[firstWeekMatchingDate];

              if (Array.isArray(firstWeekDayTimes) && firstWeekDayTimes.length > 0) {
                const validTimeRanges = firstWeekDayTimes.filter(
                  range => range.startTime && range.endTime,
                );

                if (validTimeRanges.length > 0) {
                  newTimeRanges[weekKey] = {
                    ...newTimeRanges[weekKey],
                    [formattedDate]: [...validTimeRanges],
                  };
                }
              }
            }
          }

          currDate.add(1, 'day');
        }
      });

      setTimeRanges(newTimeRanges);
    };

    return (
      <>
        <div className={classes.buttonContainer}>
          <div className={classes.buttonWrapper}>
            <Tooltip title={t('CREATE.TASK_DETAIL.TOOLTIP_TEXT_APPLY_FIRST_DAY_TIMES')}>
              <Button
                type="primary"
                icon={<ClockCircleOutlined />}
                disabled={isApplyButtonDisabled || onDetail}
                onClick={applyFirstDayTimesToAll}
                className={classes.actionButton}
              >
                {t('CREATE.TASK_DETAIL.APPLY_FIRST_DAY_TIMES')}
              </Button>
            </Tooltip>
          </div>
          {dayDiff > 7 && (
            <div className={classes.buttonWrapper}>
              <Tooltip title={t('CREATE.TASK_DETAIL.TOOLTIP_TEXT_APPLY_FIRST_WEEK_TIMES')}>
                <Button
                  type="primary"
                  icon={<ClockCircleOutlined />}
                  disabled={!isFirstWeekComplete || onDetail}
                  onClick={applyFirstWeekToAll}
                  className={classes.actionButton}
                >
                  {t('CREATE.TASK_DETAIL.APPLY_FIRST_WEEK_TIMES')}
                </Button>
              </Tooltip>
            </div>
          )}
          <div className={classes.buttonWrapper}>
            <Tooltip title={t('CREATE.TASK_DETAIL.TOOLTIP_TEXT_CLEAR_ALL_TABLE')}>
              <Button
                disabled={onDetail}
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  setTimeRanges({});
                  setLockedDays({});
                }}
                className={classes.actionButton}
              >
                {t('CREATE.TASK_DETAIL.CLEAR_ALL_TABLE')}
              </Button>
            </Tooltip>
          </div>
        </div>
        <Row gutter={[16, 16]} className={classes.weekContainer}>
          {weekGroups.map((week, weekIndex) => {
            const currDate = week.start.clone();
            const dates = [];

            while (currDate.isSameOrBefore(week.end)) {
              dates.push(currDate.clone());
              currDate.add(1, 'day');
            }

            return (
              <Col className={classes.weekColumn}>
                <Card size="small">
                  <Divider orientation="left">
                    {`${week.start.format('DD MMM')} - ${week.end.format('DD MMM')}`}
                  </Divider>

                  <Row gutter={[8, 8]}>
                    {dates.map(date => {
                      const formattedDay = date.format('dddd').toUpperCase();
                      const dayConstant = DAY_CONSTANTS[formattedDay];
                      const dayOfWeek = t(`global:DAY_OF_WEEKS:${dayConstant}`);
                      const dayStr = date.format('DD MMM');
                      const formattedDate = date.format('YYYY-MM-DD');
                      const weekKey = `week_${weekIndex + 1}`;
                      const isLocked = lockedDays[weekKey]?.[formattedDate];
                      const timeRangesForDay = timeRanges[weekKey]?.[formattedDate] || [];

                      return (
                        <Col span={24}>
                          <div className={classes.dayContainer}>
                            <div className={classes.dayLabel}>
                              <div>{dayStr}</div>
                              <div>{dayOfWeek}</div>
                            </div>
                            <div className={classes.timeRangesContainer}>
                              {renderTimeRangePair(date, weekIndex, 0, isLocked)}
                              {timeRangesForDay.length > 1 && renderTimeRangePair(date, weekIndex, 1, isLocked)}
                            </div>
                            <div className={classes.actionButtons}>
                              <Button
                                type="link"
                                icon={<PlusOutlined />}
                                onClick={() => {
                                  const newTimeRanges = { ...timeRanges };
                                  if (!newTimeRanges[weekKey]) {
                                    newTimeRanges[weekKey] = {};
                                  }
                                  if (!newTimeRanges[weekKey][formattedDate]) {
                                    newTimeRanges[weekKey][formattedDate] = [{}];
                                  }
                                  if (newTimeRanges[weekKey][formattedDate].length < 2) {
                                    newTimeRanges[weekKey][formattedDate].push({});
                                    setTimeRanges(newTimeRanges);
                                  }
                                }}
                                disabled={
                                  isLocked ||
                                  timeRangesForDay.length >= 2 ||
                                  !isTimeRangeComplete(timeRangesForDay[0])
                                  || onDetail
                                }
                                title={t('CREATE.TASK_DETAIL.ADD_TIME_RANGE')}
                              />
                              <Button
                                type="link"
                                icon={isLocked ? <LockOutlined /> : <UnlockOutlined />}
                                onClick={() => handleLockDay(weekKey, formattedDate)}
                                disabled={timeRanges[weekKey]?.[formattedDate]?.some(range => range.startTime || range.endTime) || onDetail}
                                title={isLocked ? t('CREATE.TASK_DETAIL.UNLOCK_DAY') : t('CREATE.TASK_DETAIL.LOCK_DAY')}
                              />
                            </div>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </Card>
              </Col>
            );
          })}
        </Row>
      </>
    );
  };

  useEffect(() => {
    const prepareData = () => {
      const result = {};

      if (!values?.taskTimeRanges?.length) return result;

      values.taskTimeRanges.forEach(timeRange => {
        const startDate = moment.utc(timeRange.start);
        const endDate = moment.utc(timeRange.end);

        const taskStartDate = moment.utc(values.startDate);
        const weeksDiff = startDate.diff(taskStartDate, 'weeks');
        const weekNumber = weeksDiff <= 0 ? 1 : Math.ceil(weeksDiff) + 1;
        const weekKey = `week_${weekNumber}`;

        const formattedDate = startDate.format('YYYY-MM-DD');

        const startTime = startDate.format('HH:mm');
        const endTime = endDate.format('HH:mm');

        if (!result[weekKey]) {
          result[weekKey] = {};
        }

        if (!result[weekKey][formattedDate]) {
          result[weekKey][formattedDate] = [];
        }
        const isDuplicate = result[weekKey][formattedDate].some(
          range => range.startTime === startTime && range.endTime === endTime,
        );

        if (!isDuplicate) {
          result[weekKey][formattedDate].push({
            startTime,
            endTime,
          });
        }
      });

      return result;
    };
    if (onDetail && values?.taskTimeRanges) {
      setTimeRanges(prepareData());
    }
  }, [values, setTimeRanges, onDetail]);

  return (
    <Card size="small" title={t('CREATE.TASK_DETAIL.VALIDITY_HOURS')}>
      {values?.startDate && values?.endDate && renderDateRangeWithWeekGroups(values?.startDate, values?.endDate)}
    </Card>
  );
};

export default ValidityHours;
