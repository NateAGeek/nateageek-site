// Start Menu functionality
let startMenuOpen = false;

function toggleStartMenu() {
  const startMenu = document.getElementById('startMenu');
  const startButton = document.querySelector('.start-button');
  const overlay = document.getElementById('startMenuOverlay');
  
  if (startMenu && startButton) {
    startMenuOpen = !startMenuOpen;
    
    if (startMenuOpen) {
      startMenu.classList.add('open');
      startButton.classList.add('active');
    } else {
      startMenu.classList.remove('open');
      startButton.classList.remove('active');
    }
  }
}

function closeStartMenu() {
  const startMenu = document.getElementById('startMenu');
  const startButton = document.querySelector('.start-button');
  
  if (startMenu && startButton) {
    startMenuOpen = false;
    startMenu.classList.remove('open');
    startButton.classList.remove('active');
  }
}

// Update taskbar time
function updateTime() {
  const timeElement = document.getElementById('taskbar-time');
  if (timeElement) {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    timeElement.textContent = timeString;
  }
}

// Close start menu when clicking elsewhere
document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  const startMenu = document.getElementById('startMenu');
  const startButton = document.querySelector('.start-button');
  
  if (startMenuOpen && 
      !target.closest('.start-menu') && 
      !target.closest('.start-button')) {
    closeStartMenu();
  }
});

// Close start menu on escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && startMenuOpen) {
    closeStartMenu();
  }
});

// Initialize time and update every second
updateTime();
setInterval(updateTime, 1000);

// Make functions global
(window as any).toggleStartMenu = toggleStartMenu;
(window as any).closeStartMenu = closeStartMenu;
