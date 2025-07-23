// Two-stage boot process: Power Button → Audio + Wait → BIOS Screen → Main Site
// With localStorage support to automatically skip intro for returning users

// localStorage key for tracking user visits
const STORAGE_KEY = 'nateageek-site-visited';
const STORAGE_DATA_KEY = 'nateageek-site-data';

interface SiteData {
  hasVisited: boolean;
  visitCount: number;
  lastVisit: string;
}

// Get or initialize site data
function getSiteData(): SiteData {
  try {
    const stored = localStorage.getItem(STORAGE_DATA_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.log('Error reading site data:', error);
  }
  
  // Default data for first-time visitors
  return {
    hasVisited: false,
    visitCount: 0,
    lastVisit: ''
  };
}

// Save site data to localStorage
function saveSiteData(data: SiteData): void {
  try {
    localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(data));
    // Also set the simple flag for backward compatibility
    localStorage.setItem(STORAGE_KEY, 'true');
  } catch (error) {
    console.log('Error saving site data:', error);
  }
}

// Mark that user has completed the boot sequence
function markBootCompleted(): void {
  const data = getSiteData();
  data.hasVisited = true;
  data.visitCount += 1;
  data.lastVisit = new Date().toISOString();
  saveSiteData(data);
}

document.addEventListener('DOMContentLoaded', () => {
  const powerBtn = document.getElementById('powerBtn') as HTMLButtonElement;
  const powerScreen = document.getElementById('powerScreen');
  const biosScreen = document.getElementById('biosScreen');
  const startupAudio = document.getElementById('startupAudio') as HTMLAudioElement;
  
  // Check if user has visited before and auto-skip if they have
  const siteData = getSiteData();
  if (siteData.hasVisited && siteData.visitCount > 0) {
    // Auto-skip for returning users
    console.log('Returning user detected - auto-skipping intro');
    
    // Update visit count
    const updatedData = getSiteData();
    updatedData.visitCount += 1;
    updatedData.lastVisit = new Date().toISOString();
    saveSiteData(updatedData);
    
    // Skip straight to main content without fade effects
    const introScreen = document.getElementById('introScreen');
    const mainContent = document.getElementById('mainContent');
    
    if (introScreen && mainContent) {
      // Hide intro immediately
      introScreen.style.display = 'none';
      
      // Show main content immediately without any animations
      mainContent.style.display = 'block';
      mainContent.style.opacity = '1';
      mainContent.style.transition = 'none';
    }
    
    return;
  }

  // First-time user - show normal intro sequence
  console.log('First-time user - showing full intro');

  // Handle power button click
  if (powerBtn && powerScreen && biosScreen && startupAudio) {
    powerBtn.addEventListener('click', () => {
      // Disable the button to prevent multiple clicks
      powerBtn.disabled = true;
      powerBtn.style.display = 'none';
      
      // Play startup audio
      startupAudio.play().catch(error => {
        console.log('Audio playback failed:', error);
        // Continue with boot process even if audio fails
      });
      
      // Wait 5 seconds before showing BIOS screen
      setTimeout(() => {        
        setTimeout(() => {
          powerScreen.style.display = 'none';
          biosScreen.style.display = 'block';
          // Show BIOS immediately without fade-in
          startBiosSequence();
        }, 1000);
      }, 5000);
    });
  }

  function startBiosSequence() {
    const systemInfo = document.getElementById('systemInfo');
    if (!systemInfo) return;

    // Define all BIOS lines in order
    const biosLines = [
      'NateAGeek BIOS (C) 1995-2025 NateAGeek Technologies Inc.',
      'GeekOS Firmware v3.14.159',
      '',
      'Processor : NateAGeek Quantum Brain Processor',
      'Speed : 1337 MHz (Overclocked for Maximum Geekness)',
      '',
      'Memory Test : ', // Special line for memory counter - will be updated dynamically
      '',
      'Detecting Hardware...',
      'PCIe Slot 1 : NateAGeek Graphics Accelerator',
      'PCIe Slot 2 : Ethernet Controller',
      'USB Port 1 : 1 Mouse Detected',
      'USB Port 2 : 1 Keyboard Detected', 
      'Serial Port : Retro Modem (56k, because we\'re fancy)',
      '',
      'HDD Primary Master   : Solid State Meme Drive',
      'HDD Primary Slave    : None (We don\'t do slavery here)',
      'HDD Secondary Master : GIF Storage Array',
      '',
      'Base Memory : 640K (Just like the good ol\' days)',
      'Extended Memory : 31744K',
      'Total Memory : 32384K (More than enough for HTML)',
      '',
      'Press F1 to enter GeekOS Setup, ESC to skip memory test',
      'Initializing NateAGeek\'s Cyber Zone...'
    ];

    let currentLine = 0;
    let memoryTestLineIndex = 6; // Index of the memory test line
    let memoryCounter = 0;
    const targetMemory = 69420;
    let isMemoryTestComplete = false;

    // Function to add a line with typing effect
    function addLine() {
      if (currentLine >= biosLines.length || !systemInfo) {
        // All lines printed, complete boot process
        setTimeout(() => {
          // Mark that user has completed the boot sequence
          markBootCompleted();
          
          if ((window as any).bootComplete && typeof (window as any).bootComplete === 'function') {
            (window as any).bootComplete();
          }
        }, 1500);
        return;
      }

      const lineDiv = document.createElement('div');
      lineDiv.className = 'bios-line';
      
      if (currentLine === memoryTestLineIndex) {
        // Special handling for memory test line
        lineDiv.className = 'bios-line memory-test';
        lineDiv.innerHTML = 'Memory Test : <span id="memoryCounter">0</span>K';
        systemInfo.appendChild(lineDiv);
        startMemoryTest();
        currentLine++;
        // Don't add next line immediately, wait for memory test to complete
        return;
      } else if (currentLine === biosLines.length - 2) {
        // Boot message with blinking - "Press F1 to enter GeekOS Setup..."
        lineDiv.className = 'bios-line boot-message';
        lineDiv.style.textAlign = 'center';
        lineDiv.style.marginTop = '20px';
        lineDiv.style.animation = 'blink 1s infinite';
        lineDiv.textContent = biosLines[currentLine];
      } else if (currentLine === biosLines.length - 1) {
        // Loading message
        lineDiv.className = 'bios-line loading-message';
        lineDiv.style.textAlign = 'center';
        lineDiv.style.marginTop = '20px';
        lineDiv.style.fontWeight = 'bold';
        lineDiv.textContent = biosLines[currentLine];
      } else {
        lineDiv.textContent = biosLines[currentLine];
      }
      
      systemInfo.appendChild(lineDiv);
      currentLine++;
      
      // Add next line after a short delay (faster old school feel)
      setTimeout(addLine, 75); // Faster line printing
    }

    // Function to animate memory test
    function startMemoryTest() {
      const memoryCounterSpan = document.getElementById('memoryCounter');
      if (!memoryCounterSpan) return;

      const memoryInterval = setInterval(() => {
        memoryCounter += 3072; // Faster memory counting
        if (memoryCounter >= targetMemory) {
          memoryCounter = targetMemory;
          clearInterval(memoryInterval);
          
          // Memory test complete, now show completion message and continue
          setTimeout(() => {
            isMemoryTestComplete = true;
            addLine(); // Continue with the rest of the boot sequence
          }, 300);
        }
        memoryCounterSpan.textContent = memoryCounter.toLocaleString();
      }, 40); // Very fast memory counting
    }

    // Start printing lines
    addLine();
  }
});
