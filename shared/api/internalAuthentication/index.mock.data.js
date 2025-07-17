export const mockedTeams = [
  {
    _id: '64f82a503e8d0625fe11a55b',
    name: 'admin panel',
    description: 'only admin panel endpoints',
    status: 0,
    createdAt: '2023-09-06T07:29:20.772Z',
    updatedAt: '2023-09-06T16:21:06.570Z',
  },
  {
    _id: '64f745993e8d0625fe11a550',
    name: 'heimdall',
    description: 'core-services squad',
    status: 1,
    createdAt: '2023-09-05T15:13:29.513Z',
    updatedAt: '2023-09-05T15:13:46.380Z',
  },
];

export const mockedTeamServices = [
  {
    _id: '64f745c83e8d0625fe11a554',
    name: 'microservice-template',
    description: 'template for nodejs repositories',
    teamId: '64f745993e8d0625fe11a550',
    status: 1,
    createdAt: '2023-09-05T15:14:16.511Z',
    updatedAt: '2023-09-05T15:14:49.080Z',
  },
];

export const mockedServices = [
  {
    _id: '64fee5a4c28eca04a247a0d2',
    name: 'client-service', // this name must be unique, as the first element is used to test the filtering logic
    description: 'client related endpoints test',
    team: {
      _id: '64fecfe5c28eca04a247a094',
      name: 'client squad',
    },
    status: 1,
    createdAt: '2023-09-11T10:02:12.424Z',
    updatedAt: '2023-09-12T10:11:12.460Z',
  },
  {
    _id: '64fefe26866a8cad263ca316',
    name: 'test service',
    description: 'test service description',
    team: {
      _id: '64feeac5c28eca04a247a105',
      name: 'edward test team',
    },
    status: 0,
    createdAt: '2023-09-11T11:46:46.669Z',
    updatedAt: '2023-09-11T11:46:46.661Z',
  },
  {
    _id: '64feff40866a8cad263ca323',
    name: 'test service 3',
    description: 'ttttttttttttttttt',
    team: {
      _id: '64feeac5c28eca04a247a105',
      name: 'edward test team',
    },
    status: 0,
    createdAt: '2023-09-11T11:51:28.424Z',
    updatedAt: '2023-09-11T11:51:28.423Z',
  },
  {
    _id: '64fefe3e866a8cad263ca31a',
    name: 'test service again',
    description: 'test service again description',
    team: {
      _id: '64feeac5c28eca04a247a105',
      name: 'edward test team',
    },
    status: 1,
    createdAt: '2023-09-11T11:47:10.462Z',
    updatedAt: '2023-09-12T10:17:50.188Z',
  },
  {
    _id: '64f745c83e8d0625fe11a554',
    name: 'microservice-template',
    description: 'template for nodejs repositories',
    team: {
      _id: '64f745993e8d0625fe11a550',
      name: 'heimdall',
    },
    status: 1,
    createdAt: '2023-09-05T15:14:16.511Z',
    updatedAt: '2023-09-05T15:14:49.080Z',
  },
];

export const mockedSlackConfigurations = {
  _id: '652a5431134102ef28547d5c',
  accessToken: '05ba3137146a79f38f4564139eb9966a4b5c0fac610185274a1ddf00dbf23093',
  workspaceChannelNamePairs: [
    {
      workspaceName: 'getir-auto',
      channelName: 'test-channel-name',
      createdAt: '2023-11-09T15:48:19.503Z',
    },
  ],
  workspaceDMConfigPairs: [
    {
      workspaceName: 'getir',
      isDMEnabled: true,
      createdAt: '2024-02-06T22:25:10.322Z',
    },
  ],
  isActive: true,
  isTokenGenerated: true,
};
