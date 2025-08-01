import { Menu } from 'antd';

import { fetchPromoUrlHTML } from '@shared/api/promo';
import { isNullOrEmpty } from '@shared/utils/common';
import { t } from '@shared/i18n';
import { createContentHtmlTemplate } from './utils';

export const fetchPromoUrlsHTML = async urls => {
  const promiseArr = [];
  Object.entries(urls).forEach(([language, url]) => {
    if (url) {
      const newUrl = url.replace('http://cdn.getir.com/', 'https://getir.s3.amazonaws.com/').replace('http://cdn-dev.getir.com/', 'https://getir-dev.s3.amazonaws.com/');
      promiseArr.push(
        fetchPromoUrlHTML({ url: newUrl }).then(res => {
          // eslint-disable-next-line no-useless-escape
          const body = res.match('(\<body)(.?\n*)+(\<\/body\>)');
          // eslint-disable-next-line no-useless-escape
          return { [language]: body?.[0].replace(/(\<body)(.*)+(\>)/, '').replace('</body>', '') };
        }),
      );
    }
  });
  const data = await Promise.all(promiseArr);
  const result = {};
  data.forEach(htmlObj => {
    Object.entries(htmlObj).forEach(([language, html]) => {
      const updatedHtml = html.replace(/\n/g, '');
      result[language] = updatedHtml;
    });
  });
  return result;
};

export const getPromoURLsMenu = promoURLs => {
  if (!promoURLs) return null;
  return (
    <Menu>
      {
        Object.entries(promoURLs).map(([language, url]) => (
          <Menu.Item key={language}>
            <a target="_blank" rel="noopener noreferrer" href={url}>
              {language.toUpperCase()}
            </a>
          </Menu.Item>
        ))
      }
    </Menu>
  );
};

export const validatePromoHTMLHasChanged = ({ initialValues, values, field }) => {
  const html = Object.entries(values?.[field]);
  html.map(([language, value]) => {
    if (value === initialValues?.[field]?.[language]) {
      throw new Error(t('promoPage:MESSAGE.PROMO_CONTENT_HAS_NOT_CHANGED'));
    }
    return null;
  });
};

export const validateEmptyPromoHTML = ({ values, field }) => {
  const html = Object.entries(values?.[field]);
  if (!html.length) throw new Error(t('promoPage:MESSAGE.EMPTY_PROMO_CONTENT_HTML'));

  html.map(([, value]) => {
    if (isNullOrEmpty(value)) {
      throw new Error(t('promoPage:MESSAGE.EMPTY_PROMO_CONTENT_HTML'));
    }
    return null;
  });
};

export const getInitialValues = promo => {
  const initialValues = {
    promoURL: promo?.promoURL,
    promoContentURL: promo?.promoContentURL,
    promoBodyContentURL: promo?.promoBodyContentURL,
    promoContentHTML: promo?.promoContentHTML,
    promoBodyContentHTML: promo?.promoBodyContentHTML,
    applyToV2: true,
  };
  return initialValues;
};

export const getPromoHTML = (val, langKey, bodyOnly = false) => {
  const html = createContentHtmlTemplate(val, langKey, bodyOnly);
  if (bodyOnly) {
    return { data: `data:text/html;base64,${btoa(unescape(encodeURIComponent(html)))}` };
  }
  return {
    data: `data:text/html;base64,${btoa(unescape(encodeURIComponent(html)))}`,
    htmlContent: html.toString(),
    language: langKey,
  };
};
