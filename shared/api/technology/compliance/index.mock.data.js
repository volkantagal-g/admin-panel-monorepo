export const mockedSummary = {
  node: {
    vulnerability: {
      total: 174,
      vulnerable: 137,
    },
    versions: {
      total: 584,
      distribution: {
        10: 26,
        12: 10,
        14: 114,
        16: 34,
        18: 84,
        'Could not detected!': 316,
      },
    },
  },
};
export const mockedRepositories = [{
  _id: '6413435140d523df1e684b2e',
  createdAt: '2023-03-16T16:26:57.931Z',
  currentVersion: '1.23.0',
  dependenciesCount: 29,
  devDependenciesCount: 7,
  isRepoVulnerable: true,
  name: 'admin-panel-api-gateway',
  vulnerabilityCountInfo: {
    critical: 6,
    high: 41,
    info: 0,
    low: 13,
    moderate: 24,
  },
},
{
  _id: '6413449f40d523df1e685130',
  createdAt: '2023-03-16T16:32:31.772Z',
  currentVersion: '3.4.0',
  dependenciesCount: 19,
  devDependenciesCount: 14,
  isRepoVulnerable: true,
  name: 'admin-panel-auth-service',
  vulnerabilityCountInfo: {
    critical: 0,
    high: 0,
    info: 0,
    low: 0,
    moderate: 2,
  },
}];

export const mockedVulnerabilities = [
  {
    _id: '641343b540d523df1e684cf7',
    createdAt: '2023-03-16 16:28:37.332680129 +0000 UTC',
    module: 'mongoose',
    path: 'mongoose>mpath',
    recommendation: 'Upgrade to version 0.8.4 or later',
    reportedAt: '2021-09-02T22:02:25.000Z',
    repositoryName: 'admin-panel-stock-api-gateway',
    severityLevel: 'critical',
    target: '7.0.2',
    title: 'Type confusion in mpath',
    url: 'https://github.com/advisories/GHSA-p92x-r36w-9395',
  },
  {
    _id: '641343b540d523df1e684d0f',
    createdAt: '2023-03-16 16:28:37.332695539 +0000 UTC',
    module: 'handlebars',
    path: 'hapi-swagger>handlebars>optimist>minimist',
    recommendation: 'Upgrade to version 0.2.4 or later',
    reportedAt: '2022-03-18T00:01:09.000Z',
    repositoryName: 'admin-panel-stock-api-gateway',
    severityLevel: 'critical',
    target: '4.7.7',
    title: 'Prototype Pollution in minimist',
    url: 'https://github.com/advisories/GHSA-xvch-5gv4-984h',
  }];

export const mockedNodeVersions = [
  {
    _id: '64acd41effb69fafa7afe808',
    createdAt: '2023-07-11 04:01:34.43544579 +0000 UTC',
    repoName: 'accounting-service',
    version: '10',
  },
  {
    _id: '64acd3ccffb69fafa7afe66c',
    createdAt: '2023-07-11 04:00:12.508047748 +0000 UTC',
    repoName: 'admin-panel-auth-service',
    version: '14',
  },
];
