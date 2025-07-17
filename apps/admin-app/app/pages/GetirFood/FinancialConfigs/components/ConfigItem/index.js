import { useCallback, useEffect, useMemo } from 'react';
import {
  Collapse,
  Form,
  Button,
  Row,
  Modal,
} from 'antd';

import { useTranslation } from 'react-i18next';

import { useForm } from 'antd/lib/form/Form';
import { useDispatch, useSelector } from 'react-redux';

import { tableColumns } from './config';

import { Creators } from '../../redux/actions';
import { financialConfigsSelector } from '../../redux/selectors';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import Spinner from '@shared/components/Spinner';

import useStyles from './styles';
import ConfirmationModalContent from '../ConfirmationModalContent';
import { generateChangedItems, getUpdateConfigValuesPayload } from '../../utils';

const { Panel } = Collapse;

const ConfigItem = ({ vertical, domain: { name: domainName } }) => {
  const { t } = useTranslation('foodFinancialConfigsPage');
  const dispatch = useDispatch();
  const classes = useStyles();
  const domainData = useSelector(financialConfigsSelector.getDomain);
  const isPendingDomainData = useSelector(
    financialConfigsSelector.getIsPendingDomain,
  );
  const isPendingUpdate = useSelector(
    financialConfigsSelector.getIsPendingUpdateFinancialConfigValues,
  );
  const configItem = domainData[domainName];
  const [form] = useForm();

  const tableFooter = useMemo(
    () => (
      <Form.Item
        shouldUpdate
        className={classes.formItem}
      >
        {() => (
          <Row justify="end">
            <Button
              size="medium"
              type="primary"
              htmlType="submit"
              loading={isPendingDomainData}
              key="save"
              disabled={!form.isFieldsTouched()}
            >
              {t('global:SAVE')}
            </Button>
          </Row>
        )}
      </Form.Item>
    ),
    [classes.formItem, form, isPendingDomainData, t],
  );

  const handleSubmit = useCallback(
    ({ configs: formValues }) => {
      const changedItems = generateChangedItems(configItem, formValues);

      return Modal.confirm({
        title: (
          <div className={classes.confirmationModalHeader}>
            <span className={classes.confirmationModalTitle}>{t('CONFIRM_MODAL_TITLE')}</span>
            <span>{t('CONFIRM_MODAL_SUBTITLE')}</span>
          </div>
        ),
        content: (
          <ConfirmationModalContent changedItems={changedItems} />
        ),
        okText: t('global:YES'),
        okButtonProps: { disabled: changedItems.length === 0 },
        cancelText: t('global:NO'),
        icon: null,
        centered: true,
        onOk: () => {
          const updateConfigRequests = getUpdateConfigValuesPayload(formValues, vertical, domainName);
          dispatch(Creators.updateFinancialConfigValuesRequest({ updateConfigRequests }));
        },
        maskClosable: true,
      });
    },
    [classes.confirmationModalHeader, classes.confirmationModalTitle, configItem, dispatch, domainName, t, vertical],
  );

  useEffect(() => {
    dispatch(
      Creators.getFinancialConfigsDomainRequest({
        vertical,
        domain: domainName,
      }),
    );
  }, [dispatch, domainName, vertical]);

  const loading = isPendingUpdate || isPendingDomainData;

  if (loading) return <Spinner />;

  if (!configItem) return null;

  return (
    <Collapse defaultActiveKey={['1']} expandIconPosition="right">
      <Panel header={domainName} key="1" className={classes.panel}>
        <Form
          form={form}
          name="financialConfigsForm"
          onFinish={handleSubmit}
        >
          <Form.List name="configs" initialValue={configItem}>
            {() => {
              return (
                <AntTableV2
                  data={configItem}
                  columns={tableColumns(t, classes)}
                  loading={isPendingDomainData}
                  footer={tableFooter}
                />
              );
            }}
          </Form.List>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default ConfigItem;
