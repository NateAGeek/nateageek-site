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
