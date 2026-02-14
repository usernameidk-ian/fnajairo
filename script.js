// === CONFIG ===
const TOTAL_CAMS = 11;
let currentCam = 11;
let jairoLocation = 11; 
let camerasDisabled = false;
let audioCooldown = false;
let gameActive = false;
let rebooting = false;

// === ASSET PRELOADER (Fixes infinite loading) ===
const imageUrls = [
    'images/office_wide.jpg', 'images/static.gif', 
    'images/jairo_scare.gif', 'images/title_character.png'
];

// This loop creates cam01background.png through cam11background.png
// AND cam01jairo.png through cam11jairo.png automatically.
for(let i=1; i<=11; i++) {
    let num = i < 10 ? '0'+i : i;
    imageUrls.push(`images/cam${num}background.png`);
    imageUrls.push(`images/cam${num}jairo.png`);
}

let imagesLoaded = 0;

function checkLoadProgress() {
    imagesLoaded++;
    let percent = Math.floor((imagesLoaded / imageUrls.length) * 100);
    document.getElementById('load-text').innerText = `Loading... ${percent}%`;
    
    // Unlocks the screen even if some images were missing
    if(imagesLoaded >= imageUrls.length) {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('title-screen').style.display = 'flex';
    }
}

// Load them immediately
imageUrls.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onload = checkLoadProgress; // Counts up if successful
    img.onerror = () => { 
        console.warn("⚠️ MISSING IMAGE: " + src); 
        checkLoadProgress(); // STILL counts up so we don't get stuck!
    };
});

// === GAME START ===
function startGame() {
    document.getElementById('title-screen').style.display = 'none';
    document.getElementById('night-intro').style.display = 'block';
    
    setTimeout(() => {
        document.getElementById('night-intro').style.display = 'none';
        document.getElementById('game-screen').style.display = 'block';
        gameActive = true;
        startAI(); 
    }, 4000); 
}

// === OFFICE LOOK ===
document.addEventListener('mousemove', (e) => {
    if (!gameActive) return;
    const width = window.innerWidth;
    const movePercent = (e.clientX / width) * 25; 
    document.getElementById('office-bg').style.transform = `translateX(-${movePercent}%)`;
});

// === CAMERA SYSTEM ===
function openMonitor() {
    if(rebooting) return; 
    document.getElementById('monitor').style.display = 'block'; 
    document.getElementById('snd-blip').play();
    updateCamView();
}

function closeUI() {
    document.getElementById('monitor').style.display = 'none';
    document.getElementById('reboot-screen').style.display = 'none';
}

function switchCam(camNum) {
    if (camerasDisabled) return; 
    currentCam = camNum;
    
    // Blip sound
    const blip = document.getElementById('snd-blip');
    blip.currentTime = 0; blip.play();

    // Visuals
    document.getElementById('cam-static').style.opacity = 0.8;
    setTimeout(() => { document.getElementById('cam-static').style.opacity = 0.15; }, 150);
    
    // Reset all map buttons to normal color
    document.querySelectorAll('.map-btn').forEach(btn => {
        btn.style.background = 'transparent';
        btn.style.color = 'white';
    });
    
    // Highlight active button green
    const activeBtn = document.getElementById('btn' + camNum);
    if(activeBtn) {
        activeBtn.style.background = '#55a832'; // Epstein green
        activeBtn.style.color = 'white';
    }

    updateCamView();
}

function updateCamView() {
    const camImg = document.getElementById('cam-view');
    const camName = document.getElementById('cam-name');
    
    if (camerasDisabled) {
        camImg.src = "images/static.gif"; 
        camName.innerText = "ERR";
        camName.style.color = "red";
        return;
    }

    camName.style.color = "white"; // Reset color

    // Naming logic
    let num = currentCam < 10 ? '0' + currentCam : currentCam;
    
    // Check Jairo
    if (jairoLocation === currentCam) {
        camImg.src = `images/cam${num}jairo.png`;
    } else {
        camImg.src = `images/cam${num}background.png`;
    }
    
    camName.innerText = "CAM " + currentCam;
}

// === REBOOT SYSTEM ===
function openControlPanel() {
    document.getElementById('reboot-screen').style.display = 'flex';
}

function startRebootProcess() {
    const dots = document.getElementById('reboot-dots');
    const trigger = document.getElementById('reboot-trigger');
    const errText = document.getElementById('reboot-err');
    
    if(!camerasDisabled) {
        dots.innerText = "> SYSTEMS NORMAL. NO REBOOT NEEDED.";
        return;
    }

    rebooting = true;
    trigger.style.display = 'none'; 
    errText.style.display = 'block'; 
    let count = 0;

    const loop = setInterval(() => {
        count++;
        let dotString = "";
        for(let i=0; i<(count % 4); i++) dotString += ".";
        
        dots.innerText = "> REBOOTING CAMERA SYSTEM" + dotString;
        
        const beep = document.getElementById('snd-beep');
        beep.currentTime = 0; beep.play();

        if(count > 12) { // About 5 seconds
            clearInterval(loop);
            camerasDisabled = false;
            rebooting = false;
            closeUI();
            trigger.style.display = 'block';
            errText.style.display = 'none';
            dots.innerText = "";
            document.getElementById('cam-static').style.opacity = 0.15;
            document.getElementById('snd-static').pause();
            
            // Auto update cam view to clear the ERR text
            updateCamView();
        }
    }, 400);
}

// === AI & AUDIO ===
function playAudio() {
    if (audioCooldown || camerasDisabled) return;
    document.getElementById('snd-lure').play();
    audioCooldown = true;
    document.getElementById('audio-msg').innerText = "Running...";
    setTimeout(() => {
        if (Math.random() > 0.5) jairoLocation = currentCam;
        audioCooldown = false;
        document.getElementById('audio-msg').innerText = "";
        updateCamView();
    }, 4000);
}

function startAI() {
    setInterval(() => {
        if (!gameActive || rebooting) return;
        if (Math.random() > 0.7) moveJairo();
    }, 5000);
}

function moveJairo() {
    if (jairoLocation > 1) {
        jairoLocation--;
        if (Math.random() > 0.8) breakCameras();
    } else {
        triggerJumpscare();
    }
    if (document.getElementById('monitor').style.display === 'block') updateCamView();
}

function breakCameras() {
    camerasDisabled = true;
    document.getElementById('cam-static').style.opacity = 1; 
    document.getElementById('snd-static').play();
    updateCamView(); // Triggers the ERR screen immediately
}

function triggerJumpscare() {
    gameActive = false;
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('jumpscare').style.display = 'block';
    document.getElementById('scare-gif').src = "images/jairo_scare.gif";
    document.getElementById('snd-scare').play();
    setTimeout(() => { location.reload(); }, 4000);
}
