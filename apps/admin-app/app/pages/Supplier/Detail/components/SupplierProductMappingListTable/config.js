import { Button, Input } from 'antd';

import { t } from '@shared/i18n';

export const tableColumns = props => {
  const {
    editableRow,
    setEditableRow,
    barCode,
    setBarCode,
    supplierCode,
    setSupplierCode,
    setOnChange,
    onSubmit,
  } = props;

  return [
    {
      title: t('supplierPage:PRODUCT_ID'),
      dataIndex: 'product',
      key: 'product',
      width: 200,
      render: product => {
        return product;
      },
    },
    {
      title: t('supplierPage:PRODUCT_NAME'),
      dataIndex: 'productName',
      key: 'productName',
      width: 320,
      render: productName => {
        return productName;
      },
    },
    {
      title: t('supplierPage:BARCODE'),
      key: 'productEanBarcode',
      width: 150,
      render: obj => {
        const isEditable = editableRow === obj._id;
        if (!isEditable) {
          return obj.productEanBarcode;
        }
        return (<Input
          value={barCode}
          onChange={setOnChange(setBarCode)}
        />);
      },
    },
    {
      title: t('supplierPage:PRODUCT_SUPPLIER_CODE'),
      key: 'productSupplierCode',
      width: 150,
      render: obj => {
        const isEditable = editableRow === obj._id;

        if (!isEditable) {
          return obj.productSupplierCode;
        }

        return (<Input
          value={supplierCode}
          onChange={setOnChange(setSupplierCode)}
        />);
      },
    },
    {
      title: t('global:ACTION'),
      align: 'right',
      render: obj => {
        const isEditable = editableRow === obj._id;
        const action = {
          onEditClick: () => {
            setEditableRow(obj._id);
            setBarCode(obj.productEanBarcode);
            setSupplierCode(obj.productSupplierCode);
          },
          onSaveClick: () => {
            onSubmit(obj);
            setEditableRow(false);
          },
          onCancelClick: () => {
            setEditableRow(false);
            setBarCode("");
            setSupplierCode("");
          },
        };

        if (!isEditable) {
          return (<Button type="default" size="small" onClick={action.onEditClick}>
            {t('button:EDIT')}
          </Button>);
        }

        return (
          <>
            <Button type="default" className="mr-1" size="small"  onClick={action.onCancelClick}>
              {t('button:CANCEL')}
            </Button>
            <Button type="primary" size="small" onClick={action.onSaveClick}>
              {t('button:SAVE')}
            </Button>
          </>
        );
      },
    },
  ];
};
