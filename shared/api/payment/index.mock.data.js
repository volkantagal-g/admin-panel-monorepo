/* eslint-disable max-len */
export const merchantId = '62e7d0d482cb8912cebadc1c';
export const transactionId = '64257f3514032338ec2f4540';
export const eventId = '62de4080874d552841772a48';

export const mockedMerchant = {
  id: merchantId,
  key: 'TR-TIP-GETIR10',
  deleted: false,
  createdAt: '2022-08-01T13:10:44.382',
  updatedAt: '2022-08-01T13:10:44.382',
  settings: {
    displayName: 'Getir 10 Turkey Tip Merchant',
    enabled: true,
    countryCode: 'TR',
    currency: {
      symbol: '₺',
      codeName: 'LIRA',
      codeAlpha2: 'TR',
      codeAlpha3: 'TRY',
      codeNumeric: 949,
      suffixSymbol: '',
      prefixSymbol: '₺',
      precision: 2,
      thousandSeparator: '.',
      decimalSeparator: ',',
    },
    timeZone: {
      id: 'Europe/Istanbul',
      name: 'Europe/Istanbul',
      offset: 2,
    },
    captureType: 'DIRECT',
    maxPurchaseAmount: 750,
    minPurchaseAmount: 0,
    webhooks: null,
  },
  customIdentifiers: [
    {
      key: 'domainType',
      value: 1,
    },
    {
      key: 'paymentType',
      value: 2,
    },
  ],
  paymentProviders: [
    {
      id: '1',
      key: 'masterpass',
      name: 'masterpass',
      settings: {
        enabled: true,
        displayOrder: 0,
        maxPurchaseAmount: 750,
        minPurchaseAmount: 0,
      },
      configuration: { merchantId: '00079270822' },
      paymentMethods: [
        {
          key: 'scheme',
          name: 'scheme',
          settings: {
            enabled: true,
            availableChannels: ['IOS', 'ANDROID', 'WEB'],
            displayOrder: 1,
          },
        },
      ],
    },
  ],
};

