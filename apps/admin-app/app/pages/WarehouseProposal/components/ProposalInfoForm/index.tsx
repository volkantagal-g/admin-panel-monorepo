import { useEffect } from 'react';
import { Row, Col, Input, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import {
  useSelector,
  useDispatch,
} from 'react-redux';

import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import Card from '@shared/components/UI/AntCard';
import { IProposalInfoFormProps } from '../../interfaces';

const ProposalInfoForm: React.FC<IProposalInfoFormProps> = ({
  isDisabled,
  values,
  errors,
  touched,
  handleChange,
}) => {
  const { t } = useTranslation('warehouseProposalPage');
  const dispatch = useDispatch();
  const selectedCountry = useSelector(getSelectedCountryV2);

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest({ countryId: selectedCountry._id }));
  }, [dispatch, selectedCountry._id]);

  return (
    <Col span={24}>
      <Card title={t('PROPOSAL.INFO')}>
        <Row gutter={[24, 24]} align="bottom">
          <Col span={24}>
            <Form.Item
              help={touched?.name && errors?.name}
              validateStatus={touched?.name && errors?.name ? 'error' : 'success'}
              label={t('PROPOSAL.NAME')}
            >
              <Input
                value={values?.name}
                onChange={e => {
                  handleChange('proposal.name', e.target.value);
                }}
                disabled={isDisabled}
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default ProposalInfoForm;
