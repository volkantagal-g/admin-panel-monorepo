export const CENTER_OF_TURKEY = [39, 35];
export const MAP_DEFAULT_ZOOM = 6;

export const OSM_GLYPHS_URLS = 'https://fonts.openmaptiles.org/{fontstack}/{range}.pbf';

export const TILE_URLS = {
  osm: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
  esriSatellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
};
export const ATTRIBUTIONS = {
  osm: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap contributors</a> 2022',
  esriSatellite: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA,' +
  'USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
};

export const MAP_TILES = {
  OSM: {
    title: 'osm',
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles: [TILE_URLS.osm],
        tileSize: 256,
        attribution: ATTRIBUTIONS.osm,
        maxzoom: 20,
      },
    },
    glyphs: OSM_GLYPHS_URLS,
    layers: [
      {
        id: 'osm',
        type: 'raster',
        source: 'osm',
      },
    ],
  },
  ESRI: {
    title: 'esri',
    version: 8,
    sources: {
      esri: {
        type: 'raster',
        tiles: [TILE_URLS.esriSatellite],
        tileSize: 256,
        attribution: ATTRIBUTIONS.esriSatellite,
      },
    },
    glyphs: OSM_GLYPHS_URLS,
    layers: [
      {
        id: 'esri',
        type: 'raster',
        source: 'esri',
      },
    ],
  },
};
