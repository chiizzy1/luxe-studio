import { useCurrentFrame, useVideoConfig, interpolate, Easing, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { COLORS } from "../config";

const { fontFamily: inter } = loadFont("normal", {
  weights: ["300"],
  subsets: ["latin"],
});

export const ServicesReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* Slow zoom */
  const scale = interpolate(frame, [0, 4.5 * fps], [1, 1.06], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  /* Label stagger */
  const labelOpacity = interpolate(frame, [0.6 * fps, 1.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const labelY = interpolate(frame, [0.6 * fps, 1.2 * fps], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.dark,
        overflow: "hidden",
      }}
    >
      {/* Services screenshot with subtle zoom */}
      <Img
        src={staticFile("screenshots/services.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, ${COLORS.dark}cc 0%, transparent 30%, transparent 70%, ${COLORS.dark}ee 100%)`,
        }}
      />

      {/* Label */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 60,
          opacity: labelOpacity,
          transform: `translateY(${labelY}px)`,
        }}
      >
        <div
          style={{
            fontFamily: inter,
            fontSize: 13,
            letterSpacing: 4,
            color: COLORS.gold,
            fontWeight: 300,
            marginBottom: 8,
          }}
        >
          OUR SERVICES
        </div>
        <div
          style={{
            width: 40,
            height: 2,
            backgroundColor: COLORS.gold,
          }}
        />
      </div>
    </div>
  );
};
