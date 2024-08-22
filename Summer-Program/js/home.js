var gradeSelect = document.getElementById('gelement');
    var gradeSpan = document.getElementById('grade');
    var gradeUl = document.querySelector('#gelement ul');
    var gradeLi = document.querySelectorAll('#gelement ul li');

    // give first value by default
    gradeSelect.setAttribute('value', gradeLi[0].innerText);

    // now add onClick attribute to each list
    for(var i = 0; i < gradeLi.length; i++){
        gradeLi[i].setAttribute('onClick', 'gradechangeValue(this)');
    }

    // show and hide of list
    gradeSpan.click()
    gradeSpan.onclick = () => {
        if(gradeUl.style.display === 'none'){
            gradeUl.style.display = 'block';
        }else{
            gradeUl.style.display = 'none';
        }
    }

    // now create a function that change values
    function gradechangeValue(e){
        gradeSpan.innerText = e.innerText;
        gradeSelect.setAttribute('value', e.innerText);
        gradeUl.style.display = 'none';
    }




    var hearSelect = document.getElementById('helement');
    var hearSpan = document.getElementById('hear');
    var hearUl = document.querySelector('#helement ul');
    var hearLi = document.querySelectorAll('#helement ul li');

    // give first value by default
    hearSelect.setAttribute('value', hearLi[0].innerText);

    // now add onClick attribute to each list
    for(var i = 0; i < hearLi.length; i++){
        hearLi[i].setAttribute('onClick', 'hearchangeValue(this)');
    }

    // show and hide of list
    hearSpan.click()
    hearSpan.onclick = () => {
        if(hearUl.style.display === 'none'){
            hearUl.style.display = 'block';
        }else{
            hearUl.style.display = 'none';
        }
    }

    // now create a function that change values
    function hearchangeValue(e){
        hearSpan.innerText = e.innerText;
        hearSelect.setAttribute('value', e.innerText);
        hearUl.style.display = 'none';
    }



let urlParams = new URLSearchParams(window.location.search);
let activeTab = urlParams.get('tab');

let rulesTab = document.getElementById('rules-tab');
let portalTab = document.getElementById('portal-tab');


let rules = document.getElementById('rules');
let portal = document.getElementById('portal');


portalTab.style.borderColor = 'transparent';
portalTab.style.color = '#585757';
rulesTab.style.borderColor = '#950a55';
rulesTab.style.color = '#950a55';
portal.style.display = 'none';
rules.style.display = 'block';

if(activeTab == 'rules'){
  portalTab.style.borderColor = 'transparent';
  portalTab.style.color = '#585757';
  rulesTab.style.borderColor = '#950a55';
  rulesTab.style.color = '#950a55';
  portal.style.display = 'none';
  rules.style.display = 'block';
} else if(activeTab == 'portal'){
  rulesTab.style.borderColor = 'transparent';
  rulesTab.style.color = '#585757';
  portalTab.style.borderColor = '#950a55';
  portalTab.style.color = '#950a55';
  rules.style.display = 'none';
  portal.style.display = 'block';

} 
let essay1Element = document.getElementById('essay1');
let e1counter = document.getElementById("e1counter");

essay1Element.addEventListener("input", () => {
  let e1txt = essay1Element.value.trim();
  let e1count = e1txt.split(/\s+/).filter((item) => item).length;
  e1counter.textContent = e1count + '/150-250';
  if(e1count < 150 || e1count > 250){
      e1counter.style.color = 'red';
  } else{
      e1counter.style.color = 'green';
  }
});

let essay2Element = document.getElementById('essay2');
let e2counter = document.getElementById("e2counter");

essay2Element.addEventListener("input", () => {
  let e2txt = essay2Element.value.trim();
  let e2count = e2txt.split(/\s+/).filter((item) => item).length;
  e2counter.textContent = e2count + '/200';
  if(e2count < 200){
    e2counter.style.color = 'red';
  } else{
    e2counter.style.color = 'green';
  }
});

let essay3Element = document.getElementById('essay3');
let e3counter = document.getElementById("e3counter");

essay3Element.addEventListener("input", () => {
    let e3txt = essay3Element.value.trim();
    let e3count = e3txt.split(/\s+/).filter((item) => item).length;
    e3counter.textContent = e3count + '/150-250';
    if(e3count < 150 || e3count > 250){
        e3counter.style.color = 'red';
    } else{
        e3counter.style.color = 'green';
    }     
});

 
