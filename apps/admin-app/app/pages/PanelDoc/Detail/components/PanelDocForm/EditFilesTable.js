import { Button, Form, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';

import { get } from 'lodash';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getEditFilesColumns } from './tableConfig';
import { langKeys, langKeysOptions } from './formHelper';
import { getSelectFilterOption } from '@shared/utils/common';
import FileInput from './FileInput';
import useStyles from './styles';

const EditableRow = ({ index, children, rowIndex, insertFile, isLast, ...props }) => {
  const classes = useStyles();

  return (
    <>
      <tr>
        <td className={classes.buttonTableRow}>
          <Button
            size="small"
            style={{ top: -13 }}
            className={classes.addTableRowButton}
            onClick={() => insertFile(rowIndex)}
          ><PlusOutlined />
          </Button>
        </td>
      </tr>
      <tr {...props}>
        {children}
      </tr>
      {isLast && (
        <tr>
          <td className={classes.buttonTableRow}>
            <Button
              size="small"
              style={{ bottom: -11 }}
              className={classes.addTableRowButton}
              onClick={() => insertFile(rowIndex + 1)}
            ><PlusOutlined />
            </Button>
          </td>
        </tr>
      )}
    </>
  );
};

const EditableCell = ({
  children,
  file,
  inputType,
  field,
  isDisabled,
  ...restProps
}) => {
  const { t, values, setFieldValue, getHandleBlur, onFileUpload, removeFile, index } = file;
  const classes = useStyles();

  if (inputType === 'action') {
    return (
      <td {...restProps}><Button size="small" danger onClick={() => removeFile(index)}>{t('REMOVE')}</Button>
      </td>
    );
  }
  let input = '';
  if (inputType === 'select') {
    input = (
      <Select
        value={get(file, field)}
        onChange={ids => {
          langKeys.forEach(langKey => {
            if (!ids.includes(langKey)) setFieldValue(`files[${index}].title.${langKey}`, '');
          });

          setFieldValue(`files[${index}].${field}`, ids);
        }}
        mode="multiple"
        options={langKeysOptions}
        filterOption={getSelectFilterOption}
        placeholder={t('FILE_LANG_KEYS_PLACEHOLDER')}
        onBlur={getHandleBlur(`files[${index}].${field}`)}
        showSearch
        allowClear
      />
    );
  }
  if (inputType === 'text') {
    input = (
      <Input
        value={get(file, field)}
        onChange={event => {
          const value = get(event, 'target.value', '');
          setFieldValue(`files[${index}].${field}`, value);
        }}
        onBlur={getHandleBlur(`files[${index}].${field}`)}
        autoComplete="off"
        disabled={isDisabled(values, index)}
      />
    );
  }
  if (inputType === 'file') {
    input = (
      <FileInput
        onChange={e => onFileUpload(e, index)}
        fileKey={file.fileKey}
        onBlur={getHandleBlur(`files[${index}].${field}`)}
        onSoftRemove={() => {
          values.files[index].softRemoved = true;
        }}
        onCancelEdit={() => {
          values.files[index].softRemoved = false;
        }}
      />
    );
  }

  return (
    <td {...restProps}>
      <Form.Item
        style={{ marginTop: 24 }}
        help={get(file.helps, field)}
        validateStatus={get(file.helps, field) ? 'error' : 'success'}
        name={['files', index, ...field.split('.')]}
        className={inputType === 'file' ? classes.fileFormItem : ''}
      >
        {input}
      </Form.Item>
    </td>
  );
};

const components = {
  body: {
    row: EditableRow,
    cell: EditableCell,
  },
};

export const EditFilesTable = ({
  values,
  touched,
  errors,
  setFieldValue,
  getHandleBlur,
  onFileUpload,
  insertFile,
  removeFile,
  isPending,
}) => {
  const { t } = useTranslation(['panelDocDetailPage']);

  const files = values.files.map((file, index) => {
    const helps = {
      langKeys: get(touched, `files[${index}].langKeys`) && get(errors, `files[${index}].langKeys`),
      title: {
        tr: get(touched, `files[${index}].title.tr`) && get(errors, `files[${index}].title.tr`),
        en: get(touched, `files[${index}].title.en`) && get(errors, `files[${index}].title.en`),
      },
      data: get(touched, `files[${index}].data`) && get(errors, `files[${index}].data`),
    };

    return {
      ...file,
      helps,
      index,
      // have to add these fields to every file, so they can be accessed in <EditableCell />
      setFieldValue,
      getHandleBlur,
      onFileUpload,
      removeFile,
      values,
      t,
    };
  });

  return (
    <AntTableV2
      onRow={(record, rowIndex) => ({
        rowIndex,
        isLast: rowIndex === files.length - 1,
        insertFile,
      })}
      rowKey={file => file._id || file.fakeId}
      components={components}
      data={files}
      columns={getEditFilesColumns(t)}
      loading={isPending}
      footer={null}
      scroll={null}
    />
  );
};
