import { createUseStyles } from 'react-jss';

export default createUseStyles({
  selectInputWrapper: {
    width: ({ width }) => {
      return width || 195;
    },
    '@media (max-width: 1200px)': { width: '100%' },
    '& .ant-select-selection-item-content': { maxWidth: 75 },
    border: props => {
      if (props) {
        const {
          localSelectedDivisionCountries,
          defaultSelectedDivisionCountries,
          defaultSelectedDivisionCountry,
        } = props;
        if (
          localSelectedDivisionCountries === null &&
          (defaultSelectedDivisionCountries || defaultSelectedDivisionCountry)
        ) {
          return '1px solid #432a97';
        }
        return null;
      }
      return null;
    },
  },
});
