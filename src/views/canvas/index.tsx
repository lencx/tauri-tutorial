import clsx from 'clsx';
import { Icon } from '@iconify/react/offline';
import folderIcon from '@iconify-icons/mdi/folder-outline';
import folderOpenIcon from '@iconify-icons/mdi/folder-open-outline';

import Layout from '@layouts/index';
import InputText from '@comps/InputText';
import OmbCard, { OmbItem } from '@comps/OmbCard';

import AddDirButton from './components/AddDirButton';
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
  } = useCanvas();

  const handleRename = (oldName: string, newName: string, index: number) => {
    renameDir(oldName, newName);
  };

  const handleRemove = (e: React.FormEvent<EventTarget>, name: string) => {
    e.stopPropagation();
    removeDir(name);
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
                key={`${i.uid}_${idx}`}
                onClick={() => setToc(idx)}
                className={clsx('group-item', { active })}
              >
                <Icon
                  className="ico"
                  icon={active ? folderOpenIcon : folderIcon}
                />
                <InputText
                  defaultValue={i.name}
                  onChange={(v) => handleRename(i.name, v, idx)}
                />
                <button onClick={(e) => handleRemove(e, i.name)}>-</button>
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
                to="/tools/canvas/paper"
              >
                {paper.name}
              </OmbItem>
            );
          })}
        </OmbCard>
      )}
    </Layout>
  );
}
