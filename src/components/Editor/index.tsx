import React, { useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';

import './index.scss';

interface EditorProps {
  lang: string;
  defaultValue?: string;
  onChange?: (content?: string) => void;
}

const Editor: React.FC<EditorProps> = ({
  lang = 'text',
  defaultValue = '',
  onChange,
}) => {
  const handleMonaco = (val?: string) => {
    onChange && onChange(val);
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
        <Allotment.Pane snap>
          <div className="preview">preview</div>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};

export default Editor;
