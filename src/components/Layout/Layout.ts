// Add some sparkle cursor effect
document.addEventListener('mousemove', function(e) {
  const sparkle = document.createElement('div');
  sparkle.innerHTML = '*';
  sparkle.style.position = 'fixed';
  sparkle.style.left = e.clientX + 'px';
  sparkle.style.top = e.clientY + 'px';
  sparkle.style.pointerEvents = 'none';
  sparkle.style.fontSize = '20px';
  sparkle.style.zIndex = '9999';
  sparkle.style.color = '#ffff00';
  document.body.appendChild(sparkle);
  
  setTimeout(() => {
    sparkle.remove();
  }, 1000);
});

// Export to make this a proper module
export {};
