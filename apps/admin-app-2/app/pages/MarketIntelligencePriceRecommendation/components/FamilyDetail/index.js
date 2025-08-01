import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Row } from 'antd';

import { listSelector } from '../../redux/selectors';
import FamilyLeadProduct from '../FamilyLeadProduct';
import { FILTER_KEY } from '../../constants';

const FamilyDetail = ({
  classes,
  record,
  setFilters,
  filters,
  setOpenDrawer,
}) => {
  const { t } = useTranslation('marketIntelligencePriceRecommendation');

  const groupedFamilyList = useSelector(listSelector.groupedFamilyList);
  return (
    <>
      <Row>
        {groupedFamilyList[record?.family_id]?.map(item => (
          <FamilyLeadProduct classes={classes} familyData={item} size={1} />
        ))}
      </Row>
      <Row className={classes.flexEndButton}>
        <Button
          type="text"
          onClick={() => {
            setOpenDrawer(true);
            setFilters({
              ...filters,
              [FILTER_KEY.family]: [record?.family_id],
            });
          }}
          className={classes.purpleGetirColor}
        >
          {t('GO_TO_FAMILY', { familyId: record?.family_id })}
        </Button>
      </Row>
    </>
  );
};
export default FamilyDetail;
