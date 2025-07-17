import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Select, Button, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';

import SelectWorkType from '@shared/components/Select/WorkType';
import SelectFranchise from '@shared/containers/Select/Franchise';
import { DEFAULT_ROW_SPACING } from '../../constants';
import { personContract } from '../../redux/selector';

import { Creators as FranchiseCommonCreators } from '@shared/redux/actions/franchiseCommon';
import { getFranchiseAreasSelector } from '@shared/redux/selectors/franchiseCommon';

const DEFAULT_FRANCHISE_EMPLOYER_VALUES = {
  workType: undefined,
  franchise: undefined,
  contractId: undefined,
  franchiseAreaId: undefined,
};

const AddNewFranchiseEmployer = ({ isPending, handleAdd }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('personPage');
  const [selectedFranchise, setSelectedFranchise] = useState(undefined);
  const [form] = Form.useForm();

  const handleFieldChange = fieldName => {
    return value => {
      form.setFieldsValue({ [fieldName]: value });
    };
  };

  const handleSubmit = () => {
    form.validateFields().then(
      values => {
        handleAdd({ ...values });
        form.resetFields();
      },
    ).catch(err => err);
  };

  useEffect(() => {
    if (selectedFranchise) {
      dispatch(FranchiseCommonCreators.getFranchiseAreasRequest({ franchiseId: selectedFranchise }));
    }
  }, [dispatch, selectedFranchise]);

  const handleFieldsChange = (fields => {
    if (fields[0]?.name?.[0] === 'franchise' && fields[0]?.value) {
      setSelectedFranchise(fields[0]?.value);
      form.setFieldsValue({ franchiseAreaId: undefined });
    }
  });

  const isContractPending = useSelector(personContract.getIsPending);
  const { options: contractTypeOptions } = useSelector(personContract.getData);
  const franchiseAreas = useSelector(getFranchiseAreasSelector.getData);
  const isFranchiseAreasPending = useSelector(getFranchiseAreasSelector.getIsPending);
  const franchiseAreaOptions = useMemo(() => franchiseAreas?.map(area => ({ label: area.name, value: area._id })), [franchiseAreas]);

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={DEFAULT_FRANCHISE_EMPLOYER_VALUES}
      onFieldsChange={handleFieldsChange}
    >
      <Row gutter={DEFAULT_ROW_SPACING}>
        <Col xs={12}>
          <Form.Item
            rules={[{ required: true }]}
            name="franchise"
            label={t('FRANCHISE_EMPLOYER.EMPLOYER')}
          >
            <SelectFranchise
              datatestid="select-franchise"
              onChange={handleFieldChange('franchise')}
              disabled={isPending}
              allowClear={false}
              placeholder={t('FRANCHISE_EMPLOYER.EMPLOYER')}
            />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item
            rules={[{ required: true }]}
            name="workType"
            label={t('FRANCHISE_EMPLOYER.WORK_TYPE')}
          >
            <SelectWorkType
              onChange={handleFieldChange('workType')}
              disabled={isPending}
              allowClear={false}
              placeholder={t('FRANCHISE_EMPLOYER.WORK_TYPE')}
            />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item
            name="contractId"
            label={t('FRANCHISE_EMPLOYER.CONTRACT_TYPE')}
          >
            <Select
              onChange={handleFieldChange('contractId')}
              disabled={isPending || isContractPending}
              allowClear={false}
              placeholder={t('FRANCHISE_EMPLOYER.CONTRACT_TYPE')}
              loading={isContractPending}
              options={contractTypeOptions}
            />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item
            name="franchiseAreaId"
            label={t('FRANCHISE_EMPLOYER.FRANCHISE_AREA')}
          >
            <Select
              onChange={handleFieldChange('franchiseAreaId')}
              disabled={isPending || isFranchiseAreasPending}
              allowClear={false}
              placeholder={t('FRANCHISE_EMPLOYER.FRANCHISE_AREA')}
              loading={isFranchiseAreasPending}
              options={franchiseAreaOptions}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Popconfirm
          key="add"
          placement="topRight"
          title={t('COMMON_CONFIRM_TEXT')}
          onConfirm={handleSubmit}
          disabled={isPending || isFranchiseAreasPending || isContractPending}
        >
          <Button disabled={isPending || isFranchiseAreasPending || isContractPending} type="default" block>
            {t('SUBMIT')}
          </Button>
        </Popconfirm>
      </Form.Item>
    </Form>
  );
};

export default AddNewFranchiseEmployer;
