const numbers = document.querySelectorAll('#btns .btn');
const passLength = document.getElementById('lenght');
const deleteBtn = document.getElementById('detete-btn');
const homePage = document.getElementById('home-screen');
const lookScreen = document.getElementById('passcode');


let index = 0;
let pin;
let userPin = '';


//Animation when enter wrong pass
const myAnimation = () => {
  const keyframeEffect = new KeyframeEffect(passLength, [
   {transform: 'translate(0px)'},
   {transform: 'translate(20px)'},
   {transform: 'translate(-20px)'},
   {transform: 'translate(0px)'}
    ], {
    duration: 200,
    iterations: 1
  });
  return new Animation(keyframeEffect, document.timeline);
};


//get pin from localStorage
const fill = () => {
  pin = localStorage.getItem('pin').split('');
  
  for (let i=0;i<pin.length;i++) {
    const span = document.createElement('span');
    passLength.append(span);
  };

};



//Get pin from localStorage
const getPass = () => {
  const passcode = localStorage.getItem('pin');
  if (!passcode) {
    const pass = prompt('Enter Pin First time') ||'0000';
    localStorage.setItem('pin', pass);
    fill();
  }else {
    fill();
  };
  
};
getPass();



//Click Event for Each Btn
numbers.forEach((number) => {
  number.addEventListener('click', () => {
    enter(number.children[0].innerText);
  });
});


//when enter passCode
const enter = (number) => {
  const span = document.querySelectorAll('#lenght span');
  
  userPin += number;
  
  if (index >= pin.length) {
    return;
  };
  index++;
  
  for (let i = 0; i < index; i++) {
    for (let x = i; x < index; x++) {
      span[x].style.background = '#fff'
    };
  };
  
  
  //Check User Pin And Match
  if (userPin.length >= pin.length) {
    if(userPin == pin.join('')) rightPin();
    else wrongPin();
  };
  
};



//Cancel btn
const DELETE = () => {
  const span = document.querySelectorAll('#lenght span');
  
  if (index < 1) {
    return;
  };
  
  span.forEach( span => {
    span.style.background = 'transparent';
  });
  
  for (let i=0;i < index-1; i++) {
    span[i].style.background = '#fff';
  };
  index--;
  //delete when cancel a dight
  userPin = userPin.split('').slice(0, -1).join('')
  
};
deleteBtn.addEventListener('click', DELETE);



//when usre enter Wrong pin
const wrongPin = () => {
  userPin = '';
  index = 0;
  myAnimation().play();
  const span = passLength.querySelectorAll('span');
  for (let i = 0; i <span.length; i++) {
    span[i].style.background = 'transparent';
  };
  
};


//when user enter Right pin
const rightPin = () => {
  //Animation
  const keyframe = new KeyframeEffect(lookScreen, {
    opacity: [1, 07, 04 , 01 ,0]
  }, {
    duration: 250,
    iterations: 1
  });
  const myAnimation = new Animation(keyframe, document.timeline);
  
  
  userPin = '';
  myAnimation.play();
  
 myAnimation.onfinish = () => {
    lookScreen.style.display = 'none'
    homePage.style.display = 'block';
  };
  
};

//Kshapii