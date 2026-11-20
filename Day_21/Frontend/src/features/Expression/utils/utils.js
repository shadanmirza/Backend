import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";
const WASM_URL =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";

function detectExpression(categories) {
  const scores = Object.fromEntries(
    categories.map(({ categoryName, score }) => [categoryName, score])
  );
  const average = (...names) =>
    names.reduce((sum, name) => sum + (scores[name] ?? 0), 0) / names.length;
  const smile = average("mouthSmileLeft", "mouthSmileRight");
  const frown = average("mouthFrownLeft", "mouthFrownRight");
  const browDown = average("browDownLeft", "browDownRight");
  const eyeWide = average("eyeWideLeft", "eyeWideRight");
  const jawOpen = scores.jawOpen ?? 0;
  const browInnerUp = scores.browInnerUp ?? 0;

  if (jawOpen > 0.025 && eyeWide > 0.01) return "Surprised";
  if (smile > 0.35) return "Happy / Smiling";
  if (browDown > 0.2 && frown > 0.075) return "Possibly Angry";
  if (frown > 0.15 && browInnerUp > 0.05) return "Possibly Sad";
  return "Neutral / Unclear";
}

export function startDetection({
  cancelled,
  videoRef,
  setStatus,
  setExpression,
  setError,
  setIsEnabled,
}) {
  let landmarker;
  let stream;
  let animationId;
  let lastVideoTime = -1;
  let lastUiUpdate = 0;

  const cleanup = () => {
    cancelled.current = true;
    if (animationId !== undefined) cancelAnimationFrame(animationId);
    stream?.getTracks().forEach((track) => track.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    landmarker?.close();
  };

  const detectFrame = () => {
    if (cancelled.current) return;
    const video = videoRef.current;
    if (video?.readyState >= 2 && video.currentTime !== lastVideoTime) {
      const result = landmarker.detectForVideo(video, performance.now());
      lastVideoTime = video.currentTime;
      const categories = result.faceBlendshapes?.[0]?.categories ?? [];
      const label = result.faceLandmarks?.length
        ? detectExpression(categories)
        : "No face detected";
      const now = performance.now();
      if (now - lastUiUpdate > 150) {
        setExpression(label);
        lastUiUpdate = now;
      }
    }
    animationId = requestAnimationFrame(detectFrame);
  };

  const initialize = async () => {
    try {
      setStatus("Loading MediaPipe...");
      const vision = await FilesetResolver.forVisionTasks(WASM_URL);
      if (cancelled.current) return;

      landmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: MODEL_URL },
        runningMode: "VIDEO",
        numFaces: 1,
        outputFaceBlendshapes: true,
        minFaceDetectionConfidence: 0.5,
        minFacePresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });
      if (cancelled.current) {
        cleanup();
        return;
      }

      stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      });
      if (cancelled.current) {
        cleanup();
        return;
      }

      const video = videoRef.current;
      if (!video) {
        cleanup();
        return;
      }
      video.srcObject = stream;
      await video.play();
      if (cancelled.current) {
        cleanup();
        return;
      }

      setStatus("Camera is running");
      detectFrame();
    } catch (err) {
      if (!cancelled.current) {
        console.error("Face detection error:", err);
        setError(
          err.name === "NotAllowedError"
            ? "Camera permission was denied."
            : err.message || "Unable to start face detection."
        );
        setStatus("Camera unavailable");
        setIsEnabled(false);
        cleanup();
      }
    }
  };

  void initialize();
  return cleanup;
}
