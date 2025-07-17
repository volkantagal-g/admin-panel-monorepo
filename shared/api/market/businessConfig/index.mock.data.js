export const mockedConfigMessage = {
  key: 'co:getir10:ERROR_MESSAGES_CLIENT_LOCATION_OUT_OF_SERVICE_AREA_WITH_POLYGONS',
  type: 'Object',
  value: {
    tr: 'Şu anda hizmet verdiğimiz işaretli bölgenin dışındasınız.',
    en: 'You are currently outside of our service area.',
    fr: 'Vous êtes actuellement en dehors de notre zone de livraison.',
    de: 'Du befindest Dich außerhalb unseres Liefergebietes.',
    nl: 'Je bevindt je momenteel buiten het bezorggebied.',
    it: 'Sei fuori servita.ITYH',
    pt: 'No momento, está fora da nossa área de serviço.',
    es: 'Actualmente estás fuera del área de servicio.',
    'en-US': 'You are currently outside the marked area that we serve.',
  },
  isCustomEnabled: true,
  customValue: {
    TR: {
      tr: 'Şu anda hizmet verdiğimiz işaretli bölgenin dışındasınız',
      en: 'You are currently outside of our service area',
    },
    GB: {
      en: 'test2',
      tr: 'deneme',
    },
    FR: { fr: 'fransızca' },
    DE: {
      de: 'almanca',
      en: 'ingilizce ama alman aksanıyla',
      tr: 'biz hep konfig giriyos kreuzbergde',
    },
  },
};

export const mockUpdateConfigMessageRequest = {
  value:
    {
      tr: 'Şu anda hizmet verdiğimiz işaretli bölgenin dışındasınız.',
      en: 'You are currently outside of our service area.',
      fr: 'Vous êtes actuellement en dehors de notre zone de livraison.',
      de: 'Du befindest Dich außerhalb unseres Liefergebietes.',
      nl: 'Je bevindt je momenteel buiten het bezorggebied.',
      it: 'Sei fuori servita.ITYH',
      pt: 'No momento, está fora da nossa área de serviço.',
      es: 'Actualmente estás fuera del área de servicio..',
      'en-US': 'You are currently outside the marked area that we serve.',
    },
  isCustomEnabled: true,
  configType: 'Object',
  configKey: 'co:getir10:ERROR_MESSAGES_CLIENT_LOCATION_OUT_OF_SERVICE_AREA_WITH_POLYGONS',
};

export const mockedConfigAggression = {
  key: 'co:water:MANUAL_WAREHOUSE_AGGRESSION_LEVEL',
  type: 'Object',
  value: {
    isActive: true,
    aggressionLevel: 2,
  },
  isCustomEnabled: true,
  customValue: {
    TR: {
      isActive: true,
      aggressionLevel: 1,
      isSameAggressionLevelActive: true,
    },
    GB: {
      isActive: true,
      aggressionLevel: 2,
    },
  },
};

export const mockedNotFoundConfigDeliveryBatch = {
  key: 'co:market:DELIVERY_BATCH_QUEUE_LIMITS.DURATION',
  type: 'Object',
};

export const marketBusinessConfigMocks = {
  configs: [
    mockedConfigMessage,
    mockedConfigAggression,
  ],
  mockedNotFoundConfigs: [
    mockedNotFoundConfigDeliveryBatch,
  ],
};
