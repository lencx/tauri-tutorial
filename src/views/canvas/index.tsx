import { useState } from 'react';
import clsx from 'clsx';
import { Icon } from '@iconify/react/offline';
import folderIcon from '@iconify-icons/mdi/folder';
import folderOpenIcon from '@iconify-icons/mdi/folder-open';
import fileImageIcon from '@iconify-icons/mdi/file-image-plus';

import Layout from '@/layouts/index';
import InputText from '@/components/InputText';
import OmbCard, { OmbItem } from '@/components/OmbCard';

import AddDirButton from './components/AddDirButton';
import DeleteButton from './components/DeleteButton';
import { useCanvas, getCanvas } from './fs';

import './index.scss';
import { useEffect } from 'react';

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

  const [imgMap, setImgMap] = useState<any>({});

  const handleRename = (oldName: string, newName: string) => {
    renameDir(oldName, newName);
  };

  const handleAddPaper = () => {
    addFile(new Date().getTime() + '');
  };

  const papers = tocPane?.children || [];

  useEffect(() => {
    Promise.all(papers.map(async (i) => await getCanvas(i.path))).then(
      (vals) => {
        const _imgMap = vals.reduce(
          (a, b) => ({ ...a, [b.path]: b.content }),
          {}
        );
        setImgMap(_imgMap);
      }
    );
  }, [tocPane?.name]);

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
                  <span className="omb-ico dir mr1">
                    <Icon
                      icon={active ? folderOpenIcon : folderIcon}
                      color="var(--brown)"
                    />
                  </span>
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
          <OmbItem className="paper add hv-center" onClick={handleAddPaper}>
            <Icon icon={fileImageIcon} fontSize={50} />
          </OmbItem>
          {papers.map((paper) => {
            const img = imgMap[paper.path];

            return (
              <OmbItem
                key={paper.path}
                className="paper item"
                to={`/tools/canvas/paper/${tocPane?.name}/${paper.name}`}
              >
                <img className="preview" src={img} />
                <div className="info">{paper.name}</div>
                <DeleteButton onClick={() => removeFile(paper.name)} />
              </OmbItem>
            );
          })}
        </OmbCard>
      )}
    </Layout>
  );
}
