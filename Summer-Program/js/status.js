let urlParams = new URLSearchParams(window.location.search);
let activeTab = urlParams.get('tab');

let statusTab = document.getElementById('status-tab');
let announcmentsTab = document.getElementById('announcments-tab');
let contactTab = document.getElementById('contact-tab');



let status = document.getElementById('status');
let announcments = document.getElementById('announcments');
let contact = document.getElementById('contact');

if(activeTab == 'status'){
  announcmentsTab.style.borderColor = 'transparent';
  announcmentsTab.style.color = '#585757';
  contactTab.style.borderColor = 'transparent';
  contactTab.style.color = '#585757';
  statusTab.style.borderColor = '#950a55';
  statusTab.style.color = '#950a55';
  announcments.style.display = 'none';
  contact.style.display = 'none';
  status.style.display = 'block';
} else if(activeTab == 'announcments'){
  statusTab.style.borderColor = 'transparent';
  statusTab.style.color = '#585757';
  contactTab.style.borderColor = 'transparent';
  contactTab.style.color = '#585757';
  announcmentsTab.style.borderColor = '#950a55';
  announcmentsTab.style.color = '#950a55';
  status.style.display = 'none';
  contact.style.display = 'none';
  announcments.style.display = 'block';
} else if(activeTab == 'contact'){
  statusTab.style.borderColor = 'transparent';
  statusTab.style.color = '#585757';
  announcmentsTab.style.borderColor = 'transparent';
  announcmentsTab.style.color = '#585757';
  contactTab.style.borderColor = '#950a55';
  contactTab.style.color = '#950a55';
  status.style.display = 'none';
  announcments.style.display = 'none';
  contact.style.display = 'block';
} 
