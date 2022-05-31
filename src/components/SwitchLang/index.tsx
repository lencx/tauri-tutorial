import { Icon } from '@iconify/react/dist/offline';
import langIcon from '@iconify-icons/fa/language';

import { useGetLang, useSetLang } from '@/hooks/useLang';

export default function DashboardView() {
  const lang = useGetLang();
  const setLang = useSetLang();

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setLang(e.target.value);
  };

  return (
    <div className="flex fs100">
      <Icon className="mr1" icon={langIcon} fontSize={20} />
      <select value={lang} onChange={handleChange}>
        <option value="en">English</option>
        <option value="zh_CN">中文-简体</option>
        <option value="zh_HK">中文-繁體</option>
      </select>
    </div>
  );
}
