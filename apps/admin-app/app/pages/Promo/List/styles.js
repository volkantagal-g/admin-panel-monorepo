import { createUseStyles } from 'react-jss';

export default createUseStyles({
  promoCodeCol: props => ({
    background: props?.bgColor || '#5cb85c',
    color: props?.textColor || 'white',
    display: 'inline-block',
    padding: '.2em .6em .3em',
    fontSize: '75%',
  }),
});
