import CommonContainer from '../box/CommonContainer';
import ThemeButton from '../buttons/ThemeButton';

export default function AppHeader() {
  return (
    <div className="border-b-border bg-secondary fixed z-1205 h-[55px] w-full shadow-xl">
      <CommonContainer className="flex h-full items-center justify-between">
        <ThemeButton />
      </CommonContainer>
    </div>
  );
}
