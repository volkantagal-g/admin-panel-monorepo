export type RankingScenarioNamesType = Record<string, string>;

export type State = {
  getRankingScenarioNamesRequest: {
    isPending: boolean;
    error?: unknown;
    data?: RankingScenarioNamesType;
  }
};
