export type InternalTeam = {
    name: string;
    description: string;
    status: number;
}

export type DbInternalTeam = InternalTeam & {
    _id: string;
    createdAt: string;
    updatedAt: string;
};

export type InternalService = {
    name: string;
    description: string;
    status: number;
};

export type DbInternalService = InternalService & {
    _id: string;
    teamId: string;
    createdAt: string;
    updatedAt: string;
};

export type DbInternalServiceWithTeam = InternalService & {
  _id: string;
  team: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type WorkspaceChannelNamePair = {
  workspaceName: string;
  channelName: string;
  createdAt: string;
};

export type WorkspaceDMConfigPair = {
  workspaceName: string;
  isDMEnabled: boolean;
  createdAt: string;
};

export type SlackConfigurations =
  {
    _id: string;
    accessToken: string;
    workspaceChannelNamePairs: WorkspaceChannelNamePair[];
    workspaceDMConfigPairs: WorkspaceDMConfigPair[];
    isActive: boolean;
    isTokenGenerated: boolean;
  };
