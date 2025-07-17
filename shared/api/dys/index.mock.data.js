export const mockedDysConfigs = {
  market: {
    dds_weight: 0.3,
    sts_weight: 0.3,
    kds_weight: 0.2,
    dts_weight: 0.2,
  },
  sc: {
    dds_weight: 0.4,
    sts_weight: 0.25,
    kds_weight: 0.15,
    dts_weight: 0.2,
  },
  water: {
    dds_weight: 0.9,
    sts_weight: 0,
    kds_weight: 0,
    dts_weight: 0.1,
  },

};

export const marketValues = {
  dds_weight: 30,
  sts_weight: 30,
  kds_weight: 20,
  dts_weight: 20,
};

export const formattedMockedDysConfigs = {
  market: {
    ddsWeight: 0.3,
    stsWeight: 0.3,
    kdsWeight: 0.2,
    dtsWeight: 0.2,
  },
  sc: {
    ddsWeight: 0.4,
    stsWeight: 0.25,
    kdsWeight: 0.15,
    dtsWeight: 0.2,
  },
  water: {
    ddsWeight: 0.9,
    stsWeight: 0,
    kdsWeight: 0,
    dtsWeight: 0.1,
  },

};

export const mockedHighLevelDysByDayConfig = {
  warehouses: [
    {
      franchise_id: '618e3f1d4a6b7e3e70fc2d20',
      warehouse_id: '61307aa11c5055671e824105',
      dds_point: 98.6,
      dts_point: 99.1,
      sts_point: 97.6668049344053,
      kds_point: 97.0899353007196,
      franchise_name: 'KADİRAĞA LOJİSTİK SANAYİ TİCARET LİMİTED ŞİRKETİ',
      warehouse_name: 'Sancaktar',
      dds_weight: 0.5,
      sts_weight: 0.25,
      kds_weight: 0.15,
      dts_weight: 0.1,
      dds_point_weighted: 49.3,
      sts_point_weighted: 24.416701233601326,
      dts_point_weighted: 9.91,
      kds_point_weighted: 14.56349029510794,
      total: 98.19019152870926,
      city_id: '5fd60fe00000010007800000',
      country_id: '55999ad00000010000000000',
      letter: 'A+',
      letter_dds: 'A',
      letter_sts: 'B+',
      letter_kds: 'C+',
      letter_dts: 'D+',
    },
  ],
  total: 2,
  avg_dys_point: 77,
  avg_dys_letter: 'C',
};

export const mockedHighLevelDysByPeriodConfig = {

  warehouses: [
    {
      franchise_id: '62035d25c1481a7e10586574',
      warehouse_id: '61434164fadca5b7316676c8',
      dds_point: 99.8,
      dts_point: 100,
      sts_point: 30,
      kds_point: 0,
      franchise_name: 'NİRVANA BİLİŞİM SANAYİ VE TİCARET LİMİTED ŞİRKETİ',
      warehouse_name: 'Eskisaray',
      dds_weight: 0.5,
      sts_weight: 0.25,
      kds_weight: 0.15,
      dts_weight: 0.1,
      dds_point_weighted: 49.9,
      sts_point_weighted: 7.5,
      dts_point_weighted: 10,
      kds_point_weighted: 0,
      total: 50.86,
      city_id: '5fd60fe00000010003900000',
      country_id: '55999ad00000010000000000',
      letter: 'C',
      letter_dds: 'A+',
      letter_sts: 'F',
      letter_kds: 'F',
      letter_dts: 'A+',
    },
  ],
  total: 105,
  avg_dys_point: 50.85542201180728,
  avg_dys_letter: 'C',
};
