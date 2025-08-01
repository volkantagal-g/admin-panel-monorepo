import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import { createUseStyles } from 'react-jss';

import SelectTitle from '@app/pages/MarketIntelligencePriceIndex/components/SelectTitle';
import { COMPETITORS } from '@app/pages/MarketIntelligencePriceIndex/constants';

import noPicture from '@app/pages/MarketIntelligencePriceIndex/img/assets/no-pictures.png';

const { Option } = Select;
const useStyles = createUseStyles({
  baseCompetitorSelect: { width: '150px' },
  baseCompetitorImage: { width: '20px', marginRight: '4px' },
  demoOptionLabelItem: { fontSize: '12px' },
});

const BaseCompetitor = params => {
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligencePriceIndex');

  const { currentCompetitorList, baseCompetitor, setBaseCompetitor, isLoading } = params;

  return (
    <>
      <SelectTitle src="competitor" description={t('BASE_COMPETITOR')} />
      <Select
        className={classes.baseCompetitorSelect}
        placeholder={t('SELECT_BASE_COMPETITOR')}
        defaultValue={currentCompetitorList && COMPETITORS[currentCompetitorList[0]] && COMPETITORS[currentCompetitorList[0]][0]}
        onChange={value => setBaseCompetitor(value)}
        value={[baseCompetitor]}
        disabled={isLoading}
      >
        {currentCompetitorList.map(competitor => (
          <Option key={competitor} value={competitor} label={competitor}>
            <div className={classes.demoOptionLabelItem}>
              {COMPETITORS[competitor] ? (
                <>
                  <img
                    alt={t('COMPETITORS')}
                    src={COMPETITORS[competitor][1]}
                    className={classes.baseCompetitorImage}
                  />
                  {COMPETITORS[competitor][0]}
                </>
              ) : (
                <>
                  <img
                    alt={t('COMPETITORS')}
                    src={noPicture}
                    className={classes.baseCompetitorImage}
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

export default BaseCompetitor;
