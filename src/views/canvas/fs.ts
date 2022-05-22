import { useState, useCallback, useEffect } from 'react';
import includes from 'lodash/includes';
import { BaseDirectory, readDir, createDir, renameFile, removeDir as TauriRemoveDir } from "@tauri-apps/api/fs";
import { homeDir } from "@tauri-apps/api/path";
import type { FileEntry } from "@tauri-apps/api/fs";

import { metadata } from '@plugins/fsExtra';
import type { Metadata } from '@plugins/fsExtra';

export type DirsItem = {
  name: string;
  children: FileEntry[];
} & Metadata;

export const useCanvasDirs = () => {
  const [dirs, setDirs] = useState<DirsItem[]>([]);
  const root = async () => {
    const _root = await homeDir();
    return `${_root}.omb/canvas`
  };

  const init = useCallback(async () => {
    const dirPath = await root();
    const group: DirsItem[] = [];
    await readDir(dirPath)
      .then((_dirs) => {
        _dirs.forEach(async (i, idx) => {
          if (!i.name) return;
          const info = await metadata(i.path);
          const data: DirsItem = { name: i.name, ...info, children: [] };
          if (i?.children) {
            await readDir(i.path).then((j) => {
              data.children = j;
              group.push(data);
              if (idx === _dirs.length - 1) {
                group.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);
                setDirs(group);
              }
            })
          }
        })
      })
      .catch((err) => console.log(err));
  }, [])

  useEffect(() => {
    init();
  }, []);

  const renameDir = async (oldPath: string, newPath: string) => {
    const dirPath = await root();
    await renameFile(`${dirPath}/${oldPath}`, `${dirPath}/${newPath}`);
  }

  const addDir = async (name: string) => {
    if (includes(dirs.map(i => i.name), name)) {
      alert('exist');
      return;
    };
    await createDir(`.omb/canvas/${name}`, {
      dir: BaseDirectory.Home,
      recursive: true,
    });
    const dirPath = await root();
    const info = await metadata(`${dirPath}/${name}`);
    const dirInfo = { name, children: [], ...info };
    setDirs([dirInfo, ...dirs])
  };

  const removeDir = async (name: string) => {
    let index = -1;
    const _dirs = dirs.filter((i, idx) => {
      const hasName = i.name !== name;
      if (!hasName) index = idx;
      return hasName;
    });
    if (index === -1) return;
    await TauriRemoveDir(`.omb/canvas/${name}`, {
      dir: BaseDirectory.Home,
      recursive: true,
    });
    setDirs(_dirs);
  }

  return { dirs, renameDir, addDir, removeDir };
}
