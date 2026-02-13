import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { BrandIntro } from "./scenes/BrandIntro";
import { HeroShowcase } from "./scenes/HeroShowcase";
import { ServicesReveal } from "./scenes/ServicesReveal";
import { GallerySpotlight } from "./scenes/GallerySpotlight";
import { BookingShowcase } from "./scenes/BookingShowcase";
import { HookTransition } from "./scenes/HookTransition";
import { ChatbotDemo } from "./scenes/ChatbotDemo";
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

        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })} />

        {/* Scene 2: Hero Showcase */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.heroShowcase * FPS}>
          <HeroShowcase />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 3: Services Reveal */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.servicesReveal * FPS}>
          <ServicesReveal />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 4: Gallery Spotlight */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.gallerySpotlight * FPS}>
          <GallerySpotlight />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 5: Booking Showcase */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.bookingShowcase * FPS}>
          <BookingShowcase />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })} />

        {/* Scene 6: Hook Transition — "Beautiful. Intelligent. Always On." */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.hookTransition * FPS}>
          <HookTransition />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })} />

        {/* Scene 7: Chatbot Demo */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.chatbotDemo * FPS}>
          <ChatbotDemo />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })} />

        {/* Scene 8: CTA Outro */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.ctaOutro * FPS}>
          <CtaOutro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
