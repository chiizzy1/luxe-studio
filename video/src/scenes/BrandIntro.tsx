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

export const BrandIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* Gold accent line scales in */
  const lineScale = interpolate(frame, [0, 0.6 * fps], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  /* Logo fades + slides up */
  const logoOpacity = interpolate(frame, [0.3 * fps, 1 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const logoY = interpolate(frame, [0.3 * fps, 1 * fps], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  /* Tagline */
  const tagOpacity = interpolate(frame, [1.2 * fps, 1.8 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const tagY = interpolate(frame, [1.2 * fps, 1.8 * fps], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  /* Subtitle */
  const subOpacity = interpolate(frame, [1.8 * fps, 2.4 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  /* Exit fade starts at 3.2s */
  const exitOpacity = interpolate(frame, [3.2 * fps, 3.8 * fps], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
        opacity: exitOpacity,
      }}
    >
      {/* Gold accent line */}
      <div
        style={{
          width: 80,
          height: 2,
          backgroundColor: COLORS.gold,
          marginBottom: 40,
          transform: `scaleX(${lineScale})`,
        }}
      />

      {/* Logo */}
      <div
        style={{
          fontFamily: inter,
          fontSize: 18,
          fontWeight: 300,
          letterSpacing: 16,
          color: COLORS.whiteSubtle,
          opacity: logoOpacity,
          transform: `translateY(${logoY}px)`,
          marginBottom: 24,
        }}
      >
        LUXE STUDIO
      </div>

      {/* Tagline */}
      <div
        style={{
          fontFamily: playfair,
          fontSize: 72,
          fontWeight: 700,
          color: COLORS.white,
          opacity: tagOpacity,
          transform: `translateY(${tagY}px)`,
          textAlign: "center",
          lineHeight: 1.1,
        }}
      >
        WHERE <span style={{ color: COLORS.gold, fontStyle: "italic" }}>ELEGANCE</span>
        <br />
        MEETS EXPERTISE
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontFamily: inter,
          fontSize: 16,
          fontWeight: 300,
          letterSpacing: 6,
          color: COLORS.whiteSubtle,
          opacity: subOpacity,
          marginTop: 32,
        }}
      >
        PREMIUM GROOMING & STYLING
      </div>
    </div>
  );
};
