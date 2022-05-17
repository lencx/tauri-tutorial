import { useState, useEffect } from 'react';

export default function useLocalColor(maxLength: number) {
  const [localColors, setColors] = useState<string[]>([]);

  const getLocalColors = () => {
    let data = localStorage.getItem('ombColor') || '[]';
    return JSON.parse(data);
  };

  const setLocalColors = (color: string) => {
    const data = getLocalColors()
      .filter((i: string) => i !== color);
    data.unshift(color);
    const _data = [...new Set(data.slice(0, maxLength))] as string[];
    localStorage.setItem('ombColor', JSON.stringify(_data));
    setColors(_data);
  };

  useEffect(() => {
    setColors(getLocalColors());
  }, [])

  return { localColors, getLocalColors, setLocalColors };
};
