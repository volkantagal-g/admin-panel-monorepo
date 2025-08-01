import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import SelectTitle from '../SelectTitle';

import { COMPETITORS } from '../../constants';
import { stateSelector } from '../../redux/selectors';

import noPicture from '@app/pages/MarketIntelligencePriceRecommendation/img/no-pictures.png';

const { Option } = Select;
const useStyles = createUseStyles({
  baseCompetitorSelect: { width: '150px' },
  baseCompetitorImage: {
    width: '17px',
    marginRight: '4px',
    marginBottom: '4px',
  },
  demoOptionLabelItem: { fontSize: '12px' },
});

const BaseCompetitor = ({
  currentCompetitorList,
  baseCompetitor,
  setBaseCompetitor,
}) => {
  const classes = useStyles();
  const { t } = useTranslation('marketIntelligencePriceRecommendation');

  const isLoadingCompetitorFilter = useSelector(
    stateSelector.isLoadingCompetitorFilter,
  );

  return (
    <>
      <SelectTitle src="competitor" description={t('BASE_COMPETITOR')} />
      <Select
        className={classes.baseCompetitorSelect}
        placeholder={t('SELECT_BASE_COMPETITOR')}
        defaultValue={[currentCompetitorList]}
        onChange={value => {
          setBaseCompetitor(value);
        }}
        value={[baseCompetitor]}
        disabled={isLoadingCompetitorFilter}
      >
        {currentCompetitorList &&
          currentCompetitorList.map(competitor => (
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
