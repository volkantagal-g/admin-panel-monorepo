import { get, isFinite } from 'lodash';

import { getLangKey, t } from '@shared/i18n';
import Image from '@shared/components/UI/Image';
import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import EditableCellForm from './EditableCellForm';
import { currencyFormat } from '@shared/utils/localization';

export const getTableColumns = ({ isTableEditable, onInputChange, formInstance }) => {
  const columns = [
    {
      title: t('global:IMAGE'),
      dataIndex: 'picURL',
      key: 'picURL',
      width: 60,
      render: (picURL, { _id }) => {
        const newPicURL = get(picURL, [getLangKey()]);
        return (
          <Image src={newPicURL} height={32} alt={`marketProductImage-${_id}`} />
        );
      },
    },
    {
      title: t('global:ID'),
      dataIndex: '_id',
      key: '_id',
      width: 180,
      render: _id => {
        return (_id && <CopyToClipboard message={_id} />);
      },
    },
    {
      title: t('global:NAME_1'),
      dataIndex: 'fullName',
      key: 'fullName',
      width: 300,
      render: fullName => {
        return get(fullName, [getLangKey()], '');
      },
    },
    {
      title: t('PRICE'),
      dataIndex: 'price',
      key: 'price',
      width: 60,
      render: price => {
        return isFinite(price) && `${currencyFormat().format(price)}`;
      },
    },
    {
      title: t('ORDER'),
      dataIndex: 'order',
      key: 'order',
      width: 80,
      render: (order, record) => {
        if (!isTableEditable) {
          return order;
        }
        return (
          <EditableCellForm
            formInstance={formInstance}
            fieldKey={record?._id}
            initialValue={record?.order}
            onInputChange={onInputChange}
          />
        );
      },
    },
  ];

  return columns;
};

const specialCharactersRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g;

export const createNewCSVFileWithGroupIdColumn = (file, marketGroupId) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const formattedLines = reader.result
        .split('\n')
        .map(line => line
          .replace(specialCharactersRegex, '')
          .trim())
        .filter(line => line);

      if (formattedLines.length < 2 || formattedLines[0] !== 'productId') {
        reject(new Error(t('INVALID_CSV')));
      }

      const newLines = formattedLines.map((line, index) => {
        if (index === 0) {
          return 'productId;productGroupingId';
        }

        return `${line};${marketGroupId}`;
      });

      const newCsvData = newLines.join('\n');
      const blob = new Blob([newCsvData]);
      resolve(new File([blob], file.name, { type: file.type }));
    };

    reader.readAsText(file);
  });
};
