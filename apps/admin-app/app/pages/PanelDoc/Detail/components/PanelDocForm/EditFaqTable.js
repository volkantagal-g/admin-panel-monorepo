import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';

import { get } from 'lodash';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getEditFaqsColumns } from './tableConfig';
import useStyles from './styles';

const EditableRow = ({ index, children, rowIndex, insertFaq, isLast, ...props }) => {
  const classes = useStyles();

  return (
    <>
      <tr>
        <td className={classes.buttonTableRow}>
          <Button
            size="small"
            style={{ top: -13 }}
            className={classes.addTableRowButton}
            onClick={() => insertFaq(rowIndex)}
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
              onClick={() => insertFaq(rowIndex + 1)}
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
  faq,
  inputType,
  field,
  isDisabled,
  ...restProps
}) => {
  const { t, setFieldValue, getHandleBlur, removeFaq, index } = faq;

  if (inputType === 'action') {
    return (
      <td {...restProps}><Button size="small" danger onClick={() => removeFaq(index)}>{t('REMOVE')}</Button>
      </td>
    );
  }
  return (
    <td {...restProps}>
      <Form.Item
        style={{ marginTop: 24 }}
        help={get(faq.helps, field)}
        validateStatus={get(faq.helps, field) ? 'error' : 'success'}
        name={['faqs', index, ...field.split('.')]}
      >
        <Input
          value={get(faq, field)}
          onChange={event => {
            const value = get(event, 'target.value', '');
            setFieldValue(`faqs[${index}].${field}`, value);
          }}
          onBlur={getHandleBlur(`faqs[${index}].${field}`)}
          autoComplete="off"
        />
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

export const EditFaqTable = ({
  values,
  touched,
  errors,
  setFieldValue,
  getHandleBlur,
  insertFaq,
  removeFaq,
  isPending,
}) => {
  const { t } = useTranslation(['panelDocDetailPage']);

  const faqs = values.faqs.map((faq, index) => {
    const helps = {
      question: {
        tr: get(touched, `faqs[${index}].question.tr`) && get(errors, `faqs[${index}].question.tr`),
        en: get(touched, `faqs[${index}].question.en`) && get(errors, `faqs[${index}].question.en`),
      },
      answer: {
        tr: get(touched, `faqs[${index}].answer.tr`) && get(errors, `faqs[${index}].answer.tr`),
        en: get(touched, `faqs[${index}].answer.en`) && get(errors, `faqs[${index}].answer.en`),
      },
    };

    return {
      ...faq,
      helps,
      index,
      // have to add these fields to every file, so they can be accessed in <EditableCell />
      setFieldValue,
      getHandleBlur,
      removeFaq,
      values,
      t,
    };
  });

  return (
    <AntTableV2
      onRow={(faq, rowIndex) => ({
        rowIndex,
        isLast: rowIndex === faqs.length - 1,
        insertFaq,
      })}
      rowKey={faq => faq._id || faq.fakeId}
      components={components}
      data={faqs}
      columns={getEditFaqsColumns(t)}
      loading={isPending}
      footer={null}
      scroll={null}
    />
  );
};
