import React from 'react';

import { NumberInput } from '@shared/components/GUI';

interface ChainNumberInputProps {
  value?: number;
  onChange?: (value: number | null) => void;
  name: string;
  label: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  hasForm?: boolean;
  errors?: Record<string, string | boolean>;
}

const ChainNumberInput: React.FC<ChainNumberInputProps> = props => {
  return <NumberInput {...props} />;
};

export default ChainNumberInput;
