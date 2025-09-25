// Window control functions
function minimizeWindow(windowId: string) {
  const mainWindow = document.getElementById(windowId);
  if (mainWindow) {
    mainWindow.classList.toggle('minimized');
    
    // Update minimize button appearance
    const minBtn = mainWindow.querySelector('.minimize');
    if (minBtn) {
      if (mainWindow.classList.contains('minimized')) {
        minBtn.setAttribute('title', 'Restore');
      } else {
        minBtn.setAttribute('title', 'Minimize');
      }
    }
  }
}

function maximizeWindow(windowId: string) {
  // Since window is already fullscreen, we could toggle content area margins
  // or implement a different behavior like toggling menu bar visibility
  const mainWindow = document.getElementById(windowId);
  if (mainWindow) {
    const contentArea = mainWindow.querySelector('.content-area');
    if (contentArea) {
      const isMaximized = contentArea.classList.contains('maximized-content');
      
      if (isMaximized) {
        contentArea.classList.remove('maximized-content');
      } else {
        contentArea.classList.add('maximized-content');
      }
      
      // Update the maximize button appearance
      const maxBtn = mainWindow.querySelector('.maximize');
      if (maxBtn) {
        if (isMaximized) {
          maxBtn.innerHTML = '□'; // Maximize icon
          maxBtn.setAttribute('title', 'Maximize Content');
        } else {
          maxBtn.innerHTML = '❐'; // Restore icon
          maxBtn.setAttribute('title', 'Restore Content');
        }
      }
    }
  }
}

function closeWindow(windowId: string) {
  if (confirm('Are you sure you want to close this rad website?')) {
    document.body.innerHTML = '<div style="background: #008080; color: white; text-align: center; padding: 50px; font-family: MS Sans Serif;"><h1>Thanks for visiting!</h1><p>Window closed - Click refresh to reopen</p></div>';
  }
}

function toggleDropdown(dropdownId: string) {
  // Close all other dropdowns first
  const allDropdowns = document.querySelectorAll('.dropdown-menu');
  allDropdowns.forEach(dropdown => {
    if (dropdown.id !== dropdownId) {
      dropdown.classList.remove('show');
    }
  });

  // Toggle the clicked dropdown
  const dropdown = document.getElementById(dropdownId);
  if (dropdown) {
    dropdown.classList.toggle('show');
  }
}

// Close dropdowns when clicking outside
document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.menu-item-container')) {
    const allDropdowns = document.querySelectorAll('.dropdown-menu');
    allDropdowns.forEach(dropdown => {
      dropdown.classList.remove('show');
    });
  }
});

// Make functions global so they can be called from onclick attributes
(window as any).minimizeWindow = minimizeWindow;
(window as any).maximizeWindow = maximizeWindow;
(window as any).closeWindow = closeWindow;
(window as any).toggleDropdown = toggleDropdown;

// Browser navigation functions
function browserGoBack() {
  if (window.history.length > 1) {
    window.history.back();
    updateUrlBar();
  }
}

function browserGoForward() {
  window.history.forward();
  updateUrlBar();
}

function browserReload() {
  window.location.reload();
}

function browserGoHome() {
  window.location.href = '/';
}

function browserSearch() {
  const query = prompt('Netscape Search - Enter search terms:');
  if (query) {
    // Simulate a retro search engine
    alert(`Searching for "${query}" using Excite Search Engine...\n\nConnecting to search.excite.com...\n\n(This is a retro simulation - actual search not implemented)`);
  }
}

function browserPrint() {
  alert('Netscape Navigator\n\nPrint job started...\nSending to default printer...\n\n(This would normally open the print dialog)');
  // window.print(); // Uncomment for actual printing
}

function browserStop() {
  alert('Stop - Network activity halted');
  const statusText = document.getElementById('statusText');
  if (statusText) {
    statusText.textContent = 'Stopped';
  }
}

function addBookmark() {
  const url = window.location.href;
  const title = document.title;
  alert(`Bookmark added!\n\nTitle: ${title}\nURL: ${url}\n\n(This is a retro simulation - bookmark saved to your retro favorites!)`);
}

function handleUrlKeypress(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    const input = event.target as HTMLInputElement;
    const url = input.value;
    
    // Simple URL validation and navigation
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
      try {
        window.location.href = url;
      } catch (e) {
        alert('Invalid URL format. Please enter a valid web address.');
      }
    } else {
      // Add http:// if missing
      try {
        window.location.href = 'http://' + url;
      } catch (e) {
        alert('Invalid URL format. Please enter a valid web address.');
      }
    }
  }
}

function updateUrlBar() {
  const urlInput = document.getElementById('urlInput') as HTMLInputElement;
  const statusText = document.getElementById('statusText');
  
  if (urlInput) {
    urlInput.value = window.location.href;
  }
  
  if (statusText) {
    statusText.textContent = 'Document: Done';
  }
}

// Simulate loading progress
function simulateLoading() {
  const progressBar = document.getElementById('progressBar');
  const statusText = document.getElementById('statusText');
  
  if (progressBar && statusText) {
    statusText.textContent = 'Connecting to server...';
    progressBar.style.width = '20%';
    
    setTimeout(() => {
      statusText.textContent = 'Receiving data...';
      progressBar.style.width = '60%';
    }, 500);
    
    setTimeout(() => {
      statusText.textContent = 'Formatting document...';
      progressBar.style.width = '90%';
    }, 1000);
    
    setTimeout(() => {
      statusText.textContent = 'Document: Done';
      progressBar.style.width = '100%';
      
      setTimeout(() => {
        progressBar.style.width = '0%';
      }, 500);
    }, 1500);
  }
}

// Update URL bar when page loads
window.addEventListener('load', () => {
  updateUrlBar();
  simulateLoading();
});
window.addEventListener('popstate', updateUrlBar);

// Make browser functions global
(window as any).browserGoBack = browserGoBack;
(window as any).browserGoForward = browserGoForward;
(window as any).browserReload = browserReload;
(window as any).browserGoHome = browserGoHome;
(window as any).browserSearch = browserSearch;
(window as any).browserPrint = browserPrint;
(window as any).browserStop = browserStop;
(window as any).addBookmark = addBookmark;
(window as any).handleUrlKeypress = handleUrlKeypress;
