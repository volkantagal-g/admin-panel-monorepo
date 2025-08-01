import { useState } from 'react';
import { Input, Form, Button } from 'antd';
import { EditTwoTone } from '@ant-design/icons';

import { getLangKey } from '@shared/i18n';
import useStyles from './styles';
import RatingPlaceholderModalForm from './RatingPlaceholderModalForm';
import { Placeholder } from '@shared/api/marketOrderRatings';

export type Option = {
  placeholder?: Placeholder,
  rating?: number,
  _id?: string,
}

type FormProps = {
  domainType: number,
  option: Option,
  priority: number,
}

const RatingTextForm = ({ option, domainType, priority }: FormProps) => {
  const classes = useStyles();
  const [form] = Form.useForm();

  const [isFormModalVisible, setIsFormModalVisible] = useState(false);
  const [selectedRatingPlaceholder, setSelectedRatingPlaceholder] = useState<Option>({});

  const onUpdateText = (value: Option) => {
    const { placeholder, rating } = value;
    setIsFormModalVisible(true);
    setSelectedRatingPlaceholder({ placeholder, rating });
  };

  const onCancel = () => {
    setIsFormModalVisible(false);
  };

  const value = option?.placeholder?.[getLangKey()] ?? '';
  return (
    <>
      <RatingPlaceholderModalForm
        isVisible={isFormModalVisible}
        onCancel={onCancel}
        selectedRatingPlaceholder={selectedRatingPlaceholder}
        domainType={domainType}
        priority={priority}
      />
      <Form form={form} data-testid="tag-placeholder-input">
        <Input.Group style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Input
            className={classes.inputField}
            placeholder="Question placeholder"
            value={value}
            disabled
          />
          <Button onClick={() => onUpdateText(option)} className={classes.editButton} icon={<EditTwoTone color="purple" />} />
        </Input.Group>
      </Form>
    </>
  );
};

export default RatingTextForm;
