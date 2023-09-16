var programming_languages = [
    {question: "a programming language is commonly used for developing mobile applications?" ,answer:"java"},
    {question: "Which programming language is commonly used for web development?" ,answer:"javascript"},
    {question: "The language used in the database?" ,answer:"sql"},
    {question: "Which programming language is known for its simplicity and readability?" ,answer:"python"},
    {question: "Which programming language is known for its use in statical analysis and data science?" ,answer:"r"}
]

let gamePlayStatus=0; 
let answer = '';
let question='';
let guessed = [];
let WrongLettersNum = 0;
let CorrectLettersNum=0;

// _____ Initialization ______
setQuestion();
generateButtons();
handleBlanks();
updateMistakes();
updateQuestion();

function generateButtons() {
  let content;
  content = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `<button
        class="keyboard_btn"
        id='${letter}'
        onClick="onUserClick('${letter}')"
      >
        ${letter}
      </button>
    `).join('')
  document.querySelector('.keyboard').innerHTML = content;
}

//_____ event functions ______
function onUserClick(char){
  handleGuess(char); 
  handleBlanks();
  setStatus();
  updateMistakes();
  updateImage();
  checkStatus();
}
function resetFunction(){
 gamePlayStatus=0; 
 guessed = [];
 WrongLettersNum = 0;
 CorrectLettersNum=0;
 setQuestion();
  generateButtons();
  updateImage();
  handleBlanks();
  updateMistakes();
  updateQuestion();
}

//_____ updating stats ______
function setQuestion() { //updating aswer & question 
  const number=Math.floor(Math.random() * programming_languages.length);
  answer = programming_languages[number].answer;
  question=programming_languages[number].question;
}

function handleGuess(char) { //updating guessed & WrongLettersNum 
  guessed.push(char);
  document.getElementById(char).className+= ' disabled';
  document.getElementById(char).disabled = true; 
  answer.indexOf(char)<0 ? WrongLettersNum++ : null; 
}

function setStatus(){ //updating gamePlayStatus
  answer.length==CorrectLettersNum
  ? gamePlayStatus=1
  : WrongLettersNum==6
    ? gamePlayStatus=-1
    : null
}

//____ updating componnents _______
function updateMistakes(){
  document.querySelector('.mistakes--num').innerHTML=WrongLettersNum;
}
function updateImage(){
  document.querySelector('.status_images img').src= `./images/${WrongLettersNum}.png`; 
}
function updateQuestion(){
  document.querySelector('.status_question-box--question').innerHTML=question;
}
function checkStatus(){
  gamePlayStatus==0
  ?   null
  :   gamePlayStatus>=0
      ? document.querySelector('.keyboard').innerHTML= `<h2> well done! The answer was '${answer}' </h2>`
      : document.querySelector('.keyboard').innerHTML= `<h2> You lose! The answer was '${answer}' </h2>`
}

function handleBlanks() { //updating blank spaces for letters & CorrectLettersNum
  let num=0;
  function trueSituation(char){
    num++;
    return char
  }
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 
   ? trueSituation(letter)
   :" _ ")).join('');
  document.querySelector('.status_question-box--answer').innerHTML = wordStatus;
  CorrectLettersNum=num;
}




