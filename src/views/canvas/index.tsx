import clsx from 'clsx';
import { Icon } from '@iconify/react/offline';
import folderIcon from '@iconify-icons/mdi/folder';
import folderOpenIcon from '@iconify-icons/mdi/folder-open';

import Layout from '@layouts/index';
import InputText from '@comps/InputText';
import OmbCard, { OmbItem } from '@comps/OmbCard';

import AddDirButton from './components/AddDirButton';
import DeleteButton from './components/DeleteButton';
import { useCanvas } from './fs';

import './index.scss';

export default function CanvasView() {
  const {
    tocTree,
    tocIndex,
    setToc,
    tocPane,
    renameDir,
    addDir,
    removeDir,
    addFile,
    removeFile,
  } = useCanvas();

  const handleRename = (oldName: string, newName: string) => {
    renameDir(oldName, newName);
  };

  const handleAddPaper = () => {
    addFile(new Date().getTime() + '');
  };

  const papers = tocPane?.children || [];

  return (
    <Layout
      title="Canvas"
      sider={
        <div className="group">
          <AddDirButton onAdd={addDir} />
          {tocTree.map((i, idx) => {
            const active = tocIndex === idx;
            return (
              <div
                key={i.name}
                onClick={() => setToc(idx)}
                className={clsx('group-item', { active })}
              >
                <div className="group-item-name">
                  <Icon
                    className="ico"
                    icon={active ? folderOpenIcon : folderIcon}
                    color="var(--brown)"
                  />
                  <InputText
                    defaultValue={i.name}
                    onChange={(v) => handleRename(i.name, v)}
                  />
                </div>
                <DeleteButton onClick={() => removeDir(i.name)} />
              </div>
            );
          })}
        </div>
      }
    >
      {tocTree.length > 0 && (
        <OmbCard title={tocPane?.name || ''}>
          <OmbItem className="paper" onClick={handleAddPaper}>
            add
          </OmbItem>
          {papers.map((paper) => {
            return (
              <OmbItem
                key={paper.path}
                className="paper"
                to={`/tools/canvas/paper/${paper.name}`}
              >
                {paper.name}
                <DeleteButton onClick={() => removeFile(paper.name)} />
              </OmbItem>
            );
          })}
        </OmbCard>
      )}
    </Layout>
  );
}
