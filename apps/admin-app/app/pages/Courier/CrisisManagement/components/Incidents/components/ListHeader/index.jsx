import { Button } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CloudDownloadOutlined } from '@ant-design/icons';

import AntSelect from '@shared/components/UI/AntSelect';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { crisisMgmtTopics } from '../../../../helpers';
import useStyles from './styles';

const ListHeader = ({ disabled = false, onNew, handleExport, handleFilterChange }) => {
  const classes = useStyles();
  const { Can } = usePermission();
  const [topics, setTopic] = useState(undefined);
  const { t } = useTranslation('courierPage');

  const handleSearch = () => {
    handleFilterChange({ topics });
  };

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
          key="createCourierCrisis"
          permKey={permKey.PAGE_COURIER_DETAIL_CRISIS_MGMT_CREATE}
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
