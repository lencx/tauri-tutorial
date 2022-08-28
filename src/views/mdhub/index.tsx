import 'github-markdown-css';
import 'highlight.js/styles/agate.css';

import FullScreen from '@/layouts/FullSreen';
import Editor from '@/components/Editor';
import { mdParser } from '@/utils/mdParser';

import './index.scss';

export default function MdHubView() {
  return (
    <FullScreen className="mdhub-view">
      <Editor
        lang="markdown"
        defaultValue={`# Hello`}
        preview={(content) => (
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: mdParser.render(content || '') }}
          />
        )}
      />
    </FullScreen>
  );
}
