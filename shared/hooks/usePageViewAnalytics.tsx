import { useEffect } from 'react';
import { isObject } from 'lodash';

import AnalyticsService from '@shared/services/analytics';

type Props = {
  name: string,
  squad?: string,
  slugs?: string[],
  props?: Object,
};

export default ({
  name,
  squad,
  slugs,
  props,
} : Props) => {
  useEffect(() => {
    AnalyticsService.pageView({
      pageName: name,
      props: {
        ...(squad ? { squad } : undefined),
        ...(slugs ? { urlSlugs: slugs } : undefined),
        ...(isObject(props) ? props : undefined),
      },
    });
  }, [name, squad, props, slugs]);
};
