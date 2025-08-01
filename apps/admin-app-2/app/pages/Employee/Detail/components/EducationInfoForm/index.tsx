import { useSelector } from 'react-redux';
import {
  Card,
  Skeleton,
} from 'antd';
import { orderBy as _orderBy } from 'lodash';
import { useTranslation } from 'react-i18next';

import {
  educationsSelector,
  employeeSelector,
  mainSelector,
} from '../../redux/selectors';
import useStyles from '../../styles';
import EducationForm from './Form';

const EducationInfoFormSection = () => {
  const { t } = useTranslation(['employeePage']);
  const classes = useStyles();
  const isFirstLoadDone = useSelector(mainSelector.getIsFirstLoadDone);
  const isEmployeeDataPending = useSelector(employeeSelector.getIsPending);
  const educations = useSelector(educationsSelector.getData);
  const isEducationsPending = useSelector(educationsSelector.getIsPending);

  if (!isFirstLoadDone && (isEmployeeDataPending || isEducationsPending)) {
    return (
      <Skeleton
        paragraph={{ rows: 5 }}
        active
        loading
      />
    );
  }

  return (
    <Card
      bordered
      className={classes.cardContainer}
      title={t('employeePage:EDUCATIONAL_INFORMATION')}
    >
      {
        educations?.length > 0 && _orderBy(educations, ['graduationYear', 'level'], ['desc', 'desc']).map((education: any) => (
          <EducationForm mode="edit" education={education} key={education._id} />
        ))
      }
      <EducationForm mode="add" />
    </Card>
  );
};

export default EducationInfoFormSection;
