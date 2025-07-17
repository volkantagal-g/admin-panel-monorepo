import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Select, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';

import { DEFAULT_DEBOUNCE_MS, REDUX_KEY } from '@shared/shared/constants';
import { useInitAndDestroyPage } from '@shared/hooks';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';

import { getAnnouncementsByTextSelector } from './redux/selectors';
import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { getLangKey } from '@shared/i18n';

const SelectAnnouncement = ({
  mode,
  onChange,
  value,
  ...otherProps
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useInitAndDestroyPage({ dispatch, Creators });
  const announcements = useSelector(getAnnouncementsByTextSelector.getData);
  const isPending = useSelector(getAnnouncementsByTextSelector.getIsPending);
  const [isSearchValueLongEnough, setIsSearchValueLongEnough] = useState(false);

  const loadOptions = searchString => {
    if (searchString && searchString.length >= 3) {
      dispatch(Creators.getAnnouncementsByTextRequest({ searchString }));
      setIsSearchValueLongEnough(true);
    }
    else {
      setIsSearchValueLongEnough(false);
    }
  };

  const announcementOptions = useMemo(
    () => announcements?.map(item => {
      return {
        value: item?._id,
        label: item?.title[getLangKey()],
      };
    }),
    [announcements],
  );

  const getNotFoundContent = () => {
    if (isPending) return <Spin size="small" />;
    if (!isSearchValueLongEnough) return t('global:SEARCH_RESTAURANT_MIN_CHARACTER');
    return undefined;
  };

  const handleChange = val => {
    if (!val) return onChange(null, null);
    const { label, value: id } = announcementOptions.find(announcement => announcement.value === val);
    return onChange(id, label);
  };

  return (
    <Select
      notFoundContent={getNotFoundContent()}
      placeholder={t('global:ANNOUNCEMENT')}
      value={value}
      onChange={handleChange}
      options={announcementOptions}
      mode={mode}
      onSearch={debounce(loadOptions, DEFAULT_DEBOUNCE_MS)}
      filterOption={false}
      showSearch
      allowClear
      loading={isPending}
      {...otherProps}
    />
  );
};

const reduxKey = REDUX_KEY.SELECT.ANNOUNCEMENTS;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SelectAnnouncement);
