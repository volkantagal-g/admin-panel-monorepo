import { Button } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

export const Arrows = ({
  isUpdatePending,
  isFormEditable,
  classes,
  onArrowClick,
  index,
  setSubstituteProductsModalData,
  setFieldValue,
  disabled,
  values,
  selectedProducts,
  setSelectedProducts,
  selectedProductsIndex,
}) => {
  return (
    <div className={classes.arrowsWrapper}>
      <Button
        type="text"
        icon={<ArrowUpOutlined className={(isUpdatePending || !isFormEditable) ? undefined : classes.arrowIcon} />}
        onClick={() => onArrowClick({
          index,
          selectedProductsIndex,
          direction: 'up',
          setSubstituteProductsModalData,
          setFieldValue,
          values,
          selectedProducts,
          setSelectedProducts,
        })}
        disabled={disabled || isUpdatePending || !isFormEditable}
        className={classes.arrowButton}
      />
      <Button
        type="text"
        icon={<ArrowDownOutlined className={(isUpdatePending || !isFormEditable) ? undefined : classes.arrowIcon} />}
        onClick={() => onArrowClick({
          index,
          direction: 'down',
          setSubstituteProductsModalData,
          setFieldValue,
          values,
          selectedProducts,
          setSelectedProducts,
        })}
        disabled={disabled || isUpdatePending || !isFormEditable}
        className={classes.arrowButton}
      />
    </div>
  );
};
