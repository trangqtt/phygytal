import ManageInstruction from './ManageInstruction';

export default function TutorialThemeFormFields({}) {
  return (
    <div className="w-full flex flex-col gap-[20px] py-4">
      <ManageInstruction lang="vi" />
      <ManageInstruction lang="en" />
    </div>
  );
}
