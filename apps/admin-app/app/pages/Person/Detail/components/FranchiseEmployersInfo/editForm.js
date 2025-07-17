import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Row, Col, Select, Button, Card, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';

import SelectWorkType from '@shared/components/Select/WorkType';
import SelectFranchise from '@shared/containers/Select/Franchise';
import { DEFAULT_ROW_SPACING } from '../../constants';
import { franchisesAreasSelector, personContract } from '../../redux/selector';

const FranchiseEmployersInfo = ({ data, isPending, handleEdit, handleRemove, hasPermission }) => {
  const { t } = useTranslation('personPage');
  const [isFormEditable, setIsFormEditable] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data, form]);

  const handleFieldChange = (fieldName, key) => {
    return value => {
      const fields = form.getFieldsValue();
      const { marketEmployers } = fields;
      Object.assign(marketEmployers[key], { [fieldName]: value });
      if (fieldName === 'franchise') {
        Object.assign(marketEmployers[key], { franchiseAreaId: undefined });
      }
      form.setFieldsValue({ marketEmployers });
    };
  };

  const onSubmit = () => {
    setIsFormEditable(false);
    const formValues = form.getFieldsValue(true);
    handleEdit({ ...formValues });
  };

  const onCancel = () => {
    setIsFormEditable(false);
    form.resetFields();
  };

  const onRemove = franchiseId => {
    setIsFormEditable(false);
    handleRemove({ franchise: franchiseId });
  };

  const isContractPending = useSelector(personContract.getIsPending);
  const { options: contractTypeOptions } = useSelector(personContract.getData);
  const isFranchiseAreasPending = useSelector(franchisesAreasSelector.getIsPending);
  const franchisesAreas = useSelector(franchisesAreasSelector.getData);

  return (
    <Form form={form} layout="vertical" initialValues={data}>
      <Form.List name="marketEmployers">
        {fields => fields.map(({ key, name }) => {
          const franchiseId = form.getFieldValue('marketEmployers')[key]?.franchise;
          const filteredAreaOptions = franchisesAreas?.filter(area => area.franchise === franchiseId).map(area => ({ label: area.name, value: area._id }));

          return (
            <Card
              title={`Employer ${key + 1}`}
              {...hasPermission && {
                extra: (
                  <Popconfirm
                    key="remove"
                    placement="topRight"
                    title={t('COMMON_CONFIRM_TEXT')}
                    onConfirm={() => onRemove(franchiseId)}
                    disabled={isPending || !isFormEditable}
                  >
                    <Button disabled={!isFormEditable} key="remove" type="link">{t('REMOVE')}</Button>
                  </Popconfirm>
                ),
              }}
              size="small"
              key={key}
            >
              <Row gutter={DEFAULT_ROW_SPACING} key={key}>
                <Col xs={12}>
                  <Form.Item
                    name={[name, 'franchise']}
                    label={t('FRANCHISE_EMPLOYER.EMPLOYER')}
                  >
                    <SelectFranchise
                      isFormDynamic
                      datatestid="select-franchise"
                      onChange={handleFieldChange('franchise', key)}
                      disabled={isPending || !isFormEditable}
                      allowClear={false}
                      placeholder={t('FRANCHISE_EMPLOYER.EMPLOYER')}
                    />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item
                    name={[name, 'workType']}
                    label={t('FRANCHISE_EMPLOYER.WORK_TYPE')}
                  >
                    <SelectWorkType
                      onChange={handleFieldChange('workType', key)}
                      disabled={isPending || !isFormEditable}
                      allowClear={false}
                      placeholder={t('FRANCHISE_EMPLOYER.WORK_TYPE')}
                    />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item
                    name={[name, 'contractId']}
                    label={t('FRANCHISE_EMPLOYER.CONTRACT_TYPE')}
                  >
                    <Select
                      onChange={handleFieldChange('contractId', key)}
                      disabled={isPending || isContractPending || !isFormEditable}
                      allowClear={false}
                      placeholder={t('FRANCHISE_EMPLOYER.CONTRACT_TYPE')}
                      loading={isContractPending}
                      options={contractTypeOptions}
                    />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item
                    name={[name, 'franchiseAreaId']}
                    label={t('FRANCHISE_EMPLOYER.FRANCHISE_AREA')}
                  >
                    <Select
                      onChange={handleFieldChange('franchiseAreaId', key)}
                      disabled={isPending || isFranchiseAreasPending || !isFormEditable}
                      allowClear={false}
                      placeholder={t('FRANCHISE_EMPLOYER.FRANCHISE_AREA')}
                      loading={isFranchiseAreasPending}
                      options={filteredAreaOptions}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          );
        })}
      </Form.List>
      {hasPermission && !!data?.marketEmployers?.length && (
        <Form.Item>
          {isFormEditable ? (
            <div style={{ display: 'flex' }}>
              <Popconfirm
                key="add"
                placement="topRight"
                title={t('COMMON_CONFIRM_TEXT')}
                onConfirm={onSubmit}
                disabled={isPending}
              >
                <Button size="small" block type="primary">
                  {t('SAVE')}
                </Button>
              </Popconfirm>
              <Button size="small" block type="default" onClick={onCancel}>
                {t('CANCEL')}
              </Button>
            </div>
          ) : (
            <Button
              disabled={isPending}
              type="primary"
              onClick={() => setIsFormEditable(true)}
              size="small"
              block
            >
              {t('FRANCHISE_EMPLOYER.EDIT_EMPLOYERS')}
            </Button>
          )}
        </Form.Item>
      )}
    </Form>
  );
};

export default FranchiseEmployersInfo;
