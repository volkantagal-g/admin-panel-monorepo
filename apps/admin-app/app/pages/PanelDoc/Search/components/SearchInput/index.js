import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Form, Input } from 'antd';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import AnalyticsService from '@shared/services/analytics';
import { PANEL_EVENTS } from '@shared/shared/analyticsConstants';

import { Creators } from '../../redux/actions';
import useStyles from './styles';

const MIN_SEARCH_LENGTH = 3;

export default function SearchInput() {
  const { t } = useTranslation('panelDocSearchPage');

  const [searchText, setSearchText] = useState('');
  const classes = useStyles();
  const dispatch = useDispatch();

  const handler = useCallback(value => {
    if (!value || value.trim().length < MIN_SEARCH_LENGTH) {
      return;
    }
    dispatch(Creators.getPanelDocsByFilterRequest({ filters: { searchText: value } }));
    AnalyticsService.track(PANEL_EVENTS.DOCUMENTATION.EVENT_NAME, { method: PANEL_EVENTS.DOCUMENTATION.BUTTON.DOCUMENTATION_SEARCH });
  }, [dispatch]);

  const { debouncedCallback: onSearch } = useDebouncedCallback({ callback: handler });

  const onChange = event => {
    const { value } = event.target;

    if (!value) {
      dispatch(Creators.setResultShown({ isResultShown: false }));
    }
    setSearchText(value);
    onSearch(value);
  };

  return (
    <Form className={classes.searchContainer}>
      <Form.Item name="searchdocs" className={classes.formItem}>
        <Input
          value={searchText}
          prefix={<SearchOutlined />}
          placeholder={t('SEARCH_PLACEHOLDER')}
          onChange={onChange}
          allowClear
          autoComplete="off"
          className="w-100"
          onFocus={() => {
            dispatch(Creators.setResultShown({ isResultShown: true }));
          }}
        />
      </Form.Item>
    </Form>
  );
}
