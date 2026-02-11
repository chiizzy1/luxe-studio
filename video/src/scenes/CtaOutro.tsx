import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { loadFont } from "@remotion/google-fonts/Playfair";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { COLORS } from "../config";

const { fontFamily: playfair } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

const { fontFamily: inter } = loadInter("normal", {
  weights: ["300", "400"],
  subsets: ["latin"],
});

export const CtaOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* Gold line grows */
  const lineScale = interpolate(frame, [0.2 * fps, 0.8 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  /* CTA text */
  const ctaOpacity = interpolate(frame, [0.4 * fps, 1 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaY = interpolate(frame, [0.4 * fps, 1 * fps], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  /* Subtitle */
  const subOpacity = interpolate(frame, [1 * fps, 1.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* Logo at bottom */
  const logoOpacity = interpolate(frame, [1.4 * fps, 2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.dark,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Gold line */}
      <div
        style={{
          width: 60,
          height: 2,
          backgroundColor: COLORS.gold,
          transform: `scaleX(${lineScale})`,
          marginBottom: 40,
        }}
      />

      {/* Main CTA */}
      <div
        style={{
          fontFamily: playfair,
          fontSize: 64,
          fontWeight: 700,
          color: COLORS.white,
          textAlign: "center",
          lineHeight: 1.15,
          opacity: ctaOpacity,
          transform: `translateY(${ctaY}px)`,
        }}
      >
        Reserve Your
        <br />
        <span style={{ color: COLORS.gold, fontStyle: "italic" }}>Experience</span>
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: inter,
          fontSize: 16,
          fontWeight: 300,
          letterSpacing: 5,
          color: COLORS.whiteSubtle,
          marginTop: 28,
          opacity: subOpacity,
        }}
      >
        BOOK NOW AT LUXESTUDIO.COM
      </div>

      {/* Bottom logo */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          fontFamily: inter,
          fontSize: 14,
          fontWeight: 300,
          letterSpacing: 8,
          color: "rgba(255, 255, 255, 0.3)",
          opacity: logoOpacity,
        }}
      >
        LUXE STUDIO
      </div>
    </div>
  );
};
