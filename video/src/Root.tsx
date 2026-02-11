import { Composition } from "remotion";
import { LuxePromo } from "./LuxePromo";

const FPS = 30;
const DURATION_SECONDS = 21;

export const RemotionRoot = () => {
  return (
    <Composition
      id="LuxePromo"
      component={LuxePromo}
      durationInFrames={DURATION_SECONDS * FPS}
      fps={FPS}
      width={1920}
      height={1080}
    />
  );
};
