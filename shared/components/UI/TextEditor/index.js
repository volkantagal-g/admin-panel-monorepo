import { useState, useEffect, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { Row, Col } from 'antd';

import 'react-quill/dist/quill.snow.css';
import useStyles from './styles';
import { usePrevious } from '@shared/hooks';

const bold = Quill.import('formats/bold');
bold.tagName = 'b'; // NOTE: Quill uses <strong> by default
Quill.register(bold, true);

const DEFAULT_TOOLBAR_ITEMS = [
  [{ header: [1, 2, false] }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [{ list: 'ordered' }, { list: 'bullet' }, 'link'],
];

const DEFAULT_FORMATS = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'link',
];

const TextEditor = props => {
  const editorContainerRef = useRef();
  const { value = '', onChange, disabled, addonAfter, originalValue, toolbarItems = DEFAULT_TOOLBAR_ITEMS, formats = DEFAULT_FORMATS } = props;
  const prevValue = usePrevious(value);
  const classes = useStyles();
  const [quillValue, setQuillValue] = useState('');

  const modules = {
    toolbar: disabled ? false : toolbarItems,
    clipboard: { matchVisual: false },
  };

  useEffect(() => {
    // NOTE: when canceling on form
    if (value === originalValue) {
      setQuillValue(value);
    }
    // NOTE: initially set quill value
    if (value && !quillValue) {
      const newValue = value.replaceAll('\n', '<br>');
      setQuillValue(newValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // eslint-disable-next-line no-shadow
  const handleChange = value => {
    setQuillValue(value);
    let newValue = value
      .replaceAll('<p><br></p>', '<br>')
      .replaceAll('<p>', '')
      .replaceAll('</p>', '<br>')
      .replaceAll('rel="noopener noreferrer" target="_blank"', '')
      .replaceAll('\n', '<br>');

    /* NOTE: when text-editor empty and save button is clicked, it sends '<br>' text to BE.
    * Following code block clears the value when it equals to '<br>'.
    * */
    if (newValue === '<br>') {
      newValue = '';
    }

    if (prevValue !== newValue) {
      onChange(newValue);
    }
  };

  useEffect(() => {
    if (editorContainerRef && editorContainerRef.current) {
      const editableElement = editorContainerRef.current.querySelector('div[data-gramm]');
      if (disabled) {
        editableElement.classList.add(classes.editable);
        editableElement.setAttribute('contenteditable', false);
        editableElement.classList.add(classes.disabledEditable);
      }
      else {
        editableElement.classList.add(classes.editable);
        editableElement.setAttribute('contenteditable', true);
        editableElement.classList.remove(classes.disabledEditable);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);

  return (
    <div ref={editorContainerRef} className={`${classes.textEditorContainer} ${classes.container}`}>
      <Row>
        {/* Note: w-25 fixes the addon issue here */}
        <Col className="responsiveCol w-25">
          <ReactQuill
            theme="snow"
            value={quillValue}
            onChange={handleChange}
            modules={modules}
            formats={formats}
          />
        </Col>
        {addonAfter && (
          <Col>
            <div className={classes.addon}>
              {addonAfter}
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default TextEditor;
