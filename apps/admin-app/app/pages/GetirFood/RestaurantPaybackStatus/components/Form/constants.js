import AllRestaurantsForm from '../AllRestaurantsForm';
import SingleRestaurantForm from '../SingleRestaurantForm';
import PartialRestaurantForm from '../PartialRestaurantsForm';

export const REQUEST_TYPE_OPTIONS = {
  0: { tr: 'Tekil Restoran', en: 'Single Restaurant' },
  1: { tr: 'Tüm Restoranlar', en: 'All Restaurants' },
  2: { tr: 'Restoranları Aktar', en: 'Export Restaurants' },
};

export const FORMS = {
  0: SingleRestaurantForm,
  1: AllRestaurantsForm,
  2: PartialRestaurantForm,
};
