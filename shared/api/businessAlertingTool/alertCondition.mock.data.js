export const mockedFilteredAlertConditions = {
  results: [
    {
      _id: '5f9b1b9b0e1c9c0b8c0b8c0b',
      name: {
        en: 'Alert Condition Name EN',
        tr: 'Alert Condition Name TR',
      },
      description: {
        en: 'Alert Condition Description EN',
        tr: 'Alert Condition Description TR',
      },
      status: 100,
      lastStatusChangeReason: 200,
      permittedRoles: [
        '5f9b1b9b0e1c9c0b8c0b8c0b',
      ],
      createdBy: {
        id: '5f9b1b9b0e1c9c0b8c0b8c0b',
        name: 'Sukru Gunay',
        type: 1,
      },
      metricGroup: '5f9b1b9b0e1c9c0b8c0b8c0b',
      queryInfo: {
        raw: {},
        workingHours: {
          startMin: 0,
          endMin: 1440,
          timezone: 'Europe/Istanbul',
          days: [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
          ],
        },
      },
      conditions: {
        critical: {
          isActive: true,
          threshold: 90,
          operator: 1,
          occurrences: 1,
        },
        warning: {
          isActive: false,
          threshold: 60,
          operator: 1,
          occurrences: 1,
        },
      },
      notificationPreferences: {
        email: {
          isActive: true,
          recipients: [
            'sukru.gunay@getir.com',
          ],
        },
        slack: {
          isActive: true,
          recipients: [
            {
              workspace: 'T0WCKDX9B',
              channel: 'business-monitoring-oh-sh_t',
            },
          ],
        },
      },
      createdAt: 1681333200000,
      updatedAt: 1681333200000,
    },
  ],
};
