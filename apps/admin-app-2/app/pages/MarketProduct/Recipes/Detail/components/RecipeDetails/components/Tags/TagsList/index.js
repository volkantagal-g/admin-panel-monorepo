import { Row, Col } from 'antd';

import TagComponent from './TagComponent';

const TagsList = ({ setFieldValue, isFormEditable, tagsArray, setTagsArray }) => {
  return (
    <Row key="row-1" gutter={[0, 8]}>
      {tagsArray?.map((tag, index) => (
        <Col span={24} key={tag.key}>
          <TagComponent
            setFieldValue={setFieldValue}
            tag={tag}
            index={index}
            isFormEditable={isFormEditable}
            tagsArray={tagsArray}
            setTagsArray={setTagsArray}
          />
        </Col>
      ))}
    </Row>
  );
};

export default TagsList;
