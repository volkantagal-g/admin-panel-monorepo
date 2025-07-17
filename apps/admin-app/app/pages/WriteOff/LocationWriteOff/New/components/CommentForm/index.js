import { useState } from 'react';
import { Form, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { CheckOutlined, CommentOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { MAX_COMMENT_LENGTH } from '../Form/formHelper';
import useStyles from './styles';

const { Item } = Form;

function CommentForm({ product, onUpdateProduct }) {
  const [isEditing, setIsEditing] = useState(false);
  const classes = useStyles();
  const { t } = useTranslation();

  return isEditing ? (
    <div className={classes.commentForm}>
      <Form
        id={`product-${product._id}-comment`}
        onFinish={value => {
          onUpdateProduct({ ...product, ...value });
          setIsEditing(false);
        }}
        className={classes.form}
      >
        <Item
          className={classes.removed}
          validateTrigger={['onPressEnter', 'onBlur']}
          name="comment"
          initialValue={product.comment}
          rules={[
            {
              validator: async (_, comment) => {
                if (comment && comment.length > MAX_COMMENT_LENGTH) {
                  return Promise.reject(t('baseYupError:STRING.MAX', { max: MAX_COMMENT_LENGTH }));
                }
                return true;
              },
            },
          ]}
        >
          <TextArea />
        </Item>
      </Form>
      <Button
        htmlType="submit"
        form={`product-${product._id}-comment`}
        icon={<CheckOutlined />}
      />
    </div>
  ) : (
    <>
      <div className={classes.commentForm}>
        <div style={{ overflow: 'scroll' }}>{product.comment}</div>
        <div>
          <Button
            onClick={e => {
              e.preventDefault();
              setIsEditing(true);
            }}
            icon={<CommentOutlined />}
          />
        </div>
      </div>
      {(product?.comment?.length > MAX_COMMENT_LENGTH) && <div className={classes.warning}>{t('baseYupError:STRING.MAX', { max: MAX_COMMENT_LENGTH })}</div>}
    </>
  );
}

export default CommentForm;
