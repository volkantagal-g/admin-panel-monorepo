export type Segment = {
  _id: string;
  segment: number;
  description: string;
  status: number;
  type: number;

  countries?: string[];
  domainTypes?: number[];

  updatedAt: string;
  createdAt: string;
  expireAt: string;

  expiration?: {
    isExpired: boolean;
    time: string; // Time
  };
  lifetimeConditions?: {
    isEnabled: boolean;
    reasonText: string;
    createdAt: string; // Time
  };
};