export const mockedTransaction = {
  transactionId,
  data: {
    location: 'TR',
    merchantReference: '635b192a3f4e2e2957b3f824',
    merchant: {
      _id: '62e7d0d482cb8912cebadc1c',
      key: 'TR-TIP-GETIR10',
      settings: {
        countryCode: 'TR',
        dataLocation: 'TR',
        captureType: 'DIRECT',
        timeZone: {
          _id: 'Europe/Istanbul',
          name: 'Europe/Istanbul',
          offset: 2,
        },
      },
      customIdentifiers: [
        {
          key: 'domainType',
          value: 1,
        },
        {
          key: 'paymentType',
          value: 2,
        },
      ],
    },
    createdAt: '2023-03-30T12:23:17.452Z',
    updatedAt: '2023-03-30T12:24:45.442Z',
    shopper: {
      _id: '60e5832c0ccbcb06b1e95c18',
      reference: '8522fd105cf367b4fe9f4869',
      name: 'string',
      email: 'string',
      phoneNumber: 'string',
      shopperIp: 'string',
      device: {
        deviceId: 'string',
        deviceType: 'Android',
        sdk: 'string',
        buildNumber: 5000,
        version: 'string',
      },
      infix: 'string',
      lastName: 'string',
      phoneNumberWithoutCountryCode: 'string',
      phoneNumberCountryCode: 'string',
      pspData: { checkout: {} },
      browserInfo: {
        acceptHeader: 'string',
        language: 'string',
        screenHeight: 'string',
        screenWidth: 'string',
        timeZoneOffset: 'string',
        userAgent: 'string',
      },
    },
    status: 'AUTHORIZED',
    mixed: true,
    events: [
      {
        _id: '64257f3514032338ec2f453e',
        createdAt: '2023-03-30T12:23:17.452Z',
        updatedAt: '2023-03-30T12:24:45.428Z',
        amount: 1700,
        amountOriginal: 17,
        balance: 1700,
        status: 'AUTHORIZED',
        description: 'mixed payments test',
        accountId: '62e7d0d482cb8912cebadc1c',
        payment: {
          provider: 'bkm',
          method: 'scheme',
          data: {
            cardData: {
              cardBin: '415565',
              bankCode: 3,
              maskedPan: '415565********11',
              consumerId: '3efa2e3e-6a85-4829-8830-0f044f9da49c',
              cardGroup: '1',
              _class: 'com.getir.nepis.transaction.model.CardDataRequestModel',
            },
            determinedBankIca: 'string',
            threeDPayment: false,
            bkmRequest: {
              mId: '17bc751f-ea40-41f8-ed6e-cb174c79877b',
              sUrl: 'https://backend.getirapi.com/bkm/paymentSuccess',
              cUrl: 'https://backend.getirapi.com/bkm/paymentFail',
              sAmount: '17,00',
              cAmount: '',
              msUrl: 'https://backend.getirapi.com/bkm/paymentSuccess',
              mcUrl: 'https://backend.getirapi.com/bkm/paymentFail',
              rSource: '1',
              osSource: '',
              orderId: '64257f3514032338ec2f453e',
              consumerId: '3efa2e3e-6a85-4829-8830-0f044f9da49c',
              ts: '20230330-15:24:38',
              posInfo: {
                extra: '{"ClientId":"190100000"}',
                url: 'https://entegrasyon.asseco-see.com.tr/fim/api',
                password: '*****',
                userId: '*****',
              },
              s: 'QKTf3Xq76Xo9A5ZNWiLxbOJn+q/zmE/Y3a2ZFvEhxN/mHTPt80HuNEi4RhJJkRgjaL0EyyGLJRvhRmWE96GPT/LD1pB1pp8BMQuzkp5PBeqgPyFCekFteYAX980jTzRsrDFZ4TzwF7XfrrpP+PuBLlgQsmPv3R/Qg0k3u0q/shQ=',
            },
            bkmResponseObject: {
              result: {
                resultCode: '0',
                subResultCode: '0',
                resultMsg: 'Success',
              },
              t: '6669b5f8-b3ef-4678-b98a-97d0765a31a9',
              ts: '20230330-15:24:45',
              s: 'Y7SpwRyKRnB5MxVdW2i+5/NJJ+cPA1bKGm8GsCvNkqWOeUULKv1sxiprmBU8KczV205NrZl0wikq5KGbdyGu/J+xEvunVcNra467Br/XiZrHWa9wYBJXtcQFa3m/gI5FlULDk2F1RqVslEeEwu45DimXvZfPeH+7JeIWfvA0Br9Um367/3g4IyH5KEwZOhKDMHcEy0fp+KwB6ubz5PdDo7PYkC5NkzJoF3tFI9N+l1MCmO48PKnloKuQS4cp3xjqpmbn2tajWHla/KE5x+LCymjE9vorFKHk/+L8nRTdkIveL6XmcfoE5rYCFa3qkvWFGv8oQWMKe4JC1x71zp8M9Q==',
              posResult: {
                orderId: '64257f3514032338ec2f453e',
                authCode: '414526',
                posResponse: 'APPROVED',
                posResultCode: '00',
                referansNumber: '308915390917',
                posResultMessage:
                  '{"orderId":"64257f3514032338ec2f453e","groupId":"64257f3514032338ec2f453e","response":"Approved","authCode":"414526","hostRefNum":"308915390917","procReturnCode":"00","transId":"23089PYnF12241","errMsg":"","extra":{"settleId":"2551","trxDate":"20230330 15:24:39","errorCode":"","hostDate":null,"numCode":"00"}}',
                posTransactionId: '23089PYnF12241',
                cardBin: '415565',
                cardBank: '0111',
                noflnst: '1',
                posBank: '0010',
              },
            },
            bkmResultMessage:
              '{"orderId":"64257f3514032338ec2f453e","groupId":"64257f3514032338ec2f453e","response":"Approved","authCode":"414526","hostRefNum":"308915390917","procReturnCode":"00","transId":"23089PYnF12241","errMsg":"","extra":{"settleId":"2551","trxDate":"20230330 15:24:39","errorCode":"","hostDate":null,"numCode":"00"}}',
            consumerId: '3efa2e3e-6a85-4829-8830-0f044f9da49c',
            responseFromBkm: {
              expressPaymentWsResponse: {
                result: {
                  resultCode: '0',
                  subResultCode: '0',
                  resultMsg: 'Success',
                },
                t: '6669b5f8-b3ef-4678-b98a-97d0765a31a9',
                ts: '20230330-15:24:45',
                s: 'Y7SpwRyKRnB5MxVdW2i+5/NJJ+cPA1bKGm8GsCvNkqWOeUULKv1sxiprmBU8KczV205NrZl0wikq5KGbdyGu/J+xEvunVcNra467Br/XiZrHWa9wYBJXtcQFa3m/gI5FlULDk2F1RqVslEeEwu45DimXvZfPeH+7JeIWfvA0Br9Um367/3g4IyH5KEwZOhKDMHcEy0fp+KwB6ubz5PdDo7PYkC5NkzJoF3tFI9N+l1MCmO48PKnloKuQS4cp3xjqpmbn2tajWHla/KE5x+LCymjE9vorFKHk/+L8nRTdkIveL6XmcfoE5rYCFa3qkvWFGv8oQWMKe4JC1x71zp8M9Q==',
                posResult: {
                  orderId: '64257f3514032338ec2f453e',
                  authCode: '414526',
                  posResponse: 'APPROVED',
                  posResultCode: '00',
                  referansNumber: '308915390917',
                  posResultMessage:
                    '{"orderId":"64257f3514032338ec2f453e","groupId":"64257f3514032338ec2f453e","response":"Approved","authCode":"414526","hostRefNum":"308915390917","procReturnCode":"00","transId":"23089PYnF12241","errMsg":"","extra":{"settleId":"2551","trxDate":"20230330 15:24:39","errorCode":"","hostDate":null,"numCode":"00"}}',
                  posTransactionId: '23089PYnF12241',
                  cardBin: '415565',
                  cardBank: '0111',
                  noflnst: '1',
                  posBank: '0010',
                },
              },
            },
            responseResultMessage: null,
          },
          currency: {
            symbol: '₺',
            codeName: 'LIRA',
            codeAlpha2: 'TR',
            codeAlpha3: 'TRY',
            codeNumeric: 949,
            suffixSymbol: '',
            prefixSymbol: '₺',
            precision: 2,
            thousandSeparator: '.',
            decimalSeparator: ',',
          },
        },
        processes: [
          {
            type: 'AUTHORIZED',
            amount: 1700,
            status: 'SUCCESS',
            createdAt: '2023-03-30T12:24:45.428Z',
            updatedAt: '2023-03-30T12:24:45.428Z',
          },
        ],
      },
      {
        _id: '64257f3514032338ec2f453f',
        createdAt: '2023-03-30T12:23:17.452Z',
        updatedAt: '2023-03-30T12:24:38.542Z',
        amount: 100,
        amountOriginal: 1,
        balance: 100,
        status: 'AUTHORIZED',
        description: 'mixed payments test',
        accountId: '62e7d0d482cb8912cebadc1c',
        payment: {
          provider: 'getirmoney',
          method: 'loyalty_points',
          data: {
            threeDPayment: false,
            success: true,
          },
          currency: {
            symbol: '₺',
            codeName: 'LIRA',
            codeAlpha2: 'TR',
            codeAlpha3: 'TRY',
            codeNumeric: 949,
            suffixSymbol: '',
            prefixSymbol: '₺',
            precision: 2,
            thousandSeparator: '.',
            decimalSeparator: ',',
          },
        },
        processes: [
          {
            type: 'AUTHORIZED',
            amount: 100,
            status: 'SUCCESS',
            createdAt: '2023-03-30T12:24:38.541Z',
            updatedAt: '2023-03-30T12:24:38.542Z',
          },
        ],
      },
    ],
    financialSummary: {
      totalAmount: 1800,
      totalBalance: 1800,
      currency: {
        symbol: '₺',
        codeName: 'LIRA',
        codeAlpha2: 'TR',
        codeAlpha3: 'TRY',
        codeNumeric: 949,
        suffixSymbol: '',
        prefixSymbol: '₺',
        precision: 2,
        thousandSeparator: '.',
        decimalSeparator: ',',
      },
      totalRequestedAmount: 1800,
      totalRequestedOriginalAmount: 18,
      status: 'AUTHORIZED',
    },
  },
};

