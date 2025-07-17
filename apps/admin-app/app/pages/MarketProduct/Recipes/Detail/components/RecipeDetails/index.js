import { memo } from 'react';
import { Col, Row } from 'antd';

import Preparation from './components/Preparation';
import Segments from './components/Segments';
import Ingredients from './components/Ingredients';
import RecipeInfo from './components/RecipeInfo';
import Tags from './components/Tags';
import Products from './components/Products';
import TimeTable from './components/TimeTable';
import RecipeGallery from './components/RecipeGallery';

const RecipeDetails = memo(() => {
  return (
    <Row gutter={[20, 20]}>
      <Col sm={24} lg={16}>
        <RecipeInfo />
        <RecipeGallery />
        <Products />
        <Tags />
        <TimeTable />
      </Col>
      <Col sm={24} lg={8}>
        <Ingredients />
        <Preparation />
        <Segments />
      </Col>
    </Row>
  );
});

export default RecipeDetails;
