import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

import PropTypes from 'prop-types';

import { getSelectFilterOption } from '@shared/utils/common';
import { getLangKey } from '@shared/i18n';
import { getAnnouncementDetail, getAnnouncementsWithKeyword } from '@shared/api/marketing/clientAppAction';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { statusTypeOptions } from '@shared/containers/Marketing/Select/AnnouncementSelect/constantValues';

const convertAnnouncementOptions = announcements => {
  return announcements?.map(item => ({
    value: item?.id,
    label: `${item?.title} - ${item?.id} - ${statusTypeOptions[item?.status]?.[getLangKey()]}`,
  }));
};

const AnnouncementSelect = ({ fieldName, disabled, onChange, rules, announcementId, selectOnly }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();
  const [isAnnouncementsLoading, setIsAnnouncementsLoading] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const langKey = getLangKey();

  const [isAnnouncementDetailLoading, setIsAnnouncementDetailLoading] = useState(false);

  const searchAnnouncement = value => {
    if (value.length > 3) {
      setIsAnnouncementsLoading(true);
      getAnnouncementsWithKeyword(
        { queryString: value, language: langKey },
      ).then(({ data }) => {
        setAnnouncements(convertAnnouncementOptions(data.content));
      }).catch(error => {
        dispatch(ToastCreators.error({ error }));
      }).finally(() => {
        setIsAnnouncementsLoading(false);
      });
    }
    return false;
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (announcementId) {
      setIsAnnouncementDetailLoading(true);
      getAnnouncementDetail({ id: announcementId, signal: abortController.signal }).then(({ data }) => {
        setAnnouncements(convertAnnouncementOptions([{
          id: data.id,
          title: data?.contents?.details?.[langKey]?.title,
          status: data?.status,
        }]));
      }).catch(error => {
        dispatch(ToastCreators.error({ error }));
      }).finally(() => {
        setIsAnnouncementDetailLoading(false);
      });
    }
    return () => {
      abortController.abort();
    };
  }, [announcementId, dispatch, langKey]);

  const select = (
    <Select
      suffixIcon={(isAnnouncementDetailLoading || isAnnouncementsLoading) &&
        <LoadingOutlined style={{ fontSize: 12 }} spin />}
      disabled={disabled}
      placeholder={`${t('ANNOUNCEMENTS')}`}
      options={announcements}
      autoComplete="off"
      onSearch={debounce(searchAnnouncement, DEFAULT_DEBOUNCE_MS)}
      onChange={onChange}
      showSearch
      filterOption={getSelectFilterOption}
    />
  );
  if (selectOnly) {
    return select;
  }

  return (
    <Form.Item
      name={fieldName}
      label={t('ANNOUNCEMENTS')}
      className="d-inline"
      rules={rules}
      tooltip={t('PLEASE_TYPE_FOR_SEARCH', { letterCount: 4 })}
    >
      {select}
    </Form.Item>
  );
};

export default AnnouncementSelect;

AnnouncementSelect.propTypes = {
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  rules: PropTypes.array,
  announcementId: PropTypes.string,
  selectOnly: PropTypes.bool,
};

AnnouncementSelect.defaultProps = {
  fieldName: undefined,
  disabled: undefined,
  onChange: undefined,
  rules: undefined,
  announcementId: undefined,
  selectOnly: undefined,
};
