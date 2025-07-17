import { Form } from 'antd';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Creators } from '../redux/actions';

export const useMatchSupplierForm = () => {
  const dispatch = useDispatch();
  const [matchedForm] = Form.useForm();
  const [unmatchedForm] = Form.useForm();

  const handleMatchedFormChange = useCallback((_, allValues) => {
    dispatch(Creators.updateSearchValue('matched', allValues.matchedSearch || ''));
  }, [dispatch]);

  const handleUnmatchedFormChange = useCallback((_, allValues) => {
    dispatch(Creators.updateSearchValue('unmatched', allValues.unmatchedSearch || ''));
  }, [dispatch]);

  const resetForms = useCallback(() => {
    matchedForm.resetFields();
    unmatchedForm.resetFields();
    dispatch(Creators.resetForms());
  }, [dispatch, matchedForm, unmatchedForm]);

  const validateForms = useCallback(async () => {
    try {
      await Promise.all([
        matchedForm.validateFields(),
        unmatchedForm.validateFields(),
      ]);
      return true;
    }
    catch (error) {
      return false;
    }
  }, [matchedForm, unmatchedForm]);

  return {
    matchedForm,
    unmatchedForm,
    handleMatchedFormChange,
    handleUnmatchedFormChange,
    resetForms,
    validateForms,
  };
};
