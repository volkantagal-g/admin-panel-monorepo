import { useState } from 'react';
import { InputNumber, Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { CheckOutlined, EditOutlined } from '@ant-design/icons';

import { PRODUCT_STOCK_UNIT_TYPE } from '@shared/shared/constants';
import useStyles from './styles';

const { Item } = Form;

function ProductForm({ product, onUpdateProduct }) {
  const [isEditing, setIsEditing] = useState(false);
  const classes = useStyles();
  const { t } = useTranslation();

  const { unit } = product;

  const countDecimals = value => {
    if (Math.floor(value) !== value) {
      return value?.toString()?.split('.')[1].length || 0;
    }
    return 0;
  };

  return isEditing ? (
    <div className={classes.productForm}>
      <Form
        id={`product-${product._id}`}
        onFinish={value => {
          onUpdateProduct({ ...product, ...value });
          setIsEditing(false);
        }}
      >
        <Item
          className={classes.removed}
          validateTrigger={['onPressEnter', 'onBlur']}
          name="deleted"
          initialValue={product.deleted}
          rules={[
            {
              validator: async (_, deleted) => {
                if (!deleted) {
                  return Promise.reject(t('error:REQUIRED'));
                }
                if (unit === PRODUCT_STOCK_UNIT_TYPE.PIECE && countDecimals(deleted) > 0) {
                  return Promise.reject(t('writeOffPage:MUST_BE_INTEGER'));
                }
                if (unit === PRODUCT_STOCK_UNIT_TYPE.KILOGRAM && countDecimals(deleted) > 3) {
                  return Promise.reject(t('writeOffPage:MAX_DECIMALS'));
                }
                return true;
              },
            },
          ]}
        >
          <InputNumber />
        </Item>
      </Form>
      <Button
        htmlType="submit"
        form={`product-${product._id}`}
        icon={<CheckOutlined />}
      />
    </div>
  ) : (
    <>
      <div className={classes.productForm}>
        <div>{product.deleted}</div>
        <Button
          onClick={e => {
            e.preventDefault();
            setIsEditing(true);
          }}
          icon={<EditOutlined />}
        />
      </div>
      {!product.deleted && <div className={classes.warning}>{t('error:REQUIRED')}</div>}
      {unit === PRODUCT_STOCK_UNIT_TYPE.PIECE && countDecimals(product.deleted) > 0 &&
        <div className={classes.warning}>{t('writeOffPage:MUST_BE_INTEGER')}</div>}
      {unit === PRODUCT_STOCK_UNIT_TYPE.KILOGRAM && countDecimals(product.deleted) > 3 &&
        <div className={classes.warning}>{t('writeOffPage:MAX_DECIMALS')}</div>}
    </>
  );
}

export default ProductForm;
