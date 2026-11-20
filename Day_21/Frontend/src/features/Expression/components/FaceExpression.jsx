import { useEffect, useRef, useState } from "react";
import { startDetection } from "../utils/utils";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [expression, setExpression] = useState("Waiting...");
  const [status, setStatus] = useState("Camera is off");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEnabled) return;

    const cancelled = { current: false };
    return startDetection({
      cancelled,
      videoRef,
      setStatus,
      setExpression,
      setError,
      setIsEnabled,
    });
  }, [isEnabled]);

  const startCamera = () => {
    setError("");
    setExpression("Detecting...");
    setStatus("Starting camera...");
    setIsEnabled(true);
  };

  const stopCamera = () => {
    setIsEnabled(false);
    setStatus("Camera stopped");
    setExpression("—");
  };

  return (
    <div className="mx-auto max-w-md space-y-4 rounded-2xl border p-5">
      <h2 className="text-xl font-bold">Face Expression Detection</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="aspect-video w-full rounded-xl bg-black object-cover [transform:scaleX(-1)]"
      />

      <div className="space-y-2">
        <p className="text-sm text-gray-500">{status}</p>
        <p className="text-lg font-semibold">Expression: {expression}</p>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      {!isEnabled ? (
        <button
          onClick={startCamera}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white"
        >
          Start Camera
        </button>
      ) : (
        <button
          onClick={stopCamera}
          className="w-full rounded-lg bg-red-600 px-4 py-3 text-white"
        >
          Stop Camera
        </button>
      )}
    </div>
  );
}
