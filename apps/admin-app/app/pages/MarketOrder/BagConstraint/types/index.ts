export type Lang = {
  tr: string;
  en: string;
};
export type Item = {
  id: string;
  name: string;
};
export type BagConstraint = {
  _id: string;
  left?: {
    type?: number;
    items: string[];
  };
  right?: {
    type?: number;
    items: string[];
  };
  isActive: boolean;
  match?: boolean;
  description: Lang;
  firstGroup: string[] | Item[];
  secondGroup: string[] | Item[];
  version?: string;
};

export type FromValues = {
  status: boolean;
  description: Lang;
  firstGroupItems: string[] | Item[];
  secondGroupItems: string[] | Item[];
};

export type Value = {
  _id: string;
  name: Lang;
};

export type MasterCategory = {
  value: string;
  label: string;
};
