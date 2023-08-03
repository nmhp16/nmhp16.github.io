const maxClicks = 7;
let clickCount = 0;
let popupVisible = true;
let prevX = 0;
let prevY = 0;

function movePopup(event) {
  if (clickCount < maxClicks) {
    const popup = event.currentTarget;
    const modalBg = document.getElementById('modalBg');

    // Get curtain width and height
    const curtainWidth = document.querySelector('.curtain__panel').clientWidth;
    const curtainHeight = document.querySelector('.curtain__panel').clientHeight;

    const maxOffset = 1; // Maximum offset in pixels

    // Calculate the new position within a 250-pixel offset from the previous position
    const offsetX = Math.floor(Math.random() * (2 * maxOffset + 250)) - maxOffset;
    const offsetY = Math.floor(Math.random() * (2 * maxOffset + 250)) - maxOffset;
    const randomX = prevX + offsetX;
    const randomY = prevY + offsetY;

    // Make sure the random position stays within the curtain's dimensions
    const limitedX = Math.min(Math.max(0, randomX), curtainWidth - popup.clientWidth);
    const limitedY = Math.min(Math.max(0, randomY), curtainHeight - popup.clientHeight);

    // Move the popup to the new position
    popup.style.left = limitedX + 'px';
    popup.style.top = limitedY + 'px';

    // Reset the previous position
    prevX = 0;
    prevY = 0;

    clickCount++;

    if (clickCount === maxClicks) {
      hidePopup(popup, modalBg);
    }
  }
}

function hidePopup(popup, modalBg) {
  // Hide the pop-up after the fifth click
  popup.style.display = 'none';

  // Hide the overlay after the fifth click
  modalBg.style.display = 'none';

  popupVisible = false;

  // Remove the click event listener from the pop-up after the fifth click
  popup.removeEventListener('click', movePopup);
}

// Add click event listener to the overlay to stop event propagation
const overlay = document.querySelector('.overlay');
overlay.addEventListener('click', function (event) {
  event.stopPropagation();
});

// Add click event listener to the pop-up
const popup = document.querySelector('.popup');
popup.addEventListener('click', movePopup);

// When the DOM is ready, remove the hidden class from the overlay
document.addEventListener('DOMContentLoaded', function () {
  overlay.classList.remove('hidden');
});
