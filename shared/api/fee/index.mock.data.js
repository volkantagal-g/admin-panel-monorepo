export const defaultWarehouseDetails = {
  warehouse_id: '559831e0b1dc700c006a71b0',
  city_name: 'Adiyaman',
  warehouse_name: 'AdıyamanAltınşehir SC',
  service: 'G10',
};

export const mockedFeeDetails = {
  fee: {
    _id: '643d945655decd92efe10558',
    warehouseId: '5db69a4440168df573f4da1a',
    createdAt: '2023-04-17T18:47:50.470Z',
    domainSpecificDetails: [
      {
        domainType: 1,
        feeDetails: {
          deliveryFee: {
            deliveryFeeSource: 'FixedDeliveryFee',
            fixedDeliveryFeeAmount: 30,
            layeredDeliveryFee: {
              regular: [
                {
                  min: 0,
                  fee: 11.99,
                },
                {
                  min: 120,
                  fee: 6.99,
                },
                {
                  min: 180,
                  fee: 0,
                },
              ],
              peak: [
                {
                  min: 0,
                  fee: 5.99,
                },
                {
                  min: 120,
                  fee: 5.99,
                },
                {
                  min: 180,
                  fee: 0,
                },
              ],
            },
            dynamicDeliveryFee: {
              1: [
                {
                  min: 0,
                  fee: 7.99,
                },
                {
                  min: 120,
                  fee: 5.99,
                },
                {
                  min: 180,
                  fee: 0,
                },
              ],
              2: [
                {
                  min: 0,
                  fee: 8.99,
                },
                {
                  min: 120,
                  fee: 6.99,
                },
                {
                  min: 180,
                  fee: 0,
                },
              ],
              3: [
                {
                  min: 0,
                  fee: 9.99,
                },
                {
                  min: 120,
                  fee: 7.99,
                },
                {
                  min: 180,
                  fee: 0,
                },
              ],
              4: [
                {
                  min: 0,
                  fee: 10.99,
                },
                {
                  min: 120,
                  fee: 9.99,
                },
                {
                  min: 180,
                  fee: 0,
                },
              ],
              5: [
                {
                  min: 0,
                  fee: 11.99,
                },
                {
                  min: 120,
                  fee: 10.99,
                },
                {
                  min: 180,
                  fee: 0,
                },
              ],
            },
            freeDeliveryOrderNumber: 2,
          },
          serviceFee: {
            dynamicServiceFee: {
              1: [
                {
                  min: 0,
                  fee: 7.99,
                },
                {
                  min: 120,
                  fee: 5.99,
                },
                {
                  min: 180,
                  fee: 0,
                },
              ],
              2: [
                {
                  min: 0,
                  fee: 8.99,
                },
                {
                  min: 120,
                  fee: 6.99,
                },
                {
                  min: 180,
                  fee: 0,
                },
              ],
              3: [
                {
                  min: 0,
                  fee: 9.99,
                },
                {
                  min: 120,
                  fee: 7.99,
                },
                {
                  min: 180,
                  fee: 0,
                },
              ],
              4: [
                {
                  min: 0,
                  fee: 10.99,
                },
                {
                  min: 120,
                  fee: 8.99,
                },
                {
                  min: 180,
                  fee: 0,
                },
              ],
              5: [
                {
                  min: 0,
                  fee: 11.99,
                },
                {
                  min: 120,
                  fee: 9.99,
                },
                {
                  min: 180,
                  fee: 0,
                },
              ],
            },
            serviceFeeSource: 'DynamicServiceFee',
            layeredServiceFee: {
              peak: [
                {
                  min: 0,
                  fee: 7.99,
                },
                {
                  min: 120,
                  fee: 5.99,
                },
                {
                  min: 180,
                  fee: 0,
                },
              ],
              regular: [
                {
                  min: 0,
                  fee: 8.99,
                },
                {
                  min: 120,
                  fee: 7.99,
                },
                {
                  min: 180,
                  fee: 0,
                },
              ],
            },
            fixedServiceFeeAmount: 10,
          },
        },
        _id: '643d945695a489b4c5033bd3',
      },
    ],
    updatedAt: '2023-04-19T06:31:19.505Z',
  },
};

export const mockedDeliveryFee =
  mockedFeeDetails.fee.domainSpecificDetails[0].deliveryFee;
export const mockedServiceFee =
  mockedFeeDetails.fee.domainSpecificDetails[0].serviceFee;

export const mockedLayeredServiceFees = [
  {
    ...defaultWarehouseDetails,
    service_fee_segment: 'low',
    service_fee_source: 'layered_service_fee',
    low: 0,
    mid: 0,
    high: 0,
    mid_service_fee: 3.99,
    low_service_fee: 5.99,
    high_service_fee: 6.99,
  },
  {
    ...defaultWarehouseDetails,
    service_fee_segment: 'high',
    service_fee_source: 'layered_service_fee',
    low: 90,
    mid: 120,
    high: 150,
    mid_service_fee: 0,
    low_service_fee: 0,
    high_service_fee: 0,
  },
];
export const mockedLayeredDeliveryFees = [
  {
    ...defaultWarehouseDetails,
    delfee_segment: 'low',
    del_fee_source: 'layered_delivery_fee',
    low: 0,
    mid: 0,
    high: 0,
    mid_delfee: 3.99,
    low_delfee: 5.99,
    high_delfee: 6.99,
  },
  {
    ...defaultWarehouseDetails,
    delfee_segment: 'high',
    del_fee_source: 'layered_delivery_fee',
    low: 90,
    mid: 120,
    high: 150,
    mid_delfee: 0,
    low_delfee: 0,
    high_delfee: 0,
  },
];

export const mockedDynamicFees = [
  {
    ...defaultWarehouseDetails,
    delfee_segment: 'low',
    del_fee_source: 'dynamic_delivery_fee',
    level_one: 0,
    level_one_fee: 35,
    level_two: 0,
    level_two_fee: 35,
    level_three: 0,
    level_three_fee: 35,
    level_four: 0,
    level_four_fee: 35,
    level_five: 0,
    level_five_fee: 35,
  },
  {
    ...defaultWarehouseDetails,
    delfee_segment: 'high',
    del_fee_source: 'dynamic_delivery_fee',
    level_one: 35,
    level_one_fee: 0,
    level_two: 35,
    level_two_fee: 0,
    level_three: 35,
    level_three_fee: 0,
    level_four: 35,
    level_four_fee: 0,
    level_five: 35,
    level_five_fee: 0,
  },
];
