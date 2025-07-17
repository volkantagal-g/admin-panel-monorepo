import { get, has } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { isNullOrEmpty } from '@shared/utils/common';
import { getProductText, getProductTextWithCount } from './util';

const GetProductComponent = ({ basketProduct, productNote = '' }) => {
  if (!basketProduct) {
    return null;
  }

  const getSubOption = subOption => (
    <span key={get(subOption, 'option')}>{getProductText(subOption)}</span>
  );

  const getSubOptionCategory = subOptionCategory => (
    <ul key={get(subOptionCategory, 'optionCategory')}>
      {get(subOptionCategory, ['name', getLangKey()])}
      <li>
        {get(subOptionCategory, 'options', []).map(subOption => getSubOption(subOption))}
      </li>
    </ul>
  );

  const getOptionCategory = option => (
    <li key={get(option, 'option')}>
      {getProductText(option)}
      {get(option, 'optionCategories', []).length > 0 && (
        get(option, 'optionCategories', []).map(subOptionCategory => getSubOptionCategory(subOptionCategory))
      )}
    </li>
  );

  const getOptionsCategories = optionCategory => (
    has(optionCategory, 'name') && (
      <ul key={get(optionCategory, 'optionCategory')}>
        <li>
          {get(optionCategory, ['name', getLangKey()])}
          {!!get(optionCategory, 'options', []).length && (
            <ul>
              {get(optionCategory, 'options', []).map(option => getOptionCategory(option))}
            </ul>
          )}
        </li>
      </ul>
    )
  );

  const optionCategories = get(basketProduct, 'optionCategories', []).map(optionCategory => getOptionsCategories(optionCategory));

  return (
    <li>
      <span>{getProductTextWithCount(basketProduct)}</span>
      {!isNullOrEmpty(get(basketProduct, 'note', null)) && (
        <div>{productNote} {get(basketProduct, 'note')}</div>
      )}
      {optionCategories}
    </li>
  );
};

export default GetProductComponent;
