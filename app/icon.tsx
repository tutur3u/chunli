import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "linear-gradient(160deg, #f8fdff 0%, #d6efff 50%, #8bd9ff 100%)",
          borderRadius: 18,
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
          border: "4px solid rgba(255,255,255,0.75)",
          boxShadow: "inset 0 0 0 4px rgba(255,255,255,0.45)",
          color: "#185d85",
          fontSize: 34,
          fontWeight: 700,
        }}
      >
        J
      </div>
    ),
    size,
  );
}
