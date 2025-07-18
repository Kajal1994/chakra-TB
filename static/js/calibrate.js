const videoElement = document.getElementById('webcam');
const messageElement = document.getElementById('message');
const continueBtn = document.getElementById('continue-btn');

let handDetected = false;

// Set up MediaPipe Hands
const hands = new Hands({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});
hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.7
});

hands.onResults((results) => {
  if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
    if (!handDetected) {
      handDetected = true;
      messageElement.textContent = 'Hand detected! You are ready.';
      continueBtn.style.display = 'inline-block';
    }
  } else {
    if (handDetected) {
      handDetected = false;
      messageElement.textContent = 'Show your hand to the camera to calibrate.';
      continueBtn.style.display = 'none';
    }
  }
});

// Set up webcam
async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  videoElement.srcObject = stream;
  await videoElement.play();

  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await hands.send({ image: videoElement });
    },
    width: 400,
    height: 300
  });
  camera.start();
}

setupCamera();

continueBtn.addEventListener('click', () => {
  // Redirect or trigger next step
  window.location.href = '/'; // Change this to your session route when ready
}); 