import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Collapse, Switch } from 'antd';

import useStyles from './styles';
import Table from './Table';

const { Panel } = Collapse;

const OverallStats = ({ overallStats: { city, country }, currentCityId, currentCountryId, children }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [collapseText, setCollapseText] = useState('');
  const handleCollapseTable = key => {
    setCollapseText(key.length > 0 ? t('artisanLiveMapPage:HIDE_OVERALL_STATS_TABLE') : t('artisanLiveMapPage:SHOW_OVERALL_STATS_TABLE'));
  };

  const [isHeaderShow, setIsHeaderShow] = useState(false);
  const onChange = checked => setIsHeaderShow(checked);

  return (

    <div className={classes.bottomLeft}>
      <Collapse
        defaultActiveKey={[]}
        className={classes.activeOrderAreaWrapper}
        onChange={handleCollapseTable}
        size="small"
        expandIconPosition="right"
      >
        <Panel header={collapseText || t('artisanLiveMapPage:SHOW_OVERALL_STATS_TABLE')} key="0">
          <div className={classes.headerSwitchArea}>
            <span className={classes.headerSwitchText}>{t('artisanLiveMapPage:SHOW_TABLE_HEADERS')}</span>
            <Switch className={classes.headerSwitchButton} onChange={onChange} size="small" />
          </div>
          <Table identifier={city} currentCityId={currentCityId} isHeaderShow={isHeaderShow} />
          <Table identifier={country} currentCountryId={currentCountryId} isHeaderShow={isHeaderShow} />
          {children}
        </Panel>
      </Collapse>
    </div>
  );
};

export default OverallStats;
