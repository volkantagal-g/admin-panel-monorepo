import { Row } from 'antd';
import { useEffect, useRef } from 'react';

import useStyles from './styles';

const useFilters = ({
  siblingFilterConfigs,
  childFilterConfigs,
  localInitialSelectables,
  setLiveSelectables,
  formik,
  fieldName,
  mapSelectablesToOptions,
  // childFilterConfigs needs DynamicFormItems to recursively create more dynamic items
  // since it is recursive, it was causing cyclic dependency, inject itself here to prevent that
  childDynamicFormItems: ChildDynamicFormItems,
}) => {
  const classes = useStyles();
  const prevSiblingFilterValues = useRef({});
  const prevChildFilterValues = useRef({});
  const prevLocalInitials = useRef([]);

  const { values, setFieldValue } = formik;

  useEffect(() => {
    // we need to apply child and sibling filters together to the initialSelectables
    // otherwise removal of any filter fails on live version of selectables
    let filteredSelectables = localInitialSelectables;
    let initialSelectablesChanged = false;
    if (prevLocalInitials.current !== localInitialSelectables) {
      initialSelectablesChanged = true;
      prevLocalInitials.current = localInitialSelectables;
    }
    // if no filter value changed and selectables to be filtered didn't change, don't filter anything
    if (
      !isAnyFilterValueChanged(
        childFilterConfigs,
        siblingFilterConfigs,
        prevChildFilterValues.current,
        prevSiblingFilterValues.current,
        values,
      ) &&
      !initialSelectablesChanged
    ) {
      return;
    }

    // find which filter changed and and what type of filtering will happen
    let fieldSetterFilterValue; // which filter changed
    let fieldSetterUsingValues; // is it just manipulating using values? (ex: one date input sets other date input)
    let fieldSetterUsingSelectables; // or is it using selectables (ex: one dropdown value fills other dropdown)

    if (childFilterConfigs?.length) {
      childFilterConfigs.forEach(filter => {
        const { fieldName: filterFieldName, filterParentSelectables, setRelatedFieldUsingSelectables, setRelatedFieldUsingValues } = filter;
        const filterValue = values[filterFieldName];
        if (filterParentSelectables) {
          filteredSelectables = filterParentSelectables(filteredSelectables, filterValue);
        }
        const prevFilterValue = prevChildFilterValues.current[filterFieldName];
        const filterValueChanged = filterValue !== prevFilterValue;
        if (filterValueChanged && setRelatedFieldUsingSelectables) {
          fieldSetterUsingSelectables = setRelatedFieldUsingSelectables;
          fieldSetterFilterValue = filterValue;
        }
        if (filterValueChanged && setRelatedFieldUsingValues) {
          fieldSetterUsingValues = setRelatedFieldUsingValues;
          fieldSetterFilterValue = filterValue;
        }
        prevChildFilterValues.current[filterFieldName] = filterValue;
      });
    }
    if (siblingFilterConfigs?.length) {
      siblingFilterConfigs.forEach(filter => {
        const { filteredBy, filterSiblingSelectables, setRelatedFieldUsingSelectables, setRelatedFieldUsingValues } = filter;
        const filterValue = values[filteredBy];
        if (filterSiblingSelectables) {
          filteredSelectables = filterSiblingSelectables(filteredSelectables, filterValue);
        }
        const prevFilterValue = prevSiblingFilterValues.current[filteredBy];
        const filterValueChanged = filterValue !== prevFilterValue;
        if (filterValueChanged && setRelatedFieldUsingSelectables) {
          fieldSetterUsingSelectables = setRelatedFieldUsingSelectables;
          fieldSetterFilterValue = filterValue;
        }
        if (filterValueChanged && setRelatedFieldUsingValues) {
          fieldSetterUsingValues = setRelatedFieldUsingValues;
          fieldSetterFilterValue = filterValue;
        }
        prevSiblingFilterValues.current[filteredBy] = filterValue;
      });
    }

    setLiveSelectables(filteredSelectables);
    if (fieldSetterUsingSelectables) {
      const selectablesToBeSet = fieldSetterUsingSelectables(filteredSelectables, fieldSetterFilterValue);
      let valuesToBeSet = selectablesToBeSet;
      // the selectables are already mapped if no map function is given
      if (mapSelectablesToOptions) {
        valuesToBeSet = mapSelectablesToOptions(selectablesToBeSet).map(s => s.value);
      }
      setFieldValue(fieldName, valuesToBeSet);
    }
    if (fieldSetterUsingValues) {
      const prevFieldValueToBeSet = values[fieldName];
      setFieldValue(fieldName, fieldSetterUsingValues(prevFieldValueToBeSet, fieldSetterFilterValue));
    }
  }, [
    values,
    siblingFilterConfigs,
    childFilterConfigs,
    localInitialSelectables,
    setLiveSelectables,
    setFieldValue,
    fieldName,
    mapSelectablesToOptions,
  ]);

  const filterComponents = childFilterConfigs?.length ? (
    <Row gutter={[2, 2]} className={classes.fullWidth}>
      <ChildDynamicFormItems formConfigs={childFilterConfigs} formik={formik} />
    </Row>
  ) : null;

  return { filterComponents };
};

export default useFilters;

function isAnyFilterValueChanged(
  childFilterConfigs = [],
  siblingFilterConfigs = [],
  prevChildFilterValues,
  prevSiblingFilterValues,
  currentValues,
) {
  let result = false;

  result = childFilterConfigs.some(childConfig => {
    const { fieldName } = childConfig;
    return prevChildFilterValues[fieldName] !== currentValues[fieldName];
  });

  // no need to check sibling if true
  if (result) return result;

  result = siblingFilterConfigs.some(siblingConfig => {
    const { filteredBy } = siblingConfig;
    return prevSiblingFilterValues[filteredBy] !== currentValues[filteredBy];
  });

  return result;
}
