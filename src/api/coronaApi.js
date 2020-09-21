import axios from 'axios';

const createGeoJson = (data) => {
  return {
    type: 'FeatureCollection',
    features: data.map((country) => {
      const { countryInfo } = country;
      const { lat, long: lng } = countryInfo;
      return {
        type: 'Feature',
        properties: {
          ...country,
        },
        geometry: {
          type: 'Point',
          coordinates: [lng, lat],
        },
      };
    }),
  };
};

// const geoJson = {
//   type: 'FeatureCollection',
//   features: data.map((country = {}) => {
//     const { countryInfo = {} } = country;
//     const { lat, long: lng } = countryInfo;
//     return {
//       type: 'Feature',
//       properties: {
//        ...country,
//       },
//       geometry: {
//         type: 'Point',
//         coordinates: [ lng, lat ]
//       }
//     }
//   })
// }

// eslint-disable-next-line import/prefer-default-export
export const fetchCountryData = async () => {
  try {
    const response = await axios.get(
      'https://corona.lmao.ninja/v3/covid-19/countries',
    );

    const { data } = response;

    return createGeoJson(data);
    // return { results: data };
  } catch (e) {
    // need better error handler
    // eslint-disable-next-line no-console
    console.log(`Failed to fetch countries: ${e.message}`, e);
  }
};

// const { data = [] } = response;
// const hasData = Array.isArray(data) && data.length > 0;

// if ( !hasData ) return;
