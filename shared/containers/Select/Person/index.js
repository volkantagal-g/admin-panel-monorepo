import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { Select } from 'antd';

import { t } from '@shared/i18n';
import { REDUX_KEY } from '@shared/shared/constants';
import { selectOptionsSearch, convertSelectOptions } from '@shared/utils/common';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { Creators } from './redux/actions';
import { getPeopleSelector } from './redux/selectors';
import saga from './redux/saga';
import reducer from './redux/reducer';
import useStyles from './styles';

const SelectPerson = ({ franchiseId, value, onChange, disabled, allowClear = true }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const people = useSelector(getPeopleSelector.getData);

  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(Creators.getPeopleRequest({ franchiseId }));

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [franchiseId, dispatch]);

  return (
    <Select
      value={value}
      options={convertSelectOptions(people, { valueKey: '_id', labelKey: 'name' })}
      onChange={onChange}
      allowClear={allowClear}
      showSearch
      filterOption={selectOptionsSearch}
      disabled={disabled}
      placeholder={t("global:FILTER")}
      className={classes.personSelect}
    />
  );
};

const reduxKey = REDUX_KEY.SELECT.PERSON;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(SelectPerson);
