import { Upload, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { UploadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import useStyles from './styles';

const { Item } = Form;
const { Dragger } = Upload;

function FileUploadWrapper(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    hasError = false,
    inputKey = '',
    label = '',
    selectFileLabel = t('DRAG_AND_DROP_FILE'),
    hintLabel = '',
    disabled = false,
    readonly = false,
    fileList = [],
    onChangeCallback = () => { },
    onDownloadCallback,
    onPreviewCallback,
    accept = '',
  } = props;

  const beforeUpload = file => {
    onChangeCallback([...fileList, file]);
    return false;
  };

  const onRemove = file => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    onChangeCallback(newFileList);
  };

  return (
    <Item help={hasError} validateStatus={hasError ? 'error' : 'success'} name={inputKey} label={label} className={classes.fullWidth}>
      <Dragger
        fileList={fileList}
        listType="picture"
        showUploadList={{ showRemoveIcon: true, showDownloadIcon: true }}
        beforeUpload={beforeUpload}
        onRemove={onRemove}
        accept={accept}
        className={readonly && classes.hidden}
        disabled={disabled}
        {...(onDownloadCallback && { onDownload: onDownloadCallback })}
        {...({ onPreview: onPreviewCallback })}
      >
        {!disabled && (
          <>
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">{selectFileLabel}</p>
            {hintLabel && <p className="ant-upload-hint">{hintLabel}</p>}
          </>
        )}
      </Dragger>
    </Item>
  );
}

FileUploadWrapper.propTypes = {
  hasError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  inputKey: PropTypes.string,
  label: PropTypes.string,
  selectFileLabel: PropTypes.string,
  hintLabel: PropTypes.string,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  fileList: PropTypes.instanceOf(Array),
  onChangeCallback: PropTypes.func,
  onDownloadCallback: PropTypes.func,
  onPreviewCallback: PropTypes.func,
  accept: PropTypes.string,
};

FileUploadWrapper.defaultProps = {
  hasError: false,
  inputKey: '',
  label: '',
  selectFileLabel: '',
  hintLabel: '',
  disabled: false,
  readonly: false,
  fileList: [],
  onChangeCallback: () => { },
  onDownloadCallback: () => { },
  onPreviewCallback: () => { },
  accept: '',
};

export default FileUploadWrapper;
