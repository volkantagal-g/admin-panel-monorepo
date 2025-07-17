import { createUseStyles } from 'react-jss';

type ClassNames = 'wrapper';

export const usePromoPictureStyles = createUseStyles<ClassNames>({ wrapper: { '&': { 'max-height': '100% !important' } } });
