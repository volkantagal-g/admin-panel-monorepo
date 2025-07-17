import { Button } from 'antd';
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { CloudDownloadOutlined } from '@ant-design/icons';

import AntSelect from '@shared/components/UI/AntSelect';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { crisisMgmtTopics } from '../../../../helpers';
import useStyles from './styles';
import { Creators } from '../../redux/actions';

const ListHeader = ({ disabled = false, onNew, handleExport }) => {
  const classes = useStyles();
  const { Can } = usePermission();
  const dispatch = useDispatch();
  const [topics, setTopic] = useState(undefined);
  const { t } = useTranslation('pickerDetailPage');

  const handleSearch = useCallback(() => {
    dispatch(Creators.changePickerCrisesFilters({ topics }));
  }, [topics, dispatch]);

  return (
    <div className={classes.root}>
      <AntSelect
        allowClear
        value={topics}
        mode="multiple"
        onChange={setTopic}
        data-testid="topic"
        disabled={disabled}
        maxTagCount="responsive"
        options={crisisMgmtTopics}
        className={classes.topicMenu}
        placeholder={t('CRISIS_MGMT.SELECT_TOPIC')}
      />
      <div className={classes.controls}>
        <Button disabled={disabled} onClick={handleSearch}>
          {t('global:BRING')}
        </Button>

        <Button
          disabled={disabled}
          onClick={handleExport}
          icon={<CloudDownloadOutlined />}
        >
          {t('global:EXPORT_EXCEL')}
        </Button>

        <Can
          key="createPickerCrisis"
          permKey={permKey.PAGE_PICKER_DETAIL_COMPONENT_CRISIS_MANAGEMENT_CREATE}
        >
          <Button type="primary" disabled={disabled} onClick={onNew}>
            {t('CRISIS_MGMT.NEW_CARD')}
          </Button>
        </Can>
      </div>
    </div>
  );
};

export default ListHeader;
