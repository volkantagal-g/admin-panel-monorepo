import { createUseStyles } from 'react-jss';

export default createUseStyles(() => {
  return {
    batchTimeline: {
      minHeight: '180px',
      display: 'flex',
      alignItems: 'center',
      overflowX: 'hidden',
      padding: '25px',
    },
    batchBadge: {
      width: '32px',
      height: '32px',
      marginLeft: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      marginTop: '-10px',
      borderRadius: '2px',

      '& .tooltip': {
        visibility: 'hidden',
        width: '120px',
        backgroundColor: '#555',
        color: '#fff',
        textAlign: 'center',
        borderRadius: '6px',
        padding: '5px',
        position: 'absolute',
        zIndex: '1',
        bottom: '125%',
        left: '50%',
        marginLeft: '-60px',
        opacity: '0',
        transition: 'opacity 0.3s',
        fontSize: '10px',

        '&::after': {
          content: '""',
          position: 'absolute',
          top: '100%',
          left: '50%',
          marginLeft: '-5px',
          borderWidth: '5px',
          borderStyle: 'solid',
          borderColor: '#555 transparent transparent transparent',
        },
      },

      '&:hover .tooltip': {
        visibility: 'visible',
        opacity: '1',
      },

      '& .batch-badge-arrow': {
        content: "''",
        position: 'absolute',
        top: '100%',
        left: '50%',
        marginLeft: '-5px',
        width: '0',
        height: '0',
        borderTop: 'solid 5px',
        borderLeft: 'solid 5px transparent',
        borderRight: 'solid 5px transparent',
      },

      '&:hover .hover_1': { backgroundColor: '#5D3EBC' },

      '&:hover .hover_2': { backgroundColor: '#E23737' },

      '&:hover .hover_3': { backgroundColor: '#01CC78' },

      '&:hover .hover_4': { backgroundColor: '#F8AA1C' },

      '&:hover .hover_5': { backgroundColor: '#FFD300' },

      '&:hover .hover_6': { backgroundColor: '#0090FF' },

      '&:hover .hover_7': { backgroundColor: '#007B48' },

      '&:hover .hover_8': { backgroundColor: '#FF00A8' },

      '&:hover .hover_9': { backgroundColor: '#1BA5D0' },

      '&:hover .hover_10': { backgroundColor: '#001FC1' },

      '& .batch-left-corner-icon': {
        position: 'absolute',
        top: '-10px',
        left: '-10px',
      },

      '& .batch-right-corner-icon': {
        position: 'absolute',
        top: '-5px',
        right: '-5px',
        backgroundColor: '#000000',
        color: '#ffffff',
        borderRadius: '50px',
        width: '12px',
        height: '12px',
        textAlign: 'center',
        fontSize: '10px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },

      '& .batch-timeline-progress': {
        backgroundColor: 'rgba(28, 52, 84, 0.26)',
        borderRadius: '4px',
        height: '24px',
        width: '54px',
        display: 'block',
        color: '#ffffff',
        fontWeight: '700',
        fontSize: '12px',
        lineHeight: '22px',
        textAlign: 'center',
      },

      '& .batch-timeline-progress-bar': {
        backgroundColor: 'rgba(25, 59, 103, 0.05)',
        height: '24px',
        width: '56px',
        position: 'absolute',
        top: '40px',
        left: '-115%',
      },
    },
    spinContent: {
      display: 'flex',
      alignItems: 'center',
      margin: '10px',
      textAlign: 'center',
      justifyContent: 'center',
    },
  };
});
