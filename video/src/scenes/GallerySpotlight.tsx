import { useCurrentFrame, useVideoConfig, interpolate, Easing, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { COLORS } from "../config";

const { fontFamily: inter } = loadFont("normal", {
  weights: ["300"],
  subsets: ["latin"],
});

export const GallerySpotlight: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  /* Ken Burns pan — slow move right and slight zoom */
  const scale = interpolate(frame, [0, 4.5 * fps], [1.05, 1.12], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const panX = interpolate(frame, [0, 4.5 * fps], [0, -40], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  /* Label */
  const labelOpacity = interpolate(frame, [0.4 * fps, 1 * fps], [0, 1], {
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
      }}
    >
      {/* Gallery screenshot with Ken Burns */}
      <Img
        src={staticFile("screenshots/gallery.png")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translateX(${panX}px)`,
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, ${COLORS.dark}aa 0%, transparent 25%, transparent 75%, ${COLORS.dark}dd 100%)`,
        }}
      />

      {/* Bottom left label */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 60,
          opacity: labelOpacity,
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
          GALLERY
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
