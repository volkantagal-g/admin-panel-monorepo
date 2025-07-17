import { useSelector } from 'react-redux';
import { Skeleton } from 'antd';
import { sortBy as _sortBy } from 'lodash';

import {
  getEmployeeEducationSelector,
  getEmployeeDetailsSelector,
} from '../../../redux/selectors';
import EducationForm from './Form';

export default function EducationInfoForm() {
  const educations = useSelector(getEmployeeEducationSelector.getData);
  const isEmployeeDataPending = useSelector(getEmployeeDetailsSelector.getIsPending);
  const isEducationsPending = useSelector(getEmployeeEducationSelector.getIsPending);

  if ((isEmployeeDataPending || isEducationsPending)) {
    return (
      <Skeleton
        paragraph={{ rows: 5 }}
        active
        loading
      />
    );
  }

  return (
    <div>
      {
        educations?.length > 0 && _sortBy(educations, 'level').map((education: any) => (
          <EducationForm mode="edit" education={education} key={education._id} />
        ))
      }
      <EducationForm mode="add" />
    </div>
  );
}