export const mockedEvent = {
  data: {
    location: 'TR',
    merchantReference: '62de4080874d552841772a48',
    merchant: {
      _id: '625ff43a90538f785d028136',
      key: 'GETIR10-TR-TIP',
    },
    createdAt: '2022-07-25T07:04:37.191Z',
    updatedAt: '2022-07-25T07:04:38.912Z',
    shopper: {
      _id: '61a8dd214ca4843078504c67',
      reference: '87a168df4d2fa0e4b23fb8f6',
      name: 'Test Otomasyon',
      email: 'automation750@getir.com',
      phoneNumber: '+905999002750',
      shopperIp: '',
    },
    mode: 'direct',
    events: [
      {
        _id: '62de4080874d552841772a48',
        createdAt: '2022-07-25T07:04:37.191Z',
        updatedAt: '2022-07-25T07:04:38.912Z',
        amount: 500,
        amountOriginal: 5,
        balance: 500,
        status: 'AUTHORIZED',
        description: '',
        accountId: '00079270822',
        payment: {
          provider: 'masterpass',
          method: 'scheme',
          data: {
            token: '********************',
            postCode: '',
            cardData: {
              cardId:
                '201BAFBF91C85C6312ED70AF46CFF2A80CD56246726D04A9995159A4181EE077',
              cardNo: '528939********16',
              cardStatus: '0000100101',
              bankIca: '2030',
              eftCode: '0062',
              loyaltyCode: '',
              isMasterpass: true,
              isActive: false,
              isSection: false,
              isSelected: true,
              shouldShowDebitWarning: false,
              name: 'garanti',
              productName: 'SM',
              bankCode: 2,
            },
            approvalCode: '304919',
            maskedAccountNo: '************5016',
            maskedSenderRta: '************5016',
            processedAmount: '500',
            processedPosBank: '2030',
            reconciliationDate: '25.07.2022 10:04:38',
            requestBody:
              '<Envelope xmlns="http://www.w3.org/2003/05/soap-envelope"> <Body><CommitPurchase xmlns="http://phaymobile.cardtekgroup/Tmm/"> <CommitPurchaseRequest xmlns="http://phaymobile.cardtekgroup/Tmm/RemotePurchaseP2M"><transaction_header xmlns="http://phaymobile.cardtekgroup/Tmm/RemotePurchaseP2M"> <client_id xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes">34700704</client_id> <request_datetime xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes">2022-07-25T07:04:37+00:00</request_datetime> <request_reference_no xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes">658732677218</request_reference_no> <send_sms xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes">N</send_sms> <send_sms_language xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes">eng</send_sms_language> <client_token xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes"></client_token> </transaction_header><transaction_body xmlns="http://phaymobile.cardtekgroup/Tmm/RemotePurchaseP2M"> <amount>500</amount> <macro_merchant_id>00079270822</macro_merchant_id> <order_no>62de4080874d552841772a48</order_no> <token>1641835D4297DA4BC1E5D44E37E35320D5C2C5547C850FA6170B0DBDC6FB5A58A90F158D477BA7B96B927E06AF41E5F858A6F27CA180093C7FF7A1ABA0A169AF53C6E65008CBD19E27264C588E6769EA07DABEB4A6C9958D2072474BA099E858</token><bank_ica>2030</bank_ica></transaction_body></CommitPurchaseRequest></CommitPurchase></Body></Envelope>',
            requestReferenceNo: '658732677218',
            responseBody:
              '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><CommitPurchaseResponse xmlns="http://phaymobile.cardtekgroup/Tmm/"><CommitPurchaseResult><transaction_header xmlns="http://phaymobile.cardtekgroup/Tmm/RemotePurchaseP2M"><client_id xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes">34700704</client_id><response_datetime xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes">2022-07-25T10:04:38.3540037+03:00</response_datetime><request_reference_no xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes">658732677218</request_reference_no><request_datetime xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes">2022-07-25T10:04:37+03:00</request_datetime><send_sms xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes">N</send_sms><send_sms_language xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes">eng</send_sms_language></transaction_header><transaction_body xmlns="http://phaymobile.cardtekgroup/Tmm/RemotePurchaseP2M"><retrieval_reference_no xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes">500034895346</retrieval_reference_no><masked_account_no xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes">************5016</masked_account_no><currency_code xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes" /><approval_code xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes">304919</approval_code><reserved_field_1 xsi:nil="true" xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes" /><reserved_field_2 xsi:nil="true" xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes" /><reserved_field_3 xsi:nil="true" xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes" /><reserved_field_4 xsi:nil="true" xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes" /><merchant_name>00079270822</merchant_name><reconciliation_date>25.07.2022 10:04:38</reconciliation_date><masked_sender_rta>************5016</masked_sender_rta><requestOrderId>62de4080874d552841772a48</requestOrderId></transaction_body><additional_fields xmlns="http://phaymobile.cardtekgroup/Tmm/RemotePurchaseP2M"><custom_field_01 name="Bank_Ica" value="2030" xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes" /><custom_field_02 xsi:nil="true" xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes" /><custom_field_03 name="Amount" value="500" xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes" /><custom_field_04 name="Bank_Ret_Ref_No" value="220607738628" xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes" /><custom_field_05 xsi:nil="true" xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes" /><custom_field_06 xsi:nil="true" xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes" /><custom_field_07 xsi:nil="true" xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes" /><custom_field_08 xsi:nil="true" xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes" /><custom_field_09 xsi:nil="true" xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes" /><custom_field_10 name="Installment_Count" xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes" /><custom_field_11 xsi:nil="true" xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes" /><custom_field_12 xsi:nil="true" xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes" /><custom_field_13 xsi:nil="true" xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes" /><custom_field_14 xsi:nil="true" xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes" /><custom_field_15 name="transaction_type" value="PURCHASE" xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes" /><custom_field_16 xsi:nil="true" xmlns="http://phaymobile.cardtekgroup/Tmm/CommonTypes" /></additional_fields></CommitPurchaseResult></CommitPurchaseResponse></soap:Body></soap:Envelope>\r\n',
            responseTime: '2022-07-25T10:04:38.3540037+03:00',
            retrievalReferenceNo: '500034895346',
            threeDPayment: false,
          },
          currency: {
            symbol: '₺',
            codeName: 'LIRA',
            codeAlpha2: 'TR',
            codeAlpha3: 'TRY',
            codeNumeric: 949,
            suffixSymbol: '',
            prefixSymbol: '₺',
            precision: 2,
            thousandSeparator: '.',
            decimalSeparator: ',',
          },
        },
        processes: [
          {
            type: 'AUTHORIZED',
            amount: 500,
            status: 'SUCCESS',
            createdAt: '2022-07-25T07:04:38.912Z',
            updatedAt: '2022-07-25T07:04:38.912Z',
          },
        ],
        statusHistory: [
          {
            status: 'RECEIVED',
            date: '2022-07-25T07:04:37.191Z',
          },
          {
            status: 'AUTHORIZED',
            date: '2022-07-25T07:04:38.912Z',
          },
        ],
      },
    ],
    transactionId: '62de40854f582c743ee43099',
    paymentOverview: {
      totalAmount: 500,
      totalBalance: 500,
      currency: {
        symbol: '₺',
        codeName: 'LIRA',
        codeAlpha2: 'TR',
        codeAlpha3: 'TRY',
        codeNumeric: 949,
        suffixSymbol: '',
        prefixSymbol: '₺',
        precision: 2,
        thousandSeparator: '.',
        decimalSeparator: ',',
      },
      status: 'AUTHORIZED',
      transactionId: '62de40854f582c743ee43099',
    },
    paymentLifecycle: {
      lastStatus: 'TO BE DEFINED',
      statuses: [
        {
          date: '2022-04-13T01:15:51+02:00',
          journalType: 'TO BE DEFINED',
        },
        {
          auditUser: 'TO BE DEFINED',
          date: '2022-04-13T01:15:37+02:00',
          'journalType:': 'TO BE DEFINED',
        },
        {
          auditUser: 'ws@Company.GetirGROUP',
          date: '2022-04-13T01:15:36+02:00',
          journalType: 'TO BE DEFINED',
        },
      ],
    },
  },
};

