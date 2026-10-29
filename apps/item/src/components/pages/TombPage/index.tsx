import {
  TombInfo,
  TombArea,
  TombCareerLife,
  TombLibrary,
  TombTimeline,
} from "@/assets/images";

export default function TombPage() {
  return (
    <div className="relative flex max-w-[600px] m-auto flex-col items-center justify-center overflow-hidden">
      <img src={TombInfo} className="object-contain" />
      <img src={TombCareerLife} className="object-contain" />
      <img src={TombTimeline} className="object-contain" />
      <img src={TombArea} className="object-contain" />
      <img src={TombLibrary} className="object-contain" />
    </div>
  );
}
