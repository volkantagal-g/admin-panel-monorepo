import {
  schemeReds,
  schemeGreens,
  schemeBlues,
  schemeGreys,
  schemeSpectral,
  schemeRdYlGn,
  schemeRdBu, schemePiYG,
} from 'd3';

export const useColorSchemes = () => ({
  diverging: {
    rdBu: schemeRdBu,
    piyg: schemePiYG,
    rdylgn: schemeRdYlGn,
    spectral: schemeSpectral,
  },
  sequential: {
    reds: schemeReds,
    greens: schemeGreens,
    blues: schemeBlues,
    greys: schemeGreys,
  },
});
