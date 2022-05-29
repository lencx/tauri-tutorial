import { useState, useCallback, useEffect } from 'react';
import includes from 'lodash/includes';
import {
  BaseDirectory,
  readDir, createDir, renameFile,
  removeDir as TauriRemoveDir,
  removeFile as TauriRemoveFile,
  writeFile,
} from "@tauri-apps/api/fs";
import { homeDir } from "@tauri-apps/api/path";
import { message } from '@tauri-apps/api/dialog';

import useI18n from '@hooks/useI18n';
import { ignoreFile } from '@utils/tools';
import { metadata } from '@plugins/fsExtra';
import type { Metadata } from '@plugins/fsExtra';

export type FileEntryInfo = {
  path: string;
  name: string;
} & Metadata;

export type TocPaneInfo = {
  path: string;
  name: string;
  children: FileEntryInfo[];
};

export const useCanvas = () => {
  const t = useI18n(['rules']);
  const [tocTree, setTocTree] = useState<FileEntryInfo[]>([]);
  const [tocPane, setTocPane] = useState<TocPaneInfo>();
  const [tocIndex, setTocIndex] = useState(0);

  const init = useCallback(async () => {
    const dirPath = await root();
    const group: FileEntryInfo[] = [];
    await readDir(dirPath)
      .then((_dirs) => {
        _dirs = _dirs.filter(i => i.name && !ignoreFile(i.name));
        _dirs.forEach(async (i, idx) => {
          if (!i.name) return;

          const info = await metadata(i.path);
          const data: FileEntryInfo = { name: i.name, path: i.path, ...info };
          group.push(data);

          if (idx === _dirs.length - 1) {
            group.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);
            setTocTree(group);
            setToc(0, group);
          }
        });
      })
      .catch((err) => message(err));
  }, [])

  useEffect(() => {
    init();
  }, []);

  const root = async () => {
    const _root = await homeDir();
    return `${_root}.omb/canvas`
  };

  const setToc = async (index: number, newTocTree?: FileEntryInfo[]) => {
    const _tocTree = newTocTree || tocTree;
    if (_tocTree.length === 0) {
      setTocIndex(-1);
      return;
    }
    setTocIndex(index);
    const currToc = _tocTree[index];
    const paneData = await readDir(currToc.path)
      .then((files) => (
        files.filter((file) => file.name && !ignoreFile(file.name))
      ));
    const files: TocPaneInfo = { name: currToc.name, path: currToc.path, children: [] };
    if (paneData.length === 0) {
      setTocPane(files);
    } else {
      paneData.forEach(async (file, idx) => {
        const info = await metadata(file.path);
        if (!file.name) return;
        files.children.push({ name: file.name, path: file.path, ...info });
        if (idx === paneData.length - 1) {
          files.children.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1);
          setTocPane(files);
        }
      })
    }
  };

  const renameDir = async (oldPath: string, newPath: string) => {
    const dirPath = await root();
    await renameFile(`${dirPath}/${oldPath}`, `${dirPath}/${newPath}`);
    const index = tocTree.findIndex(dir => dir.name === oldPath);
    const _tocTree = [...tocTree];
    _tocTree[index].name = newPath;
    _tocTree[index].path = _tocTree[index].path.replace(new RegExp(`${oldPath}$`), newPath);
    setToc(index, _tocTree);
  }

  const addDir = async (name: string) => {
    if (includes(tocTree.map(i => i.name), name)) {
      message(t('rules:check-file-exist', { name }));
      return;
    };
    await createDir(`.omb/canvas/${name}`, {
      dir: BaseDirectory.Home,
      // recursive: true,
    });
    const dirPath = await root();
    const filePath = `${dirPath}/${name}`;
    const info = await metadata(filePath);
    const dirInfo = { name, path: filePath, ...info };
    const _tocTree = [dirInfo, ...tocTree];
    setTocTree(_tocTree);
    setToc(0, _tocTree);
  };

  const removeDir = async (name: string) => {
    let index = -1;
    const _dirs = tocTree.filter((i, idx) => {
      const hasName = i.name !== name;
      if (!hasName) index = idx;
      return hasName;
    });
    if (index === -1) return;
    await TauriRemoveDir(`.omb/canvas/${name}`, {
      dir: BaseDirectory.Home,
      recursive: true,
    });
    setTocTree(_dirs);
    let activeIndex = tocIndex;
    const lastIndex = _dirs.length - 1;
    if (activeIndex > lastIndex) activeIndex = lastIndex;
    setToc(activeIndex, _dirs);
  }

  const addFile = async (file: string, contents: string = '') => {
    const filePath = `${tocPane?.path}/${file}`;
    await writeFile({
      path: filePath,
      contents,
    }, { dir: BaseDirectory.Home });

    const info = await metadata(filePath);
    const fileInfo = { name: file, path: filePath, ...info };
    if (tocPane) {
      const { children, ...rest } = tocPane;
      const paneData = { ...rest, children: [fileInfo, ...children] };
      setTocPane(paneData);
    }
  }

  const removeFile = async (file: string) => {
    const filePath = `${tocPane?.path}/${file}`;
    await TauriRemoveFile(filePath, {
      dir: BaseDirectory.Home,
    });
    if (tocPane) {
      const _tocPane = { ...tocPane };
      _tocPane.children = tocPane?.children.filter(i => i.name !== file);
      setTocPane(_tocPane);
    }
    // setToc(tocIndex,);
  };

  return { tocTree, tocIndex, tocPane, setToc, renameDir, addDir, removeDir, addFile, removeFile };
}
