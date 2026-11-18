
import { useEffect, useRef, useState } from "react";

import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

// Official MediaPipe model
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

const WASM_URL =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm";

// Convert blendshape scores into approximate expressions
function detectExpression(categories) {
  const scores = Object.fromEntries(
    categories.map(({ categoryName, score }) => [
      categoryName,
      score,
    ])
  );

  const average = (...names) =>
    names.reduce((sum, name) => sum + (scores[name] ?? 0), 0) /
    names.length;

  const smile = average("mouthSmileLeft", "mouthSmileRight");

  const frown = average("mouthFrownLeft", "mouthFrownRight");

  const browDown = average("browDownLeft", "browDownRight");

  const eyeWide = average("eyeWideLeft", "eyeWideRight");

  const jawOpen = scores.jawOpen ?? 0;
  const browInnerUp = scores.browInnerUp ?? 0;

  if (jawOpen > 0.15 && eyeWide > 0.05) {
    return "Surprised";
  }

  if (smile > 0.45) {
    return "Happy / Smiling";
  }

  if (browDown > 0.1 && frown > 0.05) {
    return "Possibly Angry";
  }

  if (frown > 0.05 && browInnerUp > 0.05) {
    return "Possibly Sad";
  }

  return "Neutral / Unclear";
}

export default function FaceExpression() {
  const videoRef = useRef(null);

  const [isEnabled, setIsEnabled] = useState(false);
  const [expression, setExpression] = useState("Waiting...");
  const [status, setStatus] = useState("Camera is off");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEnabled) return;

    let cancelled = false;
    let animationId;
    let landmarker;
    let stream;

    async function startDetection() {
      try {
        setStatus("Loading MediaPipe...");

        // 1. Load MediaPipe WebAssembly files
        const vision = await FilesetResolver.forVisionTasks(
          WASM_URL
        );

        // 2. Initialize Face Landmarker
        landmarker = await FaceLandmarker.createFromOptions(
          vision,
          {
            baseOptions: {
              modelAssetPath: MODEL_URL,
            },

            runningMode: "VIDEO",
            numFaces: 1,

            outputFaceBlendshapes: true,

            minFaceDetectionConfidence: 0.5,
            minFacePresenceConfidence: 0.5,
            minTrackingConfidence: 0.5,
          }
        );

        if (cancelled) {
          landmarker.close();
          return;
        }

        // 3. Access webcam
        stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: "user",
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
        });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          landmarker.close();
          return;
        }

        const video = videoRef.current;

        video.srcObject = stream;
        await video.play();

        setStatus("Camera is running");

        let lastVideoTime = -1;
        let lastUiUpdate = 0;

        // 4. Continuously process video frames
        function detectFrame() {
          if (cancelled) return;

          if (
            video.readyState >= 2 &&
            video.currentTime !== lastVideoTime
          ) {
            const result = landmarker.detectForVideo(
              video,
              performance.now()
            );

            lastVideoTime = video.currentTime;

            let label = "No face detected";

            if (result.faceLandmarks?.length > 0) {
              const categories =
                result.faceBlendshapes?.[0]?.categories ?? [];

              label = detectExpression(categories);
            }

            // Avoid updating React state on every frame
            const now = performance.now();

            if (now - lastUiUpdate > 150) {
              setExpression(label);
              lastUiUpdate = now;
            }
          }

          animationId = requestAnimationFrame(detectFrame);
        }

        detectFrame();

      } catch (err) {
        if (!cancelled) {
          console.error("Face detection error:", err);

          setError(
            err.name === "NotAllowedError"
              ? "Camera permission was denied."
              : err.message || "Unable to start face detection."
          );

          setStatus("Camera unavailable");
          setIsEnabled(false);
        }
      }
    }

    startDetection();

    // 5. Clean up resources
    return () => {
      cancelled = true;

      cancelAnimationFrame(animationId);

      stream?.getTracks().forEach((track) => track.stop());

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      landmarker?.close();
    };
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
  };

  return (
    <div className="mx-auto max-w-md space-y-4 rounded-2xl border p-5">

      <h2 className="text-xl font-bold">
        Face Expression Detection
      </h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="aspect-video w-full rounded-xl bg-black object-cover [transform:scaleX(-1)]"
      />

      <div className="space-y-2">
        <p className="text-sm text-gray-500">{status}</p>

        <p className="text-lg font-semibold">
          Expression: {expression}
        </p>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>

      {!isEnabled ? (
        <div>
        <button
          onClick={startCamera}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white"
        >
          Start Camera
        </button> 
         
        </div>       
      ) : (
        <div>
        <button
          onClick={stopCamera}
          className="w-full rounded-lg bg-red-600 px-4 py-3 text-white"
        >
          Stop Camera
        </button>

        
        </div>
      )}
    </div>
  );
}
