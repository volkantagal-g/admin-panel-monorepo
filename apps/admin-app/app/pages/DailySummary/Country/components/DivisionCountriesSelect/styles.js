import { createUseStyles } from 'react-jss';

export default createUseStyles({
  selectInputWrapper: {
    width: 195,
    '& .ant-select-selection-item-content': { maxWidth: 75 },
    border: props => {
      if (props) {
        const {
          localSelectedDivisionCountries,
          defaultSelectedDivisionCountries,
        } = props;
        if (!localSelectedDivisionCountries && defaultSelectedDivisionCountries) {
          return '1px solid #432a97';
        }
        return null;
      }
      return null;
    },
  },
});
