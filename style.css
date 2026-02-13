body {
    margin: 0;
    overflow: hidden;
    background: black;
    color: white;
    font-family: 'Courier New', monospace;
    user-select: none;
}

/* === TITLE SCREEN === */
#title-screen {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
    padding: 0 50px;
    position: relative;
}
.static-bg {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: url('images/static.gif');
    opacity: 0.1;
    z-index: -1;
}
.title-text button {
    margin-top: 20px;
    padding: 15px 30px;
    background: #444;
    color: white;
    font-size: 20px;
    border: 2px solid white;
    cursor: pointer;
}
.title-text button:hover {
    background: #00ff00;
    color: black;
}

/* === THE OFFICE === */
#office-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    background: black;
}
#office-bg {
    width: 2500px; /* Make this wider than screen */
    height: 100vh;
    background: url('images/office_wide.jpg') no-repeat;
    background-size: cover;
    transition: transform 0.1s ease-out; /* Smooth slide */
}

/* === HOVER ZONES === */
.hover-zone {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 15%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.5);
    opacity: 0; /* Only shows when mouse is near */
    transition: opacity 0.3s;
    font-weight: bold;
    cursor: pointer;
    z-index: 10;
}
.hover-zone:hover {
    opacity: 1;
}
#hover-left { left: 0; }
#hover-right { right: 0; }

/* === CAMERA MONITOR === */
#monitor {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: black;
    z-index: 20;
    display: flex;
    flex-direction: column;
    align-items: center;
}
#camera-frame {
    width: 80%;
    height: 70%;
    border: 5px solid #333;
    position: relative;
    overflow: hidden;
}
#cam-view {
    width: 100%; height: 100%;
    object-fit: cover;
}
#cam-static {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    opacity: 0.1; /* Usually hidden, flashes on switch */
    pointer-events: none;
}

/* === MAP BUTTONS === */
#map-grid {
    display: grid;
    grid-template-columns: repeat(3, 80px);
    gap: 10px;
    margin-top: 10px;
}
.cam-btn {
    padding: 10px;
    background: #222;
    border: 1px solid #555;
    color: white;
    font-size: 10px;
    cursor: pointer;
}
.cam-btn:hover {
    background: #444;
}
.cam-btn.active {
    border: 2px solid #00ff00;
    color: #00ff00;
    box-shadow: 0 0 10px #00ff00;
}
.map-you {
    color: red;
    font-weight: bold;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed red;
}

/* === CONTROL PANEL === */
#control-panel {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: black;
    color: #00ff00;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
}
.panel-box {
    border: 2px solid #00ff00;
    padding: 50px;
    text-align: center;
}
#reboot-bar {
    width: 100%;
    height: 20px;
    border: 1px solid #00ff00;
    margin-top: 10px;
}
#reboot-fill {
    width: 0%;
    height: 100%;
    background: #00ff00;
    transition: width 0.1s;
}

/* === JUMPSCARE === */
#jumpscare {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    z-index: 999;
    background: black;
}
#scare-gif {
    width: 100%; height: 100%;
    object-fit: cover;
}
