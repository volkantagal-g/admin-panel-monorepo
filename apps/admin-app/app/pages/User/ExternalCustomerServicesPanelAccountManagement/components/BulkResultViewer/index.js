import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Alert, Result, Button, message as Message } from 'antd';

import useStyles from './styles';

const RenderExtraError = ({ labels, message, onClick, buttonText }) => (
  <div key={labels.root} className="mb-4">
    <Alert message={message} type="error" />
    <Button key={labels.button} onClick={onClick} className="mt-1">{buttonText}</Button>
  </div>
);

const BulkResultViewer = ({ isPending, data, error, translations }) => {
  const classes = useStyles();
  const { updatedCount, problemMailAddressList, gwsUpdatedCount, gwsProblemMailAddressList } = data ?? {};
  const { t } = useTranslation(['externalCustomerServicesPanelAccountManagementPage']);

  const titleByStatus = {
    error: t(translations.title.error),
    info: t(translations.title.info),
    success: t(translations.title.success),
  };
  const subTitleByStatus = {
    error: t(translations.subtitle.error),
    info: t(translations.subtitle.info),
    success: t(translations.subtitle.success, { updatedCount }),
  };
  const hasProblem = !isPending && problemMailAddressList?.length;
  const hasGwsProblem = !isPending && gwsProblemMailAddressList?.length;

  let resultStatus = 'info';
  if (!isPending) {
    if (error) resultStatus = 'error';
    else if (
      (updatedCount === 0 && !isEmpty(problemMailAddressList))
       || (gwsUpdatedCount === 0 && !isEmpty(gwsProblemMailAddressList))) {
      resultStatus = 'error';
    }
    else resultStatus = 'success';
  }

  const resultTitle = titleByStatus[resultStatus];
  const resultSubTitle = subTitleByStatus[resultStatus];

  const handleShowUnmatchedMailAddressesButtonClick = () => {
    Message.error(problemMailAddressList?.map(mailAddress => <p key={mailAddress}>{mailAddress}</p>));
  };

  const handleShowUnmatchedGwsMailAddressesButtonClick = () => {
    Message.error(gwsProblemMailAddressList?.map(({ primaryEmail }) => <p key={primaryEmail}>{primaryEmail}</p>));
  };

  const extra = [];

  if (error && !Array.isArray(error)) {
    extra.push(error);
  }
  if (error && Array.isArray(error) && error.length > 0) {
    const validationErrors = (
      <Alert
        showIcon
        type="error"
        className={classes.validationAlert}
        message={
          t('externalCustomerServicesPanelAccountManagementPage:VALIDATION_ERROR_HEADER', { errorCount: error.length })
        }
        description={(
          <ul className={classes.validationErrorContainer}>
            {error.map(err => <li key={err}>{err}</li>)}
          </ul>
        )}
      />
    );

    extra.push(validationErrors);
  }

  if (hasProblem) {
    extra.push(
      <RenderExtraError
        labels={translations.extra}
        message={t(translations.extra.message, { problemCount: problemMailAddressList?.length })}
        onClick={handleShowUnmatchedMailAddressesButtonClick}
        buttonText={t(translations.extra.label)}
      />,
    );
  }

  if (hasGwsProblem) {
    extra.push(
      <RenderExtraError
        labels={translations.extraForGws}
        message={t(translations.extraForGws.message, { problemCount: gwsProblemMailAddressList?.length })}
        onClick={handleShowUnmatchedGwsMailAddressesButtonClick}
        buttonText={t(translations.extraForGws.label)}
      />,
    );
  }

  return (
    <Result
      status={resultStatus}
      title={resultTitle}
      subTitle={resultSubTitle}
      extra={extra}
    />
  );
};

export default BulkResultViewer;
