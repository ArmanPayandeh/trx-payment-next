import { JamsrworldLogo } from "./jamsrworld-logo";

export const PoweredBy = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-1">
        <p>Powered by</p> <JamsrworldLogo />
      </div>
      {/* <div className="flex items-center gap-1">
        Partner with <AppLogo />
      </div> */}
    </div>
  );
};
