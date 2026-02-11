import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { BrandIntro } from "./scenes/BrandIntro";
import { HeroShowcase } from "./scenes/HeroShowcase";
import { ServicesReveal } from "./scenes/ServicesReveal";
import { GallerySpotlight } from "./scenes/GallerySpotlight";
import { CtaOutro } from "./scenes/CtaOutro";
import { SCENE_DURATIONS, FPS, TRANSITION_FRAMES } from "./config";

export const LuxePromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      <TransitionSeries>
        {/* Scene 1: Brand Intro */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.brandIntro * FPS}>
          <BrandIntro />
        </TransitionSeries.Sequence>

        {/* Transition: Fade into hero */}
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })} />

        {/* Scene 2: Hero Showcase */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.heroShowcase * FPS}>
          <HeroShowcase />
        </TransitionSeries.Sequence>

        {/* Transition: Slide left into services */}
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 3: Services Reveal */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.servicesReveal * FPS}>
          <ServicesReveal />
        </TransitionSeries.Sequence>

        {/* Transition: Wipe into gallery */}
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 4: Gallery Spotlight */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.gallerySpotlight * FPS}>
          <GallerySpotlight />
        </TransitionSeries.Sequence>

        {/* Transition: Fade to CTA */}
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })} />

        {/* Scene 5: CTA Outro */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.ctaOutro * FPS}>
          <CtaOutro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