export const mockedInstallment = {
  cardUserType: 'PERSONAL',
  version: 1,
  updatedAt: 1677597041813,
  updatedBy: '60180d20b14121329028d0a2',
  installments: [
    {
      commission: 5,
      posIca: '2110',
      installment: 2,
      isEnabled: true,
      posBank: 'Akbank',
      id: 'PERSONAL-2110-2',
    },
  ],
  posBankList: [
    {
      posBank: 'Turkiye Garanti Bankasi A.S.',
      posIca: '2030',
    },
  ],
};

export const mockedFraudAllRule = {
  id: '65d84970ebfa7481888b62b2',
  createdAt: '2024-07-29T13:09:09.134268',
  name: 'Test120k',
  eventKeyField: 'transactionId',
  eventType: 'transaction',
  ruleOperator: '>',
  ruleValueType: 'LIST',
  score: 10,
  enable: true,
  force3dEvent: false,
  blockEvent: true,
  whiteEvent: false,
  useRequestEventKeyFieldValue: true,
};

export const mockedFraudRule = {
  ...mockedFraudAllRule,
  ruleValue:
    '85d987c4-8a5d-421f-b620-9a050f90c0a9,8aec95cc-d6c8-4eb5-8cc0-22c86fa06422,26802249-602b-497f-a7ad-9dd8a0c22bb9,91174bea-4971-43c0-b767-8e35d14e0c9b',
};

export const mockedMerchants = { data: [mockedMerchant] };

export const mockedTransactions = { data: [mockedTransaction] };

export const mockedTransactionDetail = { data: mockedTransaction };

export const mockedEventDetail = { data: mockedEvent };

export const mockedMerchantDetail = { data: mockedMerchant };

export const mockedFraudAllRules = { data: [mockedFraudAllRule] };

export const mockedFraudRuleDetail = { data: mockedFraudRule };
