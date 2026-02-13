// === GAME VARIABLES ===
let currentCam = 11;
let jairoLocation = 11; // Jairo starts at Cam 11
let camerasDisabled = false;
let audioCooldown = false;
let nightTimer = 0; // Counts up to 6 AM (e.g., 360 seconds)
let gameActive = false;

// === START GAME ===
function startGame() {
    document.getElementById('title-screen').style.display = 'none';
    document.getElementById('night-intro').style.display = 'block';
    
    // Play intro sound if you have one
    setTimeout(() => {
        document.getElementById('night-intro').style.display = 'none';
        document.getElementById('game-screen').style.display = 'block';
        gameActive = true;
        startAI(); // Start Jairo moving
    }, 3000); // 3 seconds delay
}

// === OFFICE MOVEMENT ===
// This makes the room slide left/right based on mouse position
document.addEventListener('mousemove', (e) => {
    if (!gameActive) return;
    const width = window.innerWidth;
    const x = e.clientX;
    const movePercent = (x / width) * 20; // Adjust '20' for more/less movement
    document.getElementById('office-bg').style.transform = `translateX(-${movePercent}%)`;
    
    // Show UI triggers
    if (x < width * 0.1) {
        document.getElementById('hover-left').style.opacity = 1;
        document.getElementById('hover-left').onclick = openControlPanel;
    } else if (x > width * 0.9) {
        document.getElementById('hover-right').style.opacity = 1;
        document.getElementById('hover-right').onclick = openMonitor;
    } else {
        document.getElementById('hover-left').style.opacity = 0;
        document.getElementById('hover-right').style.opacity = 0;
    }
});

// === CAMERA SYSTEM ===
function openMonitor() {
    document.getElementById('monitor').style.display = 'flex';
    document.getElementById('snd-blip').play();
    updateCamView();
}

function closeUI() {
    document.getElementById('monitor').style.display = 'none';
    document.getElementById('control-panel').style.display = 'none';
}

function switchCam(camNum) {
    if (camerasDisabled) return; // Cannot switch if broken

    currentCam = camNum;
    
    // 1. Play Blip Sound
    document.getElementById('snd-blip').currentTime = 0;
    document.getElementById('snd-blip').play();

    // 2. Flash Static Effect
    const staticOverlay = document.getElementById('cam-static');
    staticOverlay.style.opacity = 1;
    setTimeout(() => { staticOverlay.style.opacity = 0.1; }, 200);

    // 3. Update Visuals
    updateCamView();

    // 4. Update Green Glow on Buttons
    document.querySelectorAll('.cam-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('cam' + (camNum < 10 ? '0' + camNum : camNum)).classList.add('active');
}

function updateCamView() {
    const camImg = document.getElementById('cam-view');
    const camName = document.getElementById('cam-name');
    
    if (camerasDisabled) {
        camImg.src = "images/static.gif"; // Show static if broken
        camName.innerText = "ERR - NO SIGNAL";
        return;
    }

    // Logic: Is Jairo here?
    let imageSource = "";
    if (jairoLocation === currentCam) {
        imageSource = `images/cam${currentCam < 10 ? '0' + currentCam : currentCam}jairo.png`;
    } else {
        imageSource = `images/cam${currentCam < 10 ? '0' + currentCam : currentCam}background.png`;
    }
    
    camImg.src = imageSource;
    camName.innerText = "CAM " + currentCam;
}

// === AUDIO LURE SYSTEM ===
function playAudio() {
    if (audioCooldown || camerasDisabled) return;
    
    document.getElementById('snd-lure').play();
    audioCooldown = true;
    document.getElementById('audio-msg').innerText = "Playing...";
    
    // Logic: 50% chance to lure Jairo back to this camera
    setTimeout(() => {
        if (Math.random() > 0.5) {
            jairoLocation = currentCam; // It worked! He moved here.
            console.log("Jairo lured to Cam " + currentCam);
        } else {
            console.log("Lure failed.");
        }
        
        audioCooldown = false;
        document.getElementById('audio-msg').innerText = "Ready";
        updateCamView(); // Update screen in case he appeared
    }, 3000); // 3 second cooldown
}

// === JAIRO AI (Simple Night 1 Logic) ===
function startAI() {
    setInterval(() => {
        if (!gameActive) return;

        // Night 1: Move every 8-12 seconds (Slow)
        if (Math.random() > 0.7) { 
            moveJairo();
        }
    }, 5000); // Check for movement every 5 seconds
}

function moveJairo() {
    // If cameras are broken, he moves faster!
    
    // Logic: Move closer to 0 (The Office)
    if (jairoLocation > 1) {
        jairoLocation--; // Moves from 11 -> 10 -> 9...
        console.log("Jairo moved to Cam " + jairoLocation);
        
        // Random chance to break cameras when moving
        if (Math.random() > 0.8) {
            breakCameras();
        }
    } else {
        // Triggers Jumpscare if he reaches 0
        triggerJumpscare();
    }
    
    // Update view if you are watching him
    if (document.getElementById('monitor').style.display === 'flex') {
        updateCamView();
    }
}

function breakCameras() {
    camerasDisabled = true;
    document.getElementById('cam-static').style.opacity = 1; // Full static
    document.getElementById('snd-static').play();
}

// === CONTROL PANEL (Fixing) ===
function openControlPanel() {
    document.getElementById('control-panel').style.display = 'flex';
}

function rebootCameras() {
    if (!camerasDisabled) return; // Only work if broken
    
    let progress = 0;
    const bar = document.getElementById('reboot-fill');
    
    const interval = setInterval(() => {
        progress += 10;
        bar.style.width = progress + "%";
        
        if (progress >= 100) {
            clearInterval(interval);
            camerasDisabled = false;
            document.getElementById('cam-static').style.opacity = 0.1; // Fix static
            document.getElementById('snd-static').pause();
            document.getElementById('sys-status').innerText = "SYSTEM RESTORED";
            setTimeout(() => { closeUI(); }, 1000);
        }
    }, 500); // Takes 5 seconds to fix
}

function triggerJumpscare() {
    gameActive = false;
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('jumpscare').style.display = 'block';
    
    const scareImg = document.getElementById('scare-gif');
    scareImg.src = "images/jairo_scare.gif"; // Your scary GIF
    document.getElementById('snd-scare').play();
    
    setTimeout(() => {
        alert("GAME OVER");
        location.reload(); // Restarts game
    }, 4000);
}
