import { useEffect, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';

import './index.scss';

interface EditorProps {
  lang: string;
  defaultValue?: string;
  onChange?: (content?: string) => void;
  preview?: (content?: string) => React.ReactNode;
}

const Editor: React.FC<EditorProps> = ({
  lang = 'text',
  defaultValue = '',
  onChange,
  preview,
}) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(defaultValue);
    onChange && onChange(defaultValue);
  }, [defaultValue]);

  const handleMonaco = (val?: string) => {
    onChange && onChange(val);
    setContent(val || '');
  };

  return (
    <div className="omb-editor-container">
      <Allotment>
        <Allotment.Pane minSize={200}>
          <MonacoEditor
            defaultLanguage={lang}
            defaultValue={defaultValue}
            onChange={handleMonaco}
          />
        </Allotment.Pane>
        {preview && (
          <Allotment.Pane snap>
            <div className="preview">{preview(content)}</div>
          </Allotment.Pane>
        )}
      </Allotment>
    </div>
  );
};

export default Editor;
