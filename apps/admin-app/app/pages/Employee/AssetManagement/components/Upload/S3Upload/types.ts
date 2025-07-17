import { type SelectProps } from 'antd';

export interface S3UploadProps {
  value?: string;
  onChange?: SelectProps['onChange'];
  className?: SelectProps['className'];
  placeholder?: string;
  disabled?: boolean;
  form?: any;
  folderPath?: string;
}
