import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '../../redux/actions';
import { getSelector, getSelectorEditCompensation } from '../../redux/selector';
import { convertUnderscoreToDot, useFormItems } from '../helpers';

export default function FormGroupEditCompensation({ id, children }) {
  const refForm = useRef();
  const dispatch = useDispatch();

  const dataDetail = useSelector(state => getSelector.getData(state));
  const dataForm = useSelector(state => getSelectorEditCompensation.getData(state));
  const isDataSaved = useSelector(state => getSelectorEditCompensation.getDataIsSaved(state));
  const isDataPending = useSelector(state => getSelectorEditCompensation.getDataIsPending(state));

  const formItems = useFormItems(dataForm, dataDetail);

  const formSubmit = useCallback(
    values => {
      dispatch(
        Creators.updateContractCompRequest({
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
