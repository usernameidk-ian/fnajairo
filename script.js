// --- GAME VARIABLES ---
let currentHour = 12;
let nightTimer;
let aiTimer;
let currentCam = 11;
let isMonitorUp = false;
let systemError = false;

// --- AI CONFIGURATION (Night 1) ---
// 11 = Stage, 9 = Hall A, 8 = Hall B, 5 = Kitchen, 0 = OFFICE (You die)
let jairoLocation = 11; 
let jairoAILevel = 4; // Difficulty (1-20)

// --- START GAME ---
function startGame() {
    document.getElementById('title-screen').classList.add('hidden');
    document.getElementById('intro-screen').classList.remove('hidden');
}

function startNight() {
    document.getElementById('intro-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    
    // Start Clock (Every 30 seconds IRL = 1 hour in game)
    nightTimer = setInterval(gameClock, 30000); // 30 seconds
    
    // Start Jairo AI (Moves every 5 seconds)
    aiTimer = setInterval(jairoAI, 5000); 
}

function gameClock() {
    currentHour++;
    document.getElementById('clock').innerText = currentHour + ":00 AM";
    if (currentHour === 6) {
        winGame();
    }
}

// --- OFFICE & MONITOR CONTROLS ---
function toggleMonitor() {
    if (systemError) {
        alert("SYSTEM ERROR! REBOOT REQUIRED IN CONTROL PANEL (LEFT).");
        return;
    }

    const monitor = document.getElementById('monitor');
    isMonitorUp = !isMonitorUp;
    
    if (isMonitorUp) {
        monitor.classList.remove('hidden');
        updateCamView();
    } else {
        monitor.classList.add('hidden');
    }
}

function switchCam(camNum) {
    if (systemError) return;
    
    // Play static effect briefly
    const staticGif = document.getElementById('static-gif');
    staticGif.classList.remove('hidden');
    setTimeout(() => { staticGif.classList.add('hidden'); }, 200);

    currentCam = camNum;
    document.getElementById('cam-name').innerText = "CAM " + (camNum < 10 ? "0" + camNum : camNum);
    updateCamView();
}

function updateCamView() {
    const feed = document.getElementById('cam-feed');
    const sticker = document.getElementById('jairo-sticker');
    
    // 1. Load the background image for this camera
    // You need images named: cam11.jpg, cam09.jpg, etc. inside 'images' folder
    // For now, it will look broken until you add images, that is okay.
    feed.src = `images/cam${currentCam}.jpg`; 

    // 2. Check if Jairo is here
    if (jairoLocation === currentCam) {
        sticker.classList.remove('hidden'); // Show Jairo Sticker
    } else {
        sticker.classList.add('hidden'); // Hide Jairo Sticker
    }
}

// --- AUDIO LURE MECHANIC ---
function playAudio() {
    if (systemError) return;
    
    const audioStatus = document.getElementById('audio-status');
    audioStatus.innerText = "PLAYING AUDIO...";
    audioStatus.style.color = "orange";

    setTimeout(() => {
        // Logic: If Jairo is nearby, he moves TO this camera
        let distance = Math.abs(jairoLocation - currentCam);
        
        if (distance <= 3) { // If he is close to the camera you clicked
            jairoLocation = currentCam; // He moves there
            console.log("Jairo lured to Cam " + currentCam);
        } else {
            console.log("Jairo ignored the audio.");
        }

        audioStatus.innerText = "Audio Ready";
        audioStatus.style.color = "lime";
        
        // Update view in case he just walked into your camera
        updateCamView(); 
    }, 2000); // Takes 2 seconds to play sound
}

// --- SYSTEM ERROR & REBOOT ---
function triggerError() {
    systemError = true;
    isMonitorUp = false; // Force monitor down
    document.getElementById('monitor').classList.add('hidden');
    document.getElementById('sys-status').innerText = "SYSTEM: ERROR (REBOOT REQ)";
    document.getElementById('sys-status').style.color = "red";
    document.getElementById('error-msg').classList.remove('hidden');
}

function rebootSystem() {
    if (!systemError) return;
    
    const btn = document.querySelector('#panel-zone button');
    btn.innerText = "REBOOTING...";
    
    setTimeout(() => {
        systemError = false;
        document.getElementById('sys-status').innerText = "SYSTEM: ONLINE";
        document.getElementById('sys-status').style.color = "lime";
        document.getElementById('error-msg').classList.add('hidden');
        btn.innerText = "REBOOT CAMERAS";
        alert("Systems Online.");
    }, 4000); // Takes 4 seconds to reboot
}

// --- JAIRO AI LOGIC ---
function jairoAI() {
    // 1. Roll Dice (1-20)
    let roll = Math.floor(Math.random() * 20) + 1;
    
    // 2. If roll is less than AI Level, he moves
    if (roll <= jairoAILevel) {
        moveJairo();
    }
}

function moveJairo() {
    // Simple movement logic: He counts down from 11 to 0
    // 11 -> 9 -> 8 -> 5 -> 0 (Office)
    
    if (jairoLocation === 11) jairoLocation = 9;
    else if (jairoLocation === 9) jairoLocation = 8;
    else if (jairoLocation === 8) jairoLocation = 5;
    else if (jairoLocation === 5) {
        jairoLocation = 0; // ENTER OFFICE
        jumpscare();
    }

    console.log("Jairo moved to: " + jairoLocation);
    
    // If monitor is up, refresh the screen so we see if he left/arrived
    if (isMonitorUp) updateCamView();
}

function jumpscare() {
    clearInterval(nightTimer);
    clearInterval(aiTimer);
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('jumpscare-screen').classList.remove('hidden');
    
    // Play sound here later
}

function winGame() {
    clearInterval(nightTimer);
    clearInterval(aiTimer);
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('monitor').classList.add('hidden');
    document.getElementById('win-screen').classList.remove('hidden');
}
