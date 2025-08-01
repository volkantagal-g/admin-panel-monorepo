import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '../../redux/actions';
import { getSelector, getSelectorEditBreak } from '../../redux/selector';
import { convertUnderscoreToDot, useFormItems } from '../helpers';

export default function FormGroupEditBreak({ id, children }) {
  const refForm = useRef();
  const dispatch = useDispatch();

  const dataDetail = useSelector(state => getSelector.getData(state));
  const dataForm = useSelector(state => getSelectorEditBreak.getData(state));
  const isDataSaved = useSelector(state => getSelectorEditBreak.getDataIsSaved(state));
  const isDataPending = useSelector(state => getSelectorEditBreak.getDataIsPending(state));

  const formItems = useFormItems(dataForm, dataDetail);

  const formSubmit = useCallback(
    values => {
      dispatch(
        Creators.updateContractBreakRequest({
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
