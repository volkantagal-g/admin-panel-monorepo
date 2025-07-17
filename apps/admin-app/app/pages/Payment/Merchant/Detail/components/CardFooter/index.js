import { Button, Col, Popconfirm, Row, Space } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { QuestionCircleOutlined } from '@ant-design/icons';

import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import useStyles from './styles';

const CardFooter = ({ editActive, setEditActive, handleSubmitForm, handleCancel, loading, editDisabled, hideSubmitButton }) => {
  const { t } = useTranslation(['paymentMerchantPage', 'global']);
  const classes = useStyles();
  const { Can } = usePermission();
  return (
    <Can permKey={permKey.PAGE_MERCHANT_DETAIL_EDIT_BUTTON_COMPONENT}>
      <Row gutter={12} justify="end" className="mt-3">
        <Col>
          {
            editActive ? (
              <Row>
                <Col span={24}>
                  <Space>
                    <Button onClick={() => handleCancel()}>
                      {t('global:CANCEL')}
                    </Button>
                    <Popconfirm
                      title={<div className={classes.contentWidth}>{t('paymentMerchantPage:CONFIRM_MESSAGE')}</div>}
                      onConfirm={() => handleSubmitForm()}
                      icon={(
                        <QuestionCircleOutlined />
                      )}
                    >
                      {
                        hideSubmitButton ? '' : (
                          <Button loading={loading} type="primary">
                            {t('global:SUBMIT')}
                          </Button>
                        )
                      }
                    </Popconfirm>
                  </Space>
                </Col>
              </Row>
            ) : (
              <Button disabled={editDisabled} loading={loading} onClick={() => setEditActive(true)} type="primary">
                {t('global:EDIT')}
              </Button>
            )
          }
        </Col>
      </Row>
    </Can>
  );
};

CardFooter.prototype = {
  setEditActive: PropTypes.func.isRequired,
  editActive: PropTypes.bool,
  loading: PropTypes.bool,
  handleSubmitForm: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  editDisabled: PropTypes.bool,
  hideSubmitButton: PropTypes.bool,
};

export default CardFooter;
