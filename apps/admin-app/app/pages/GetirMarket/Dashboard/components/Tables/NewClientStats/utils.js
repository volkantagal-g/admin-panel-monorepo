import { isEmpty, forEach } from 'lodash';

export const getClientDistributionCounts = data => {
  if (isEmpty(data)) return [];

  const clientDistribution = [
    {
      key: 'downloadClientCount',
      title: 'DOWNLOAD_COUNT',
      data: 0,
    },
    {
      key: 'signupClientCount',
      title: 'SIGN_UP_COUNT',
      data: 0,
    },
    ...(
      data?.subscriptionClientCount > 0 ?
        [
          {
            key: 'subscriptionClientCount',
            title: 'SUBSCRIPTION_SIGN_UP_COUNT',
            data: 0,
            tooltip: 'SUBSCRIPTION_SIGN_UP_COUNT_TOOLTIP',
          },
        ] :
        []
    ),
  ];

  forEach(clientDistribution, (distribution, index) => {
    clientDistribution[index].data += (data[distribution.key] || 0);
  });

  return clientDistribution;
};
