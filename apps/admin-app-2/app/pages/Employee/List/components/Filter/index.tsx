import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
} from 'antd';

import { IEmployee } from '@app/pages/Employee/types';
import SelectDepartment from '@shared/containers/Select/Department';
import SelectEmployee from '@shared/containers/Select/Employee';
import SelectBusinessUnit from '../../../components/Select/BusinessUnit';
import SelectLocation from '../../../components/Select/Location';
import SelectPositionLevel from '../../../components/Select/PositionLevel';
import { Creators } from '../../redux/actions';
import { filterSelector } from '../../redux/selectors';
import { defaultFilters } from '../../redux/reducer';
import { IFilters } from '../../types';
import useParentStyle from '../../styles';

const Filter = () => {
  const { t } = useTranslation(['employeePage', 'global']);
  const dispatch = useDispatch();
  const parentClasses = useParentStyle();
  const [form] = Form.useForm();

  // current antd version doesn't support the useWatch hook
  const [selectedDepartments, setSelectedDepartments] = (
    useState<{ department: IEmployee['department'], subDepartments: IEmployee['subDepartments'] } | undefined>()
  );

  const filters = useSelector(filterSelector.getFilters);

  const handleFormSubmit = (values: Partial<IFilters>) => {
    dispatch(Creators.updateFilters({
      resetPagination: true,
      filters: {
        ...(values || undefined),
        subDepartments: selectedDepartments?.subDepartments, // form doesn't return the subDepartments because it's not a form item
      },
    }));
    dispatch(Creators.getFilteredEmployeesCommonRequest({}));
  };

  const handleResetForm = () => {
    form.resetFields();
    setSelectedDepartments(undefined);
    dispatch(Creators.resetFilters({}));
  };

  return (
    <Card title={t('global:FILTER')} className={[parentClasses.cardContainer, parentClasses.filterCardContainer].join(' ')}>
      <Form
        form={form}
        name="employeeFilter"
        id="employeeFilter"
        onFinish={handleFormSubmit}
        layout="vertical"
        initialValues={defaultFilters}
        className={parentClasses.filterFormContainer}
      >
        <Row gutter={[16, 0]}>
          <Col sm={12} xs={24}>
            <Form.Item name={['searchTerm']} label={t('employeePage:SEARCH')}>
              <Input placeholder={t('employeePage:SEARCH_PLACEHOLDER')} className={parentClasses.inputContainer} />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item
              name={['department']}
              label={t('employeePage:DEPARTMENT')}
              getValueProps={() => selectedDepartments as any}
            >
              <SelectDepartment
                isReturnParsedValue
                allowClear
                onChange={(parsedDepartment: any) => {
                  setSelectedDepartments(parsedDepartment);
                  form.setFieldsValue({
                    department: parsedDepartment?.department,
                    subDepartments: parsedDepartment?.subDepartments,
                  });
                }}
                placeholder={t('employeePage:DEPARTMENT')}
                className={parentClasses.inputContainer}
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item name={['lineManager']} label={t('employeePage:LINE_MANAGER')}>
              <SelectEmployee
                allowClear
                placeholder={t('employeePage:LINE_MANAGER')}
                className={parentClasses.inputContainer}
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item name={['mainWorkLocation']} label={t('employeePage:WORKING_LOCATION')}>
              {/* the form item passes the onChange
                // @ts-ignore */}
              <SelectLocation
                allowClear
                placeholder={t('employeePage:WORKING_LOCATION')}
                className={parentClasses.inputContainer}
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item name={['businessUnit']} label={t('employeePage:BUSINESS_UNIT')}>
              {/* the Form.Item passes the onChange
                // @ts-ignore */}
              <SelectBusinessUnit
                allowClear
                placeholder={t('employeePage:BUSINESS_UNIT')}
                className={parentClasses.inputContainer}
              />
            </Form.Item>
          </Col>
          <Col sm={12} xs={24}>
            <Form.Item name={['positionLevel']} label={t('employeePage:POSITION_LEVEL')}>
              {/* the Form.Item passes the onChange
                // @ts-ignore */}
              <SelectPositionLevel allowClear className={parentClasses.inputContainer} />
            </Form.Item>
          </Col>
          {/* TODO business country filtresi ekle */}
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button onClick={handleResetForm}>
                {t('global:RESET')}
              </Button>
              &nbsp;&nbsp;&nbsp;
              <Button
                type="primary"
                htmlType="submit"
              >
                {t('global:FILTER')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default Filter;
