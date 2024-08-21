function load(){
    document.getElementById('loading').style.display = 'flex';
    setTimeout( ()=> {
      document.getElementById('loading').style.display = 'none';
    }, 3000);
  }
  window.onload = load();