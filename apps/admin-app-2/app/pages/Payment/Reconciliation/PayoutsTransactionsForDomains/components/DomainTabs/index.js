import { Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators } from '../../redux/actions';
import { domainTabSelector } from '../../redux/selectors';

const { CheckableTag } = Tag;
const DomainTabs = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['payoutsForDomains']);
  const selectedDomain = useSelector(domainTabSelector.getDomain);
  const domains = [
    {
      label: t('FOOD'),
      value: 'Food',
    },
    {
      label: t('LOCAL'),
      value: 'Local',
    },
    {
      label: t('WATER'),
      value: 'Water',
    },
    {
      label: t('TIP'),
      value: 'Tip',
    },
  ];

  const handleChange = (domain = '') => {
    dispatch(Creators.handleDomainTab({ domain }));
  };
  return (
    <div className="w-100 bg-white p-3">
      {domains.map(domain => (
        <CheckableTag
          key={domain.label}
          checked={selectedDomain === domain.value}
          onChange={() => handleChange(domain.value)}
        >
          <div>
            {domain.label}
          </div>
        </CheckableTag>
      ))}
    </div>
  );
};
export default DomainTabs;
