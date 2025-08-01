import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import { createUseStyles } from 'react-jss';
import { useTranslation } from 'react-i18next';

import TagRender from '../TagRender';
import SelectTitle from '../SelectTitle';

import { listSelector, stateSelector } from '../../redux/selectors';
import { COMPETITORS } from '../../constants';

import noPicture from '@app/pages/MarketIntelligencePriceRecommendation/img/no-pictures.png';

const { Option } = Select;

const useStyles = createUseStyles({
  selectCompetitor: { width: '20vh' },
  selectCompetitorImage: { width: '2vh' },
  demoOptionLabelItem: { width: '140px', fontSize: '14px' },
});

const CompetitorFilter = ({
  currentCompetitorList,
  setCurrentCompetitorList,
  setBaseCompetitor,
}) => {
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligencePriceRecommendation');

  const isLoadingCompetitorFilter = useSelector(
    stateSelector.isLoadingCompetitorFilter,
  );
  const competitorList = useSelector(listSelector.competitorList);

  const [selectedCompetitors, setSelectedCompetitors] = useState(
    currentCompetitorList,
  );

  useEffect(() => {
    setSelectedCompetitors(currentCompetitorList);
    setBaseCompetitor(currentCompetitorList[0]);
  }, [currentCompetitorList, setBaseCompetitor]);

  return (
    <>
      <SelectTitle
        src="competitor"
        description={t('COMPETITORS')}
        extra={(
          <span style={{ color: 'darkgray' }}>
            ({currentCompetitorList?.length} out of {competitorList?.length})
          </span>
        )}
      />
      <Select
        mode="multiple"
        className={classes.selectCompetitor}
        placeholder={t('SELECT_COMPETITORS')}
        defaultValue={selectedCompetitors}
        onChange={value => {
          setSelectedCompetitors(value);
          setCurrentCompetitorList(value);
        }}
        value={selectedCompetitors}
        tagRender={TagRender}
        disabled={isLoadingCompetitorFilter}
      >
        {competitorList?.map(competitor => (
          <Option value={competitor} label={competitor}>
            <div className={classes.demoOptionLabelItem}>
              {COMPETITORS[competitor] ? (
                <>
                  <img
                    alt={t('COMPETITOR')}
                    src={COMPETITORS[competitor][1]}
                    className={classes.selectCompetitorImage}
                  />
                  {COMPETITORS[competitor][0]}
                </>
              ) : (
                <>
                  <img
                    alt={t('COMPETITOR')}
                    src={noPicture}
                    className={classes.selectCompetitorImage}
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

export default CompetitorFilter;
