import { useTranslation } from 'react-i18next';
import { Dropdown, Tooltip, Menu, Button } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';

import { availableDomainTypesForCountrySelector } from '@shared/redux/selectors/common';
import useStyles from './styles';
import { DEFINED_HOURS_OPTIONS } from '../../constants';
import { Creators } from '../../../../New/redux/actions';
import { Creators as DetailCreators } from '../../../../Detail/redux/actions';

interface IOption {
  value: string | number | null;
  label: React.ReactNode;
  children?: IOption[];
  tooltip?: string;
  key: string;
}

function PredefinedHoursSelection({ isDetailPage, isFormEditable }: { isDetailPage: boolean, isFormEditable: boolean }) {
  const { t } = useTranslation(['batAlertConditionCommon']);
  const classes = useStyles();
  const { Item, SubMenu } = Menu;
  const dispatch = useDispatch();
  const availableDomainTypes = useSelector(state => availableDomainTypesForCountrySelector.getDomainTypes(state));
  const subMenuOptions = availableDomainTypes.map((domainType: string) => ({
    key: domainType,
    value: domainType,
    label: t(`global:GETIR_MARKET_DOMAIN_TYPES.${domainType}`),
  }));

  const optionLists: IOption[] = [
    {
      value: DEFINED_HOURS_OPTIONS.ALL_WEEK,
      label: t('batAlertConditionCommon:DEFINED_HOUR_OPTIONS.ALL_WEEK'),
      key: DEFINED_HOURS_OPTIONS.ALL_WEEK,
    },
    {
      value: DEFINED_HOURS_OPTIONS.OPERATING_HOURS,
      label: (
        <>
          <Tooltip
            title={t('batAlertConditionCommon:DEFINED_HOUR_OPTIONS.OPERATION_HOURS_TOOLTIP')}
          >
            <InfoCircleOutlined className="icon-type2" style={{ marginRight: '3px' }} />
          </Tooltip>
          <span>{t('batAlertConditionCommon:DEFINED_HOUR_OPTIONS.OPERATION_HOURS')}</span>
        </>
      ),
      children: subMenuOptions,
      key: DEFINED_HOURS_OPTIONS.OPERATING_HOURS,
    },
    {
      value: DEFINED_HOURS_OPTIONS.WORKING_HOURS,
      label: (
        <>
          <Tooltip
            title={t('batAlertConditionCommon:DEFINED_HOUR_OPTIONS.WORKING_HOURS_TOOLTIP')}
          >
            <InfoCircleOutlined className="icon-type2" style={{ marginRight: '3px' }} />
          </Tooltip>
          <span>{t('batAlertConditionCommon:DEFINED_HOUR_OPTIONS.WORKING_HOURS')}</span>
        </>
      ),
      key: DEFINED_HOURS_OPTIONS.WORKING_HOURS,
    },
  ];

  const handleWorkingHoursTypeOnClick = ({ value, type }: { value?: string | number, type: string }) => {
    if (isDetailPage) {
      dispatch(DetailCreators.selectedWorkingHoursType({ data: { value, type } }));
      return;
    }
    dispatch(Creators.selectedWorkingHoursType({ data: { value, type } }));
  };

  const menu = (
    <Menu className={classes.hourSelectionMenu}>
      {optionLists.map(option => (
        option.children ? (
          <SubMenu
            title={option.label}
            key={option.key}
            disabled={!isFormEditable}
          >
            {option.children.map(child => (
              <Item
                key={child.value}
                onClick={value => {
                  handleWorkingHoursTypeOnClick({ value: Number(value?.key), type: option.key });
                }}
              >
                {child.label}
              </Item>
            ))}
          </SubMenu>
        ) : (
          <Item
            key={option.value}
            onClick={value => {
              handleWorkingHoursTypeOnClick({ value: value?.key, type: option.key });
            }}
            disabled={!isFormEditable}
          >
            {option.label}
          </Item>
        )
      ))}
    </Menu>
  );
  return (
    <div className={classes.buttonContainer}>
      <Button
        size="small"
        onClick={() => {
          handleWorkingHoursTypeOnClick({ type: DEFINED_HOURS_OPTIONS.CLEAR_ALL_SELECTED_HOURS });
        }}
      >
        {t('batAlertConditionCommon:DEFINED_HOUR_OPTIONS.CLEAR_ALL_SELECTED_HOURS')}
      </Button>
      <Dropdown overlay={menu}>
        <Button size="small">{t('batAlertConditionCommon:DEFINED_HOUR_OPTIONS.TITLE')}</Button>
      </Dropdown>
    </div>
  );
}

export default PredefinedHoursSelection;
