import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Creators } from '../redux/actions';

export const INITIAL_FORM_VALUES = {
  introductionDate: null,
  terminationDate: null,
  batchSize: undefined,
  moq: undefined,
  minStock: undefined,
  segment: null,
  segment2: null,
  pickedToZero: false,
  enabled: false,
};

export const useChainDetail = () => {
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);

  useEffect(() => {
    dispatch(Creators.initPage());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  const handleEditClick = () => {
    setIsEditMode(true);
    dispatch(Creators.setEditMode(true));
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
    dispatch(Creators.setEditMode(false));
    setFormValues(INITIAL_FORM_VALUES);
  };

  const handleSaveClick = () => {
    // Save işlemi form submit ile yapılacak
  };

  return {
    isEditMode,
    formValues,
    setFormValues,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
  };
};
