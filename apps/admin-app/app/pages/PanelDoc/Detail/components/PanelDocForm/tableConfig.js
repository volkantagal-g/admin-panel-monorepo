import { List, Tag } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';

export const getEditFilesColumns = t => [
  {
    title: t('LANGUAGES'),
    dataIndex: 'langKeys',
    key: 'langKeys',
    onCell: file => ({
      file,
      inputType: 'select',
      field: 'langKeys',
    }),
  },
  {
    title: `${t('FORM.TITLE')} (TR)`,
    dataIndex: 'title.tr',
    key: 'title.tr',
    onCell: file => ({
      file,
      inputType: 'text',
      field: 'title.tr',
      isDisabled: (values, index) => !get(values, `files[${index}].langKeys`, []).includes('tr'),
    }),
  },
  {
    title: `${t('FORM.TITLE')} (EN)`,
    dataIndex: 'title.en',
    key: 'title.en',
    onCell: file => ({
      file,
      inputType: 'text',
      field: 'title.en',
      isDisabled: (values, index) => !get(values, `files[${index}].langKeys`, []).includes('en'),
    }),
  },
  {
    title: t('FORM.FILE'),
    dataIndex: 'file',
    key: 'file',
    onCell: file => ({
      file,
      inputType: 'file',
      field: 'data',
    }),
  },
  {
    title: t('ACTION'),
    dataIndex: 'action',
    key: 'action',
    width: 75,
    onCell: file => ({
      file,
      inputType: 'action',
    }),
  },
];

export const getEditFaqsColumns = t => [
  {
    title: `${t('FORM.QUESTION')} (TR)`,
    dataIndex: 'question.tr',
    key: 'question.tr',
    onCell: faq => ({
      faq,
      inputType: 'text',
      field: 'question.tr',
    }),
  },
  {
    title: `${t('FORM.ANSWER')} (TR)`,
    dataIndex: 'answer.tr',
    key: 'answer.tr',
    onCell: faq => ({
      faq,
      inputType: 'text',
      field: 'answer.tr',
    }),
  },
  {
    title: `${t('FORM.QUESTION')} (EN)`,
    dataIndex: 'question.en',
    key: 'question.en',
    onCell: faq => ({
      faq,
      inputType: 'text',
      field: 'question.en',
    }),
  },
  {
    title: `${t('FORM.ANSWER')} (EN)`,
    dataIndex: 'answer.en',
    key: 'answer.en',
    onCell: faq => ({
      faq,
      inputType: 'text',
      field: 'answer.en',
    }),
  },
  {
    title: t('ACTION'),
    dataIndex: 'action',
    key: 'action',
    width: 75,
    onCell: faq => ({
      faq,
      inputType: 'action',
    }),
  },
];

export const getFilesColumns = (t, tableFileNameClass) => [
  {
    title: t('FORM.TITLE'),
    dataIndex: 'title',
    key: 'title',
    render: (title, record) => {
      // fall back to foreign title if there isn't one in the selected language
      const selectedTitle = title[getLangKey()] || Object.values(title)[0];
      return (
        <List.Item.Meta
          avatar={<FileTextOutlined style={{ fontSize: '1.4rem', color: '#5D3EBC' }} />}
          title={(
            <a
              href={record.url}
              target="_blank"
              style={{ fontSize: '1.2rem' }}
              title={selectedTitle}
              className={tableFileNameClass}
              rel="noreferrer"
            >{selectedTitle}
            </a>
          )}
        />
      );
    },
  },
  {
    title: t('LANGUAGES'),
    dataIndex: 'langKeys',
    key: 'langKeys',
    render: langKeys => {
      return (
        <div>
          {langKeys.map(langKey => {
            return (
              <Tag key={langKey}>
                {langKey.toUpperCase()}
              </Tag>
            );
          }).reduce((prev, curr) => [prev, ' ', curr])}
        </div>
      );
    },
  },
];
