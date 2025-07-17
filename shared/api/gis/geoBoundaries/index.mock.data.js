export const mockCountryBoundaryData = {
  countryBoundaries: [
    { countryId: '55999ad00000010000000000', geometry: {} },
  ],
};

export const mockCreateCountryBoundarySuccesData = {
  countryBoundary: {
    id: '111111111111111111',
    country: { id: '55999ad00000010001000000' },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [
            33.16533938380883,
            43.166640450355175,
          ],
          [
            33.00883777777778,
            42.49296426836841,
          ],
          [
            34.13838535730636,
            42.608257551752445,
          ],
          [
            33.16533938380883,
            43.166640450355175,
          ],
        ],
      ],
    },
  },
};

export const mockCreateCityBoundarySuccesData = {
  countryBoundary: {
    id: '211111111111111111',
    city: { id: '55999ad00000010000000000' },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [
            33.16533938380883,
            43.166640450355175,
          ],
          [
            33.00883777777778,
            42.49296426836841,
          ],
          [
            34.13838535730636,
            42.608257551752445,
          ],
          [
            33.16533938380883,
            43.166640450355175,
          ],
        ],
      ],
    },
  },
};

export const mockCityBoundaryData = {
  cityBoundaries: [
    { cityId: '55999ad00000010001000000', geometry: {} },
  ],
};
