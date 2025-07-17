import { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import 'react-quill/dist/quill.snow.css';

import useStyles from './styles';
import { usePrevious } from '@shared/hooks';
import { FloatingLabel } from '../FloatingLabel';
import { FormItem } from '@shared/components/GUI/FormItem';

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
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
];

export const TextEditor = memo(
  ({
    value,
    onChange,
    disabled,
    originalValue,
    toolbarItems,
    formats,
    hasForm,
    label,
    errors,
    name,
    className,
  }) => {
    const editorContainerRef = useRef();
    const prevValue = usePrevious(value);
    const classes = useStyles();
    const [quillValue, setQuillValue] = useState('');

    const modules = useMemo(
      () => ({
        toolbar: toolbarItems || [],
        clipboard: { matchVisual: false },
      }),
      [toolbarItems],
    );

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
    const handleChange = useCallback(
      changedValue => {
        setQuillValue(changedValue);
        let newValue = changedValue
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
      },
      [onChange, prevValue],
    );

    const memoizedTextEditor = useMemo(
      () => (
        <div ref={editorContainerRef} className={`${classes.textEditorContainer} ${className} ${disabled && classes.hideToolbar}`}>
          <FloatingLabel label={label}>
            <ReactQuill
              readOnly={disabled}
              theme="snow"
              value={quillValue}
              onChange={handleChange}
              modules={modules}
              formats={formats}
            />
          </FloatingLabel>
        </div>
      ),
      [classes.textEditorContainer, classes.hideToolbar, className, disabled, label, quillValue, handleChange, modules, formats],
    );

    if (hasForm) {
      return (
        <FormItem name={name} errors={errors}>
          {memoizedTextEditor}
        </FormItem>
      );
    }

    return memoizedTextEditor;
  },
);

TextEditor.propTypes = {
  name: PropTypes.string,
  errors: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  ),
  label: PropTypes.string,
  hasForm: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  originalValue: PropTypes.string,
  toolbarItems: PropTypes.arrayOf(PropTypes.string),
  formats: PropTypes.arrayOf(PropTypes.string),
};

TextEditor.defaultProps = {
  name: '',
  errors: {},
  label: '',
  hasForm: true,
  value: '',
  onChange: noop,
  disabled: false,
  originalValue: '',
  toolbarItems: DEFAULT_TOOLBAR_ITEMS,
  formats: DEFAULT_FORMATS,
};
