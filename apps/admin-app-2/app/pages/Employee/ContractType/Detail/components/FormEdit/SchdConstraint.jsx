import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '../../redux/actions';
import { getSelector, getSelectorEditSchdConfig } from '../../redux/selector';
import { convertUnderscoreToDot, useFormItems } from '../helpers';

export default function FormGroupEditSchdContraint({ id, children }) {
  const refForm = useRef();
  const dispatch = useDispatch();

  const dataDetail = useSelector(state => getSelector.getData(state));
  const dataForm = useSelector(state => getSelectorEditSchdConfig.getData(state));
  const isDataSaved = useSelector(state => getSelectorEditSchdConfig.getDataIsSaved(state));
  const isDataPending = useSelector(state => getSelectorEditSchdConfig.getDataIsPending(state));

  const formItems = useFormItems(dataForm, dataDetail);

  const formSubmit = useCallback(
    values => {
      dispatch(
        Creators.updateContractSchdConfigRequest({
          id,
          data: convertUnderscoreToDot(values),
        }),
      );
    },
    [dispatch, id],
  );

  useEffect(() => {
    if (isDataSaved && refForm.current) {
      refForm.current.toggleEditMode(false);
    }
  }, [isDataSaved]);

  return children({ isDataPending, refForm, formItems, formSubmit });
}
