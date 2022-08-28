import FullScreen from '@/layouts/FullSreen';
import Editor from '@/components/Editor';

export default function MdHubView() {
  return (
    <FullScreen className="mdhub-view">
      <Editor lang="shell" defaultValue={'test'} />
    </FullScreen>
  );
}
