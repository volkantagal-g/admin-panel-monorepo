import { Col, Row } from 'antd';
import { useTheme } from 'react-jss';

import ProductTable from './ProductTable';

const ProductList = ({ isFormEditable, selectedProducts, setSelectedProducts, values, setFieldValue }) => {
  const theme = useTheme();

  return (
    <Row gutter={[theme.spacing(3)]} style={{ overflowX: 'auto' }}>
      <Col xs={24} lg={24} className="mt-2">
        <ProductTable
          isFormEditable={isFormEditable}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          setFieldValue={setFieldValue}
          values={values}
          tableType="conditional"
        />
      </Col>
    </Row>
  );
};

export default ProductList;
