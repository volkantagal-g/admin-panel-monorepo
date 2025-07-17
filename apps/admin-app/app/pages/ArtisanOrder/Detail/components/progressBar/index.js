import { Progress } from 'antd';

const ProgressBar = () => {
  return (
    // eslint-disable-next-line no-inline-styles/no-inline-styles
    <div style={{ width: 170 }}>
      <Progress percent={30} size="small" />
      <Progress percent={50} size="small" status="active" />
      <Progress percent={70} size="small" status="exception" />
      <Progress percent={100} size="small" />
    </div>
  );
};

export default ProgressBar;
