import { Input, Form, Button, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

const { Item } = Form;

function InputSearchForm({ selectedProductId, onAddProduct, isLoading }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Row gutter={[0, 16]} justify="end">
      <Form
        id="input-product-id-search-form"
        onFinish={onAddProduct}
      >
        <Item
          name="productId"
          validateTrigger={['onPressEnter', 'onBlur']}
          initialValue={selectedProductId}
          rules={[
            {
              validator: async (_, productId) => {
                if (!productId) {
                  return Promise.reject(new Error(t('error:REQUIRED')));
                }
                return true;
              },
            },
          ]}
        >
          <Input
            placeholder={t('writeOffPage:ENTER_PRODUCT_ID')}
            className={classes.searchInput}
          />
        </Item>
      </Form>
      <Button
        loading={isLoading}
        form="input-product-id-search-form"
        htmlType="submit"
        disabled={isLoading}
      >{t('writeOffPage:ADD_PRODUCT')}
      </Button>
    </Row>

  );
}

export default InputSearchForm;
