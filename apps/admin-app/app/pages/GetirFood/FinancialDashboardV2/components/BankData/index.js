import { Row, Space, Spin, Collapse } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';

import { currencyFormat } from '@shared/utils/localization';
import AntCard from '@shared/components/UI/AntCard';
import {
  getFinancialDashboardPayoutDetail as getFinancialDashboardPayoutDetailSelector,
  getFinancialDashboardBankBalances as getFinancialDashboardBankBalancesSelector,
} from '../../redux/selectors';
import useStyles from './styles';

const { Panel } = Collapse;

const ExpandIcon = ({ isActive }) => (isActive ? <CaretDownOutlined /> : <CaretRightOutlined />);

const BankData = () => {
  const classes = useStyles();
  const { t } = useTranslation('foodFinancialDashboardV2Page');
  const dailyFinancialDashboard = useSelector(getFinancialDashboardPayoutDetailSelector.getCurrentData);
  const financialDashboardBankBalances = useSelector(getFinancialDashboardBankBalancesSelector.getData);
  const isPending = useSelector(getFinancialDashboardPayoutDetailSelector.getIsPending);

  return (
    <AntCard
      title={t('BANK_DATA.TITLE')}
      className={classes.card}
    >
      <Spin spinning={isPending}>
        <Space direction="vertical" size="middle" className={classes.bankCardSpace}>
          <Collapse
            defaultActiveKey={1}
            expandIcon={ExpandIcon}
            bordered={false}
          >
            <Panel
              header={(
                <Row className={classes.panelHeader} justify="space-between">
                  <b className={classes.panelHeaderTitle}>{t('PAYBACK_DATA.ESTIMATED_PAYBACK_AMOUNT')}</b>
                  <span>{currencyFormat().format(dailyFinancialDashboard?.estimatedPaybackAmount)}</span>
                </Row>
              )}
              key="1"
            >
              <Space direction="vertical" size="small" className={classes.bankCardSpace}>
                <Row justify="space-between">
                  <b>{t('PAYBACK_DATA.AFTERNOON.ESTIMATED_PAYBACK_AMOUNT')}</b>
                  <span>{currencyFormat().format(dailyFinancialDashboard?.estimatedAfternoonPaybackAmount)}</span>
                </Row>
                <Row justify="space-between">
                  <b>{t('PAYBACK_DATA.NIGHT.ESTIMATED_PAYBACK_AMOUNT')}</b>
                  <span>{currencyFormat().format(dailyFinancialDashboard?.estimatedNightPaybackAmount)}</span>
                </Row>
              </Space>
            </Panel>
          </Collapse>
          <Row justify="space-between">
            <b>{t('BANK_DATA.MIN_AMOUNT_TO_TRANSFER_LABEL')}</b>
            <span>{currencyFormat().format(dailyFinancialDashboard?.amountToBePaid)}</span>
          </Row>
          <Collapse
            expandIcon={ExpandIcon}
            bordered={false}
            defaultActiveKey={1}
          >
            <Panel
              header={(
                <Row className={classes.panelHeader}>
                  <b className={classes.panelHeaderTitle}>{t('BANK_DATA.BANK_ACCOUNT_INFO')}</b>
                </Row>
              )}
              key="1"
            >
              <Space direction="vertical" size="small" className={classes.bankCardSpace}>
                <Row justify="space-between">
                  <b className={classes.bankAccountInfo}>{t('BANK_DATA.BANK')}</b>
                  <b className={classes.bankAccountInfo}>{t('BANK_DATA.CURRENT_ACCOUNT_AMOUNT')}</b>
                </Row>
                {financialDashboardBankBalances?.map(bankBalance => (
                  <Row justify="space-between">
                    <b>{bankBalance?.bank}</b>
                    <span>{bankBalance?.currentBalance ? currencyFormat().format(bankBalance?.currentBalance) : '-'}</span>
                  </Row>
                ))}
              </Space>
            </Panel>
          </Collapse>
        </Space>
      </Spin>
    </AntCard>
  );
};

export default BankData;
