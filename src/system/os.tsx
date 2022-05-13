import { useState, useEffect } from 'react'
import { os } from '@tauri-apps/api'

function OsInfo() {
  const [arch, setArch] = useState('')
  const [platform, setPlatform] = useState('')
  const [tempdir, setTempdir] = useState('')
  const [type, setType] = useState('')
  const [version, setVersion] = useState('')

  useEffect(() => {
    os.arch().then(setArch)
    os.platform().then(setPlatform)
    os.tempdir().then(setTempdir)
    os.type().then(setType)
    os.version().then(setVersion)
  }, [])

  return (
    <div>
      <ul>
        <li><span>CPU 架构:</span> {arch}</li>
        <li><span>平台名称:</span> {platform}</li>
        <li><span>临时文件目录:</span> {tempdir}</li>
        <li><span>系统类型:</span> {type}</li>
        <li><span>系统版本:</span> {version}</li>
      </ul>
    </div>
  )
}

export default OsInfo;
