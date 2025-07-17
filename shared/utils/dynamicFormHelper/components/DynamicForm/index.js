/* eslint-disable no-param-reassign */
import { Fragment, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Popconfirm, Button } from 'antd';
import { useFormik, FormikProvider, Form } from 'formik';
import { chunk, cloneDeep, set } from 'lodash';

import useDependentFormItemValueHasChanged from '@shared/utils/dynamicFormHelper/hooks/useDependentFormItemValueHasChanged';
import { renderFields } from '../../config';
import { getTranslatedText } from '../../helpers';
import { yupSchemaCreator } from '../../createYupSchema';
import { FormTypes } from './constants';
import useStyles from './styles';

const DynamicForm = forwardRef(({
  t,
  id,
  type,
  isPending,
  formItems,
  formSubmit,
  dependencyList = [],
  dependencyChangeHandler = () => null,
  warningHeader = null,
  actionButtons = null,
}, ref) => {
  const classes = useStyles();

  const [isEditModeActive, setIsEditModeActive] = useState(false);
  const [localFormItems, setLocalFormItems] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const [validationSchema, setValidationSchema] = useState({});

  useEffect(() => {
    let clonedFormItems = cloneDeep(formItems);
    if (type === FormTypes.EDIT || type === FormTypes.READONLY) {
      clonedFormItems = clonedFormItems?.map(group => {
        group.children.map(item => {
          item.initialEditable = item.editable;
          item.editable = false;
          return item;
        });
        return group;
      });
    }
    const tempInitialValues = {};
    clonedFormItems?.forEach(group => {
      group.children.forEach(item => {
        set(tempInitialValues, item.name, item.initialValue);
      });
    });
    setInitialValues(tempInitialValues);
    setValidationSchema(yupSchemaCreator(t, clonedFormItems));
    setLocalFormItems(clonedFormItems);
  }, [t, formItems, type]);

  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      formSubmit(values);
    },
    validationSchema,
    enableReinitialize: true,
    validateOnChange: false,
  });

  useDependentFormItemValueHasChanged(dependencies => {
    dependencyChangeHandler(dependencies);
  }, [formik?.values, dependencyList]);

  const toggleEditableFormItems = mode => {
    setLocalFormItems(localFormItems.map(group => {
      group.children.map(item => {
        item.editable = mode && item.initialEditable;
        return item;
      });
      return group;
    }));
  };

  const handleToggleEditMode = mode => {
    setIsEditModeActive(mode);
    toggleEditableFormItems(mode);
    if (!mode) {
      formik.handleReset();
    }
  };

  useImperativeHandle(ref, () => ({
    getFormik: () => formik,
    toggleEditMode: handleToggleEditMode,
  }));

  return (
    <FormikProvider value={formik}>
      <Form id={id} data-testid={id} onSubmit={formik.handleSubmit}>

        {warningHeader}

        {
          localFormItems?.map((group, gIdx) => {
            let key = getTranslatedText(t, group.name) || group.id;
            const groupName = getTranslatedText(t, group.groupName);
            key = key || groupName || gIdx;
            const chunkSize = Math.ceil(group.children.length / (group?.columns || 1));
            return (
              <div key={key}>

                {groupName && <h3 className={classes.header}>{groupName}</h3>}

                <div className={classes.formContainer} key={key}>
                  {
                    chunk(group.children, chunkSize).map((chunkedGroupItems, idx) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <div className={classes.row} key={`${key}_${idx}`}>
                        {chunkedGroupItems.map(item => (
                          <Fragment key={getTranslatedText(t, item.name)}>
                            {renderFields({ formItem: item, isDisabled: isPending, t })}
                          </Fragment>
                        ))}
                      </div>
                    ))
                  }
                </div>

              </div>
            );
          })
        }

        {
          type === FormTypes.CREATE && (
            <div className={classes.buttonContainer}>
              <Button
                className={classes.button}
                disabled={isPending}
                size="small"
                type="primary"
                htmlType="submit"
              >
                {getTranslatedText(t, 'SUBMIT')}
              </Button>
            </div>
          )
        }

        {
          type === FormTypes.EDIT && (
            !isEditModeActive
              ? (
                <div className={classes.buttonContainer}>
                  <Button
                    className={classes.button}
                    disabled={isPending}
                    size="small"
                    onClick={() => handleToggleEditMode(true)}
                  >
                    {getTranslatedText(t, 'EDIT')}
                  </Button>
                </div>
              )
              : (
                <div className={classes.buttonContainer}>
                  <Popconfirm
                    placement="topRight"
                    title={getTranslatedText(t, 'PERSON_FORM.ACTIONS.CONFIRM.UPDATE')}
                    okText={getTranslatedText(t, 'PERSON_FORM.ACTIONS.OK')}
                    cancelText={getTranslatedText(t, 'PERSON_FORM.ACTIONS.CANCEL')}
                    onConfirm={formik.handleSubmit}
                  >
                    <Button type="success" size="small">{getTranslatedText(t, 'SAVE')}</Button>
                  </Popconfirm>

                  <Button size="small" className={classes.button} onClick={() => handleToggleEditMode(false)}>
                    {getTranslatedText(t, 'CANCEL')}
                  </Button>
                </div>
              )
          )
        }
        {actionButtons}
      </Form>
    </FormikProvider>
  );
});

export default DynamicForm;
