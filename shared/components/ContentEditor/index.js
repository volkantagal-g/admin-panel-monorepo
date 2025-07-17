import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import Parchment from 'parchment';
import ReactQuill, { Quill } from 'react-quill';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  FontColorsOutlined,
  BgColorsOutlined,
  ClearOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  MenuOutlined,
  FileImageOutlined,
  RedoOutlined,
  UndoOutlined,
} from '@ant-design/icons-svg';
import { renderIconDefinitionToSVGElement } from '@ant-design/icons-svg/es/helpers';
import 'react-quill/dist/quill.snow.css';

import useStyles from './styles';
import { getBase64 } from '@shared/utils/common';

const icons = Quill.import('ui/icons');
icons.bold = renderIconDefinitionToSVGElement(BoldOutlined);
icons.italic = renderIconDefinitionToSVGElement(ItalicOutlined);
icons.underline = renderIconDefinitionToSVGElement(UnderlineOutlined);
icons.color = renderIconDefinitionToSVGElement(FontColorsOutlined);
icons.background = renderIconDefinitionToSVGElement(BgColorsOutlined);
icons.clear = renderIconDefinitionToSVGElement(ClearOutlined);

icons.list = {
  bullet: renderIconDefinitionToSVGElement(UnorderedListOutlined),
  ordered: renderIconDefinitionToSVGElement(OrderedListOutlined),
};
icons.indent = {
  '-1': renderIconDefinitionToSVGElement(MenuFoldOutlined),
  '+1': renderIconDefinitionToSVGElement(MenuUnfoldOutlined),
};
icons.align = {
  '': renderIconDefinitionToSVGElement(AlignLeftOutlined),
  center: renderIconDefinitionToSVGElement(AlignCenterOutlined),
  right: renderIconDefinitionToSVGElement(AlignRightOutlined),
  justify: renderIconDefinitionToSVGElement(MenuOutlined),
};

icons.image = renderIconDefinitionToSVGElement(FileImageOutlined);

icons.undo = renderIconDefinitionToSVGElement(UndoOutlined);
icons.redo = renderIconDefinitionToSVGElement(RedoOutlined);

const Toolbar = ({ tooltips }) => {
  /* eslint-disable jsx-a11y/control-has-associated-label */
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <select className="ql-header" title={tooltips.heading} />
        <select className="ql-size" title={tooltips.size} />
      </span>
      <span className="ql-formats">
        <button type="button" className="ql-bold" title={tooltips.bold} />
        <button type="button" className="ql-italic" title={tooltips.italic} />
        <button type="button" className="ql-underline" title={tooltips.underline} />
        <select className="ql-color" title={tooltips.fontColour} />
        <select className="ql-background" title={tooltips.fontBackgroundColour} />
        <button type="button" className="ql-clean" title={tooltips.removeFormatting} />
      </span>
      <span className="ql-formats">
        <button type="button" className="ql-list" value="ordered" title={tooltips.numberedList} />
        <button type="button" className="ql-list" value="bullet" title={tooltips.bulletList} />
        <button type="button" className="ql-indent" value="-1" title={tooltips.indent} />
        <button type="button" className="ql-indent" value="+1" title={tooltips.dedent} />
        <select className="ql-align" title={tooltips.alignment} />
      </span>
      <span className="ql-formats">
        <button type="button" className="ql-image" title={tooltips.insertImage} />
      </span>
      <span className="ql-formats">
        <button type="button" className="ql-undo" title={tooltips.undo} />
        <button type="button" className="ql-redo" title={tooltips.redo} />
      </span>
    </div>
  );
  /* eslint-enable jsx-a11y/control-has-associated-label */
};

const toolbar = { container: '#toolbar' };

const mapImages = (files, onImageInsert, placeImage) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    // eslint-disable-next-line no-continue
    if (!file.type.startsWith('image/')) continue;
    onImageInsert(file, placeImage);
  }
};

const FileKey = new Parchment.Attributor.Attribute('file-key', 'file-key', { scope: Parchment.Scope.INLINE_BLOT });
Parchment.register(FileKey);

const ATTRIBUTES = ['file-key'];
const ImageEmbed = Quill.import('formats/image');

class S3Image extends ImageEmbed {
  static blotName = 's3Image';

  static className = 's3-image';

  static formats(domNode) {
    return ATTRIBUTES.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        // eslint-disable-next-line no-param-reassign
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }

