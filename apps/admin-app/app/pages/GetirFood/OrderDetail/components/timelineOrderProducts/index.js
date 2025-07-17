import { get, has } from 'lodash';
import { useTranslation } from 'react-i18next';

import { priceFormatter } from '@app/pages/GetirFood/OrderDetail/components/timelineOrder/util';
import { getLangKey } from '@shared/i18n';
import { currency, isNullOrEmpty } from '@shared/utils/common';

const GetProductComponent = ({ foodProduct }) => {
  const { t } = useTranslation('foodOrderPage');
  const getSubOption = subOption => (
    <span key={get(subOption, '_id')}>
      {`${get(subOption, ['name', getLangKey()], '')} - (
        ${priceFormatter(get(subOption, 'price'))} ${currency()})`}
    </span>
  );

  const getSubOptionCategory = subOptionCategory => (
    <ul key={get(subOptionCategory, '_id')}>
      {get(subOptionCategory, ['name', getLangKey()])}
      <li>
        {get(subOptionCategory, 'options', []).map(subOption => getSubOption(subOption))}
      </li>
    </ul>
  );

  const getOptionCategory = option => (
    <li key={get(option, '_id')}>
      {`${get(option, ['name', getLangKey()], '')} - (${priceFormatter(get(option, 'price'), '-')} ${currency()})`}
      <ul>
        {get(option, 'optionCategories', []).length > 0 && (
          <li>
            {get(option, 'optionCategories', []).map(subOptionCategory => getSubOptionCategory(subOptionCategory))}
          </li>
        )}
      </ul>
    </li>
  );

  const getOptionsCategories = optionCategory => (
    has(optionCategory, 'name') && (
      <ul>
        <li key={get(optionCategory, '_id')}>
          {get(optionCategory, ['name', getLangKey()])}
          <ul>
            {get(optionCategory, 'options', []).map(option => getOptionCategory(option))}
          </ul>
        </li>
      </ul>
    )
  );

  return (
    <li key={get(foodProduct, '_id')}>
      <span>
        {`${get(foodProduct, 'count')}x - ${get(foodProduct, ['name', getLangKey()], '')} - (
        ${priceFormatter(get(foodProduct, 'totalPriceWithOption'))} ${currency()})`}
      </span>
      {
        !isNullOrEmpty(get(foodProduct, 'note', null)) && (
          <ul className="list-unstyled">
            <li>{t('PRODUCT.NOTE')} {get(foodProduct, 'note')}</li>
          </ul>
        )
      }
      {get(foodProduct, 'optionCategories', []).length > 0 && get(foodProduct, 'optionCategories').map(optionCategory => getOptionsCategories(optionCategory))}
    </li>
  );
};

export default GetProductComponent;
