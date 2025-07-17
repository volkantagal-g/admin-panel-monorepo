import { Button, Form } from 'antd';

import { t } from '@shared/i18n';
import EditableCellForm from './EditableCellForm';

export const tableColumns = (editableRow, setEditableRow, isDisabled) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formInstance] = Form.useForm();
  return ([
    {
      title: t('global:NAME'),
      dataIndex: 'name',
      key: 'name',
      render: name => {
        return name;
      },
    },
    {
      title: t('supplierPage:LOGO_ACCOUNT_CODE'),
      dataIndex: 'code',
      key: 'code',
      render: code => {
        return code;
      },
    },
    {
      title: t('supplierPage:DISTRIBUTION_CENTER_BONUS'),
      key: 'dcBonus',
      render: obj => {
        const isEditable = editableRow === obj._id;
        return isEditable ? EditableCellForm({
          formInstance,
          _id: obj._id,
          supplierAccount: obj,
          setEditableRow,
        }) : obj.dcBonus;
      },
    },
    {
      title: t('global:ACTION'),
      align: 'right',
      render: ({ _id }) => {
        const action = {
          onEditClick: () => {
            setEditableRow(_id);
          },
          onSave: () => {
            formInstance.submit();
          },
          onCancel: () => {
            setEditableRow(false);
          },
        };

        const isEditable = editableRow === _id;

        return isEditable ? (
          <>
            <Button type="default" className="mr-1" size="small" onClick={action.onCancel}>
              {t('button:CANCEL')}
            </Button>
            <Button type="primary" size="small" onClick={action.onSave}>
              {t('button:SAVE')}
            </Button>
          </>
        ) : (
          <Button type="default" size="small" onClick={action.onEditClick} disabled={isDisabled}>
            {t('button:EDIT')}
          </Button>
        );
      },
    },
  ]);
};
