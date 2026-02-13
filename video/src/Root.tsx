import { Composition } from "remotion";
import { LuxePromo } from "./LuxePromo";
import { SmartWebsiteDemo } from "./SmartWebsiteDemo";
import { LuxeShowcase } from "./LuxeShowcase";

const FPS = 30;

export const RemotionRoot = () => {
  return (
    <>
      <Composition id="LuxeShowcase" component={LuxeShowcase} durationInFrames={48 * FPS} fps={FPS} width={1920} height={1080} />
      <Composition id="LuxePromo" component={LuxePromo} durationInFrames={38 * FPS} fps={FPS} width={1920} height={1080} />
      <Composition
        id="SmartWebsiteDemo"
        component={SmartWebsiteDemo}
        durationInFrames={60 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
