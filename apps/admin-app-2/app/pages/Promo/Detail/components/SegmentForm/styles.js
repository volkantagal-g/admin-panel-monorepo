import { createUseStyles } from 'react-jss';

export default createUseStyles({
  red: { backgroundColor: '#BF2600', color: 'white', padding: '6px 10px', borderRadius: '5px' },
  green: { backgroundColor: '#36B37E', color: 'white', padding: '6px 10px', borderRadius: '5px' },
  orange: { backgroundColor: '#FF991F', color: 'white', padding: '6px 10px', borderRadius: '5px' },
  selectGroup: { '& .ant-select-item-group': { color: '#5d3ebc' } },
});
