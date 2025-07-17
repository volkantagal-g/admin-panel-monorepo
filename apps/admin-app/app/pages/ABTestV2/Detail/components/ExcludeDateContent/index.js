import { Alert, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { Button, FormItem } from '@shared/components/GUI';

import { RangePicker } from '@shared/components/GUI/RangePicker';

import { Creators } from '@app/pages/ABTestV2/Detail/redux/actions';
import { stateSelector } from '../../redux/selectors';
import { validateExcludeDate } from '@app/pages/ABTestV2/utils';

const ExcludeDateContent = ({
  theme,
  classes,
  testData,
  values,
  disabled,
  setFieldValue,
  errorMessage,
  setErrorMessage,
}) => {
  const { t } = useTranslation('abTestingV2Page');
  const dispatch = useDispatch();

  const excludeDates = useSelector(stateSelector.excludeDates);

  const handleDateFieldsChange = (value, dateIndex) => {
    setErrorMessage(null);
    const currentExcludeDates = excludeDates;
    currentExcludeDates[dateIndex] = { startDate: value[0], endDate: value[1] };
    dispatch(Creators.setExcludeDates({ excludeDates: currentExcludeDates }));
    setFieldValue('excludeDate', currentExcludeDates);
    const { excludeDate, testEndDate } = values;
    setErrorMessage(validateExcludeDate(testEndDate, testData.testStartDate, excludeDate, t));
  };

  return (
    <Row gutter={[theme.spacing(3)]} align="bottom">
      <Col span={24}>
        <FormItem label={t('EXCLUDE_DATE_RANGE')}>
          {errorMessage && !disabled && (
            <Alert
              type="error"
              message={errorMessage}
              className={classes.alert}
              showIcon
            />
          )}
          {excludeDates?.length > 0 ? (
            excludeDates.map((date, dateIndex) => (
              <Row
                gutter={[theme.spacing(3)]}
                align="bottom"
                className={classes.row}
              >
                <Col span={12}>
                  <RangePicker
                    allowClear={false}
                    allowEmpty={[false, false]}
                    disabledDate={current => current > moment(values.testEndDate) ||
                      current < moment(testData.testStartDate)}
                    defaultValue={[
                      moment(date.startDate),
                      moment(date.endDate),
                    ]}
                    value={[moment(date.startDate), moment(date.endDate)]}
                    onChange={value => handleDateFieldsChange(value, dateIndex)}
                    disabled={disabled}
                  />
                </Col>
                <Col span={3}>
                  {!disabled && (
                  <Button
                    color="danger"
                    className={classes.deleteButton}
                    disabled={disabled}
                    size="small"
                    onClick={() => {
                      setFieldValue(
                        'excludeDate',
                        excludeDates.filter(
                          (_, elementIndex) => elementIndex !== dateIndex,
                        ),
                      );
                      dispatch(
                        Creators.setExcludeDates({
                          excludeDates: excludeDates.filter(
                            (_, elementIndex) => elementIndex !== dateIndex,
                          ),
                        }),
                      );
                    }}
                  >
                    {t('DELETE_EXCLUDE_DATE')}
                  </Button>
                  )}

                </Col>
                <Col span={3}>
                  {dateIndex === 0 && !disabled && (
                    <Button
                      color="active"
                      className={classes.excludeDateButton}
                      disabled={disabled}
                      size="small"
                      onClick={() => {
                        setFieldValue('excludeDate', [
                          ...excludeDates,
                          {
                            startDate: moment(),
                            endDate: moment(),
                          },
                        ]);
                        dispatch(
                          Creators.setExcludeDates({
                            excludeDates: [
                              ...excludeDates,
                              {
                                startDate: moment(),
                                endDate: moment(),
                              },
                            ],
                          }),
                        );
                      }}
                    >
                      {t('ADD_EXCLUDE_DATE')}
                    </Button>
                  )}
                </Col>
              </Row>
            ))
          ) : (
            <Row
              gutter={[theme.spacing(3)]}
              align="bottom"
              className={[classes.row, classes.addButton]}
            >
              <Button
                color="active"
                className={classes.addButton}
                disabled={disabled}
                size="small"
                onClick={() => {
                  setFieldValue('excludeDate', [
                    ...excludeDates,
                    {
                      startDate: moment(),
                      endDate: moment(),
                    },
                  ]);
                  dispatch(
                    Creators.setExcludeDates({
                      excludeDates: [
                        ...excludeDates,
                        {
                          startDate: moment(),
                          endDate: moment(),
                        },
                      ],
                    }),
                  );
                }}
              >
                {t('ADD_EXCLUDE_DATE')}
              </Button>
            </Row>
          )}
        </FormItem>
      </Col>
    </Row>
  );
};

export default ExcludeDateContent;
