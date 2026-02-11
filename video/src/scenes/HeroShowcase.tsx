import { useCurrentFrame, useVideoConfig, interpolate, Easing, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { COLORS } from "../config";

const { fontFamily: inter } = loadFont("normal", {
  weights: ["300"],
  subsets: ["latin"],
});

export const HeroShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* Slow zoom on the screenshot — Ken Burns effect */
  const scale = interpolate(frame, [0, 5 * fps], [1, 1.08], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  /* Slight vertical pan — moves up slowly */
  const panY = interpolate(frame, [0, 5 * fps], [0, -30], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  /* Fade in from transition */
  const opacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  /* Corner badge slides in from right */
  const badgeX = interpolate(frame, [0.5 * fps, 1.2 * fps], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });
  const badgeOpacity = interpolate(frame, [0.5 * fps, 1.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.dark,
        overflow: "hidden",
        opacity,
      }}
    >
      {/* Website screenshot with Ken Burns */}
      <Img
        src={staticFile("screenshots/hero.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translateY(${panY}px)`,
        }}
      />

      {/* Vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 40%, ${COLORS.dark}ee 100%)`,
        }}
      />

      {/* Bottom badge */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 60,
          backgroundColor: "rgba(10, 10, 10, 0.85)",
          backdropFilter: "blur(8px)",
          padding: "16px 28px",
          borderLeft: `3px solid ${COLORS.gold}`,
          opacity: badgeOpacity,
          transform: `translateX(${badgeX}px)`,
        }}
      >
        <div
          style={{
            fontFamily: inter,
            fontSize: 13,
            letterSpacing: 4,
            color: COLORS.gold,
            fontWeight: 300,
          }}
        >
          WEBSITE DESIGN
        </div>
      </div>
    </div>
  );
};