  format(name, value) {
    if (name !== 'file-key') {
      super.format(name, value);
      return;
    }

    if (value) {
      this.domNode.setAttribute(name, value);
    }
    else {
      this.domNode.removeAttribute(name);
    }

    this.scroll.domNode.dispatchEvent(new CustomEvent('s3-image-updated', {
      bubbles: true,
      detail: this,
    }));
  }
}

Quill.register(S3Image);

const ContentEditor = forwardRef(({ contentFileUrls, readOnly, placeholder, tooltips }, ref) => {
  const editorRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getContents: () => editorRef.current.getEditor().getContents(),
    setContents: delta => editorRef.current.getEditor().setContents(delta),
  }));

  const handleTemporaryImage = (file, callback) => getBase64(file, callback);

  const toolbarImageHandler = async () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const editor = editorRef.current.getEditor();
      const range = editor.getSelection(true);

      handleTemporaryImage(input.files[0], base64 => editor.insertEmbed(range.index, 's3Image', base64));
      input.value = '';
    };
  };

  const handleUndo = () => editorRef.current.getEditor().history.undo();
  const handleRedo = () => editorRef.current.getEditor().history.redo();

  toolbar.handlers = { image: toolbarImageHandler, undo: handleUndo, redo: handleRedo };

  useEffect(() => {
    if (!editorRef.current) {
      return () => {
      };
    }
    if (!editorRef.current.editor) {
      return () => {
      };
    }

    let isMoving = false;
    const editorDragStartListener = () => {
      isMoving = true;
    };
    const dragEndListener = () => {
      isMoving = false;
    };

    const dropListener = event => {
      // images being reordered are handled by quill
      if (isMoving) {
        isMoving = false;
        return;
      }
      if (!event.dataTransfer.files.length) return;

      const editor = editorRef.current.getEditor();
      const range = editor.getSelection(true);

      mapImages(event.dataTransfer.files, handleTemporaryImage, imageUrl => editor.insertEmbed(range.index, 's3Image', imageUrl));
      event.preventDefault();
    };

    const pasteListener = event => {
      if (!event.clipboardData.files.length) return;

      const editor = editorRef.current.getEditor();
      const range = editor.getSelection(true);

      mapImages(event.clipboardData.files, handleTemporaryImage, imageUrl => editor.insertEmbed(range.index, 's3Image', imageUrl));
      event.preventDefault();
    };

    const imageUpdatedListener = event => {
      const fileKey = event.detail.domNode.getAttribute('file-key');
      if (fileKey) event.detail.domNode.setAttribute('src', contentFileUrls[fileKey]);
    };

    const editor = editorRef.current.getEditor();
    // for testing, react-quill does not propagate custom attributes to the DOM
    editor.root.setAttribute('data-testid', 'content-editor');

    editor.root.addEventListener('dragstart', editorDragStartListener, { passive: true });
    editor.root.addEventListener('dragend', dragEndListener, { passive: true });
    editor.root.addEventListener('drop', dropListener, { passive: false });
    editor.root.addEventListener('paste', pasteListener, { passive: false });
    editor.root.addEventListener('s3-image-updated', imageUpdatedListener, { passive: true });
    return () => {
      editor.root.removeAttribute('data-testid');

      editor.root.removeEventListener('dragstart', dragEndListener);
      editor.root.removeEventListener('dragend', editorDragStartListener);
      editor.root.removeEventListener('drop', dropListener);
      editor.root.removeEventListener('paste', pasteListener);
      editor.root.removeEventListener('s3-image-updated', imageUpdatedListener);
    };
  }, [contentFileUrls, editorRef.current?.editor]);

  useEffect(() => {
    if (!editorRef.current) {
      return () => {
      };
    }

    const editor = editorRef.current.getEditingArea().parentNode;
    editor.setAttribute('disabled', readOnly);
    return () => {
      editor.removeAttribute('disabled');
    };
  }, [readOnly]);

  const modules = { toolbar: readOnly ? false : toolbar };
  const styles = useStyles();
  return (
    <div className="text-editor">
      {!readOnly && <Toolbar tooltips={tooltips} />}
      <ReactQuill
        bounds="main"
        className={styles.quill}
        modules={modules}
        readOnly={readOnly}
        ref={editorRef}
        theme="snow"
        placeholder={readOnly ? '' : placeholder}
      />
    </div>
  );
});

ContentEditor.propTypes = { readOnly: PropTypes.bool };

ContentEditor.defaultProps = { readOnly: false };

export default ContentEditor;
