import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react/offline';
import folderIcon from '@iconify-icons/mdi/folder-outline';
import folderOpenIcon from '@iconify-icons/mdi/folder-open-outline';

import Layout from '@layouts/index';
import InputText from '@comps/InputText';
import OmbCard, { OmbItem } from '@comps/OmbCard';

import AddDirButton from './components/AddDirButton';
import { useCanvasDirs } from './fs';
import type { DirsItem } from './fs';

import './index.scss';

export default function CanvasView() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [papers, setPapers] = useState<DirsItem | null>(null);
  const { dirs, renameDir, addDir, removeDir } = useCanvasDirs();

  const handlePapers = (data: DirsItem, index: number) => {
    setPapers(data);
    setActiveIndex(index);
  };

  const handleRename = (oldName: string, newName: string, index: number) => {
    renameDir(oldName, newName);
    dirs[index].name = newName;
    if (papers) {
      const _papers = { ...papers, name: newName };
      setPapers(_papers);
    }
  };

  const handleRemove = (name: string) => {
    removeDir(name);
  };

  useEffect(() => {
    if (!dirs?.[0]) {
      setPapers(null);
    }
    setPapers(dirs?.[0]);
  }, [dirs?.[0]]);

  return (
    <Layout
      title="Canvas"
      sider={
        <div className="group">
          <AddDirButton onAdd={addDir} />
          {dirs.map((i, idx) => {
            const active = activeIndex === idx;
            return (
              <div
                key={`${i.uid}_${idx}`}
                onClick={() => handlePapers(i, idx)}
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
                <button onClick={() => handleRemove(i.name)}>-</button>
              </div>
            );
          })}
        </div>
      }
    >
      <OmbCard title={papers?.name || ''}>
        {papers?.children?.map((paper) => {
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
    </Layout>
  );
}
