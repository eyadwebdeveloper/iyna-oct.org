/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId)
 
    toggle.addEventListener('click', () =>{
        // Add show-menu class to nav menu
        nav.classList.toggle('show-menu')
 
        // Add show-icon to show and hide the menu icon
        toggle.classList.toggle('show-icon')
    })
 }
 
 showMenu('nav-toggle','nav-menu')


const teamBtn = document.getElementById('team-btn');
const advBtn = document.getElementById('adv-btn');
const teamSec = document.getElementById('teem');
const advSec = document.getElementById('advs');
teamBtn.style.transform = 'sacle(1.2)';
teamBtn.addEventListener('click', () => {
teamSec.style.display = 'block';
advSec.style.display = 'none';
teamBtn.style.opacity = '1';
advBtn.style.opacity = '.5';
teamBtn.style.transform= 'scale(1.2)';
teamBtn.style.marginRight = '30px'
advBtn.style.transform = 'scale(1)';
});

advBtn.addEventListener('click', () => {
teamSec.style.display = 'none';
advSec.style.display = 'block';
teamBtn.style.opacity = '.5';
advBtn.style.opacity = '1';
advBtn.style.transform= 'scale(1.2)';
advBtn.style.marginLeft = '30px'
teamBtn.style.transform = 'scale(1)';
});


