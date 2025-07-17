import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Card, Skeleton, Tabs } from 'antd';
import { get } from 'lodash';

import { CurrencyType, EventType } from '@app/pages/Payment/Transactions/Detail/components/RefundModal';

import { useInitAndDestroyPage } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { transactionDetailCardSelector, transactionsSelector } from './redux/selectors';
import permKeys from '@shared/shared/permKey.json';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import TransactionsTab from './TransactionsTab';

const reduxKey = REDUX_KEY.PAYMENT_EVENT.DETAIL_CARD;

export interface IProvisionType {
  isProvisionSupportedByBank: boolean,
  chargeAmount: number
}

type PaymentDetailCardProps = {
  paymentAmount: number | undefined,
  provision: IProvisionType | undefined,
  totalChargedAmount: number | undefined,
  merchantOrderId: string | undefined,
  transactionId: string,
  alwaysShowAllEvents?: boolean,
}

export interface ITransactionDetailCardData {
  transactionId: string,
  mixed: boolean,
  financialSummary: {
    currency: CurrencyType,
  },
  payment: {
    provider: string,
    method: string,
  }
  events: EventType[],
  location: string
}

export interface ITabItem {
  key: string,
  label: string,
  children: React.ReactNode
}

export interface IProvisionItems {
  key?: string,
  label?: string,
  value?: string,
}

export interface IPaymentDetailTabItemElement {
  title: string,
  component: React.ReactNode | null
}

export interface ITransaction {
  data: {
      events: EventType[],
      location: string;
      financialSummary: {
        currency: {
          codeAlpha3: string;
        }
      }
  }
}

const PaymentDetailCard = ({
  paymentAmount,
  provision,
  totalChargedAmount,
  transactionId,
  merchantOrderId,
  alwaysShowAllEvents,
}: PaymentDetailCardProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('global');
  const transactionDetailCardData = useSelector(transactionDetailCardSelector.getData) as ITransactionDetailCardData;
  const transactionDetailCardIsPending = useSelector(transactionDetailCardSelector.getIsPending) as boolean;

  const transactionsData = useSelector(transactionsSelector.getData);
  const transactionsIsPending = useSelector(transactionsSelector.getIsPending);

  const isMixed = get(transactionDetailCardData, 'mixed', false);

  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  useEffect(() => {
    if (transactionId) {
      dispatch(Creators.getTransactionDetailCardRequest({ id: transactionId }));
    }
  }, [transactionId, dispatch]);

  useEffect(() => {
    if (!merchantOrderId) return;
    dispatch(Creators.submitFilters({ filters: { merchantOrderId } }));
  }, [merchantOrderId, dispatch]);

  if (!transactionId) {
    return null;
  }

  const transactionTabs: ITabItem[] = [];

  if (merchantOrderId && (transactionsData as ITransaction[])?.length > 0) {
    (transactionsData as Array<ITransaction>)?.reverse()?.map((transaction, index) => transactionTabs.push({
      key: index.toString(),
      label: `${t('global:PAYMENT_DETAIL_CARD.TRANSACTION')} ${index + 1}`,
      children: <TransactionsTab
        transaction={transaction}
        provision={index === (transactionsData as Array<ITransaction>).length - 1 ? provision : undefined}
        paymentAmount={paymentAmount}
        totalChargedAmount={totalChargedAmount}
        alwaysShowAllEvents={alwaysShowAllEvents}
      />,
    }));
  }
  else {
    transactionTabs.push({
      key: '0',
      label: `${t('global:PAYMENT_DETAIL_CARD.TRANSACTION')} ${1}`,
      children: <TransactionsTab
        transaction={{ data: transactionDetailCardData }}
        provision={provision}
        paymentAmount={paymentAmount}
        totalChargedAmount={totalChargedAmount}
        alwaysShowAllEvents={alwaysShowAllEvents}
      />,
    });
  }

  return (
    <Card
      title={`${t('global:PAYMENT')} ${isMixed ? '(Mixed)' : ''}`}
      className="mb-2"
      extra={(
        <RedirectButtonV2
          text={t('global:DETAIL')}
          to={`/payment/transactions/detail/${transactionId}`}
          permKey={permKeys.PAGE_PAYMENT_TRANSACTION_DETAIL}
          target="_blank"
          iconComponent={null}
        />
      )}
      bodyStyle={{ paddingTop: isMixed ? 0 : 24 }}
    >
      <Skeleton
        loading={merchantOrderId ? !!transactionsIsPending : transactionDetailCardIsPending}
        active={merchantOrderId ? !!transactionsIsPending : transactionDetailCardIsPending}
      >
        <Tabs defaultActiveKey={String(transactionTabs.length - 1)}>
          {
            transactionTabs.map(item => {
              return (
                <Tabs.TabPane tab={item.label} key={item.key}>
                  {item.children}
                </Tabs.TabPane>
              );
            })
          }
        </Tabs>
      </Skeleton>
    </Card>
  );
};

export default PaymentDetailCard;
