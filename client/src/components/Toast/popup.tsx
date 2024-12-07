const ShowPopup = ( message: string, success: string) => {
  const popup = document.createElement('div');
  popup.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: ${success};
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

  // Remove after 0.6 seconds
  setTimeout(() => {
    popup.style.opacity = '0';
    setTimeout(() => document.body.removeChild(popup), 600);
  }, 600);
};

export default ShowPopup;
