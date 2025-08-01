import { Alert, Divider } from 'antd';

interface SelectDropdownWithErrorProps {
  menu: React.ReactNode;
  error?: string | null;
}

export function SelectDropdownWithError({ error, menu }: SelectDropdownWithErrorProps) {
  if (!error) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{menu}</>;
  }

  return (
    <>
      {menu}
      <Divider className="mb-2 mt-2" />
      <Alert className="mr-2 ml-2 mb-1" type="error" message={error} showIcon />
    </>
  );
}
