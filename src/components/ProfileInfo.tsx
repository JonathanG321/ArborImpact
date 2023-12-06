import LineBreak from './LineBreak';
import ProfileBalances from './ProfileBalances';
import ProfileHeader from './ProfileHeader';

export default function ProfileInfo() {
  return (
    <>
      <ProfileHeader />
      <LineBreak classNames="flex-1 w-auto" />
      <ProfileBalances />
      <LineBreak classNames="flex-1 w-auto" />
    </>
  );
}
