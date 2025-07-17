import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { getLangKey } from '@shared/i18n';
import BATBox from '@app/pages/BusinessAlertingTool/components/BATBox';

import useStyles from './styles';

type ValueBoxProps = {
  item: string[];
  removeOnClick: (value: string) => void;
  values: { [x:string]: any };
  disabled: boolean;
};

function ValueBox({ item, removeOnClick, values, disabled = false }: ValueBoxProps) {
  const classes = useStyles();
  const [letter, value] = item;

  return (
    <BATBox>
      <div className={classes.valueContainer}>
        <div className={classes.letterContainer}>
          <div className={classes.letterBox}>{letter}</div>
          <div>{values?.label[getLangKey()] || value}</div>
        </div>
        <div>
          <Button
            type="text"
            size="small"
            danger
            onClick={() => removeOnClick(value)}
            disabled={disabled}
          >
            <DeleteOutlined />
          </Button>
        </div>
      </div>
    </BATBox>
  );
}

export default ValueBox;
