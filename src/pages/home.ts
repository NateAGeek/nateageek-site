// Boot completion handler for the intro screen
function bootComplete() {
  const introScreen = document.getElementById('introScreen');
  const mainContent = document.getElementById('mainContent');
  
  if (introScreen && mainContent) {
    // Add fade out class to intro screen
    introScreen.classList.add('fade-out');
    
    // After animation completes, hide intro and show main content
    setTimeout(() => {
      introScreen.style.display = 'none';
      mainContent.style.display = 'block';
      
      // Add a boot-up effect to the main content
      mainContent.style.opacity = '0';
      setTimeout(() => {
        mainContent.style.transition = 'opacity 1s ease-in';
        mainContent.style.opacity = '1';
      }, 100);
    }, 1000);
  }
}

// Make function global so it can be called from the IntroScreen component
(window as any).bootComplete = bootComplete;

// Export to make this a proper module
export { bootComplete };
