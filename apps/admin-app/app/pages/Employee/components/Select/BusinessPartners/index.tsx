import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Spin, Typography } from 'antd';

import { t } from '@shared/i18n';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { DEFAULT_DEBOUNCE_MS, REDUX_KEY } from '@shared/shared/constants';

import { Creators } from './redux/actions';
import { getBusinessPartnersSelector } from './redux/selectors';
import reducer from './redux/reducer';
import saga from './redux/saga';

import useStyles from './styles';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInitAndDestroyPage } from '@shared/hooks';

const reduxKey: string = REDUX_KEY.EMPLOYEE.SELECT.BUSINESS_PARTNERS;

const { Option } = Select;

type PropsTypes = {
  mode?: 'multiple' | 'tags';
  value?: string;
  defaultValue?: string;
  onChange?: (value: any, option: any) => void;
  disabled?: boolean;
  allowClear?: boolean;
  showArrow?: boolean;
  placeholder?: string;
  minCharacterToSearch?: number;
  customNotFoundContent?: React.ReactNode | string;
  onSearch?: Function;
  [x: string]: any;
}

export default function SelectBusinessPartners({
  mode,
  value,
  defaultValue,
  onChange,
  disabled,
  allowClear = true,
  showArrow = true,
  placeholder,
  minCharacterToSearch,
  customNotFoundContent,
  onSearch,
  ...otherProps
}: PropsTypes): React.ReactElement {
  const classes = useStyles();
  const dispatch = useDispatch();

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });

  const businessPartners: any[] = useSelector(getBusinessPartnersSelector.getData);
  const isPending: boolean = useSelector(getBusinessPartnersSelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(Creators.getBusinessPartnersRequest());

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  const handleSearch = (name: string) => {
    if (name?.trim().length >= (minCharacterToSearch || 3)) {
      getBusinessPartnersRequest(name);
      if (onSearch) onSearch(name);
    }
  };
  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({ callback: handleSearch, delay: DEFAULT_DEBOUNCE_MS });

  const businessPartnersSelectOptions = useMemo(() => {
    return businessPartners?.map((bp: any) => (
      <Option value={bp._id} key={bp._id}>
        <div className="d-flex justify-content-between">
          <Typography.Text>{bp.fullName}</Typography.Text>
          <Typography.Text type="secondary" className={classes.workEmail}>{bp.workEmail}</Typography.Text>
        </div>
      </Option>
    ));
  }, [businessPartners, classes]);

  return (
    <Select
      {...(mode ? { mode } : undefined)}
      {...(defaultValue ? { defaultValue } : undefined)}
      value={value}
      filterOption={false}
      onSearch={debouncedHandleSearch}
      onChange={onChange}
      allowClear={allowClear}
      disabled={disabled}
      loading={isPending}
      placeholder={(placeholder || t('global:SELECT_EMPLOYEE'))}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      notFoundContent={isPending ? <Spin size="small" /> : customNotFoundContent}
      showArrow={showArrow}
      showSearch
      className={classes.wrapper}
      {...otherProps}
    >
      {businessPartnersSelectOptions}
    </Select>
  );

  function getBusinessPartnersRequest(name?: string) {
    dispatch(Creators.getBusinessPartnersRequest({ filters: { ...(name ? { name } : undefined) } }));
  }

  function handleDropdownVisibleChange(isVisible: boolean) {
    // if the dropdown is visible and the default options are shown, fetch the default options
    if (isVisible) {
      getBusinessPartnersRequest();
    }
  }
}
