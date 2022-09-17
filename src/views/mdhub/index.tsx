import { useState } from 'react';
import { Icon } from '@iconify/react/offline';
import pdfIcon from '@iconify-icons/mdi/file-pdf';
import openPreviewIcon from '@iconify-icons/codicon/open-preview';
import printPreviewIcon from '@iconify-icons/mdi/print-preview';
import 'highlight.js/styles/agate.css';
import 'github-markdown-css';

import FullScreen from '@/layouts/FullSreen';
import Editor from '@/components/Editor';
import { mdParser } from '@/utils/mdParser';

import './index.scss';

export default function MdHubView() {
  const [isPreview, setPreview] = useState(false);
  const [content, setContent] = useState('');
  const handlePreivew = () => {
    setPreview(!isPreview);
  };

  const handleImportPDF = async () => {
    alert('TODO: Import PDF');
  };

  const handleEditor = (val?: string) => {
    setContent(mdParser.render(val || ''));
  };

  return (
    <FullScreen
      taskbar={
        <>
          <div>
            <Icon
              icon={isPreview ? openPreviewIcon : printPreviewIcon}
              onClick={handlePreivew}
            />
            <Icon icon={pdfIcon} onClick={handleImportPDF} />
          </div>
        </>
      }
      className="mdhub-view"
    >
      <Editor
        lang="markdown"
        defaultValue={`# Hello`}
        onChange={handleEditor}
        preview={
          isPreview
            ? () => (
                <div
                  className="markdown-body"
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                />
              )
            : undefined
        }
      />
    </FullScreen>
  );
}
