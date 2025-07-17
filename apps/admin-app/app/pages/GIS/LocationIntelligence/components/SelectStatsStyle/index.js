import { Col, Radio, Row } from 'antd';
import { uniqueId } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getNormalizedValues } from '../../utils/helper';
import useStyles from './styles';

const SelectStatsStyle = props => {
  const { t } = useTranslation('gisLocationIntelligencePage');
  const { onSelect, selectableTypes, allStatTypes, isDisabled, statsFilters } = props;
  const [types, setTypes] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState();
  const classes = useStyles();

  useEffect(() => {
    const normalizedValues = allStatTypes?.map(type => getNormalizedValues({
      type,
      startDate: statsFilters.dateStart,
      endDate: statsFilters.dateEnd,
    }));
    const buttons = normalizedValues?.filter(stat => selectableTypes?.find(type => stat.type === type));
    setTypes(buttons);
    setSelectedStyle(buttons?.[0]);
    onSelect(buttons?.[0]);
  }, [allStatTypes, onSelect, selectableTypes, statsFilters.dateEnd, statsFilters.dateStart]);

  const onChange = e => {
    const { value } = e.target;
    setSelectedStyle(value);
    onSelect(value);
  };

  return (
    <Radio.Group
      className={classes.radioWrapper}
      onChange={onChange}
      buttonStyle="solid"
      value={selectedStyle}
    >
      <Row gutter={[16]}>
        {types?.map(analyticType => {
          const label = t(`STAT_TYPES.${analyticType.type}`);
          return (
            <Col key={uniqueId()} span={12}>
              <Radio.Button
                className={classes.radioButton}
                value={analyticType}
                data-testid={`${analyticType.type}-stat-button`}
                disabled={isDisabled}
                onClick={() => {
                  if (selectedStyle?.styles === analyticType?.styles) {
                    onSelect(undefined);
                    setSelectedStyle(undefined);
                  }
                }}
              >
                {label}
              </Radio.Button>
            </Col>
          );
        })}
      </Row>
    </Radio.Group>
  );
};

export default SelectStatsStyle;
