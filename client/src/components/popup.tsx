const ShowPopup = ( message: string, success: boolean = true ) => {
  const popup = document.createElement('div');
  popup.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: ${success ? 'green' : 'red'};
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s;
  `;

  popup.textContent = message;
  document.body.appendChild(popup);

  // Fade in
  requestAnimationFrame(() => {
    popup.style.opacity = '1';
  });

  // Remove after 3 seconds
  setTimeout(() => {
    popup.style.opacity = '0';
    setTimeout(() => document.body.removeChild(popup), 300);
  }, 600);
};

export default ShowPopup;
