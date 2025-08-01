import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import { createUseStyles } from 'react-jss';

import TagRender from '@app/pages/MarketIntelligencePriceIndex/components/TagRender';
import SelectTitle from '@app/pages/MarketIntelligencePriceIndex/components/SelectTitle';
import DropdownRender from '@app/pages/MarketIntelligencePriceIndex/components/DropdownRender';

import { listSelector } from '@app/pages/MarketIntelligencePriceIndex/redux/selectors';
import { COMPETITORS } from '@app/pages/MarketIntelligencePriceIndex/constants';

import noPicture from '@app/pages/MarketIntelligencePriceIndex/img/assets/no-pictures.png';

const { Option } = Select;

const useStyles = createUseStyles({
  selectCompetitor: { width: '200px' },
  selectCompetitorImage: { width: '2vh' },
  demoOptionLabelItem: { width: '140px', fontSize: '14px' },
  extraOutOf: { color: 'darkgray' },
});

const CompetitorFilter = ({ currentCompetitorList, setCurrentCompetitorList, setBaseCompetitor, isLoading }) => {
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligencePriceIndex');

  const competitorList = useSelector(listSelector.competitorList);

  const [selectedCompetitors, setSelectedCompetitors] = useState(currentCompetitorList);

  useEffect(() => {
    setSelectedCompetitors(currentCompetitorList);
    setBaseCompetitor(currentCompetitorList[0]);
  }, [currentCompetitorList, setBaseCompetitor]);

  const dropdownRender = menu => (DropdownRender(setCurrentCompetitorList, selectedCompetitors, menu, selectedCompetitors.length === 0));
  return (
    <>
      <SelectTitle
        src="competitor"
        description={t('COMPETITORS')}
        extra={(
          <span className={classes.extraOutOf}>
            ({t('OUT_OF_COUNT', {
            currentCompetitor: currentCompetitorList?.length,
            competitorList: competitorList?.length,
          })})
          </span>
        )}
      />
      <Select
        mode="multiple"
        className={classes.selectCompetitor}
        placeholder={t('SELECT_COMPETITOR')}
        defaultValue={selectedCompetitors}
        onChange={value => {
          setSelectedCompetitors(value);
        }}
        value={selectedCompetitors}
        tagRender={TagRender}
        disabled={isLoading}
        dropdownRender={dropdownRender}
      >
        {competitorList.map(competitor => (
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
