// Move Pop Up 
const maxClicks = 1; // Number of Reappearance
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

  // Add the 'no-pointer' class to the curtain panels when hiding the popup
  const curtainPanels = document.querySelectorAll('.curtain__panel');
  curtainPanels.forEach(panel => {
    panel.classList.add('no-pointer');
  });

  popupVisible = false;

  // Remove the click event listener from the pop-up after the fifth click
  popup.removeEventListener('click', movePopup);
}


function openCurtain() {
  const curtainCheckbox = document.getElementById('curtainCheckbox');
  curtainCheckbox.checked = false; // Uncheck the checkbox
}

// Gift Box Animation
window.onload=function(){
  var merrywrap=document.getElementById("merrywrap");
  var box=merrywrap.getElementsByClassName("giftbox")[0];
  var step=1;
  var stepMinutes = [2000, 1000, 500, 500]; // Timing in miliseconds


  function init() {
    box.addEventListener("click", openBox, false); // Use click event
  }
  
  function stepClass(step){
    merrywrap.className='merrywrap';
    merrywrap.className='merrywrap step-'+step;
  }

  function openBox(){
    if(step===1){
      box.removeEventListener("click",openBox,false); 
    }  
    stepClass(step); 
    if(step===3){ 
      document.querySelector('.curtain__prize img').classList.remove('hidden');
    } 
    if(step===4){ 
       return;
    }     
    setTimeout(openBox,stepMinutes[step-1]);
    step++;  
  }
   
  init();
 
}
