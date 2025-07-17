import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import JsonModal from '@shared/components/UI/JsonModal';

function JsonButton({ data }) {
  const { t } = useTranslation('pickerDetailPage');
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      <Button size="small" onClick={() => setIsVisible(true)}>JSON</Button>
      <JsonModal
        title={t('PAGE_TITLE_PICKER_DETAIL')}
        data={data}
        visible={isVisible}
        handleCancel={() => setIsVisible(false)}
      />
    </div>
  );
}

export default JsonButton;
