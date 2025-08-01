import { useState, useEffect } from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import SelectTitle from '../SelectTitle';
import { competitors } from '../../constants';
import useStyles from '@app/pages/MarketIntelligenceProducts/styles';
import noPicture from '@app/pages/MarketIntelligencePriceIndex/img/assets/no-pictures.png';

const { Option } = Select;

const CompetitorSelect = ({ currentCompetitor, setCurrentCompetitor, loading, currentCompetitorList }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligenceProducts');

  const [selectedCompetitor, setSelectedCompetitor] = useState(currentCompetitor);

  useEffect(() => {
    setSelectedCompetitor(currentCompetitor);
  }, [currentCompetitor]);

  return (
    <>
      <SelectTitle src="competitor" description={t('COMPETITOR')} />
      <Select
        className={classes.selectComponent}
        placeholder={t('SELECT_COMPETITOR')}
        defaultValue={competitors[selectedCompetitor] ? competitors[selectedCompetitor][0] : 'Select Competitor'}
        onChange={value => {
          setSelectedCompetitor(value);
          setCurrentCompetitor(value);
        }}
        value={competitors[selectedCompetitor] ? competitors[selectedCompetitor][0] : selectedCompetitor}
        disabled={loading}
      >
        {currentCompetitorList?.map(competitor => (
          <Option key={competitor} value={competitor} label={competitor}>
            <div className={classes.demoOptionLabel}>
              {competitors[competitor] ? (
                <>
                  <img
                    alt={competitor}
                    src={competitors[competitor][1]}
                    className={classes.competitorSelectImg}
                  />
                  {competitors[competitor][0]}
                </>
              ) : (
                <>
                  <img
                    alt={competitor}
                    src={noPicture}
                    className={classes.competitorSelectImg}
                  />
                  {competitor}
                </>
              )}
            </div>
          </Option>
        ))}
      </Select>
    </>
  );
};
export default CompetitorSelect;
