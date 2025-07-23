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
  const query = prompt('Enter search terms:');
  if (query) {
    // Simulate a retro search engine
    alert(`Searching for "${query}" using Yahoo! Search Engine...\n\n(This is a retro simulation - actual search not implemented)`);
  }
}

function browserPrint() {
  window.print();
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
  if (urlInput) {
    urlInput.value = window.location.href;
  }
}

// Update URL bar when page loads
window.addEventListener('load', updateUrlBar);
window.addEventListener('popstate', updateUrlBar);

// Make browser functions global
(window as any).browserGoBack = browserGoBack;
(window as any).browserGoForward = browserGoForward;
(window as any).browserReload = browserReload;
(window as any).browserGoHome = browserGoHome;
(window as any).browserSearch = browserSearch;
(window as any).browserPrint = browserPrint;
(window as any).addBookmark = addBookmark;
(window as any).handleUrlKeypress = handleUrlKeypress;
