export type ReducerAPIState = {
  [key: string]: {
    data: any;
    isPending?: boolean;
    error?: string | null;
  };
};
