//niz pitanja

const questions = [
    {question: 'Unesi svoje ime'},
    {question: 'Unesi svoje prezime'},
    {question: 'Unesi svoj email', pattern: /\S+@\S+\.\S+/},
    {question: 'Kreiraj password', type: 'password'}
];

//vremena tranzicije
const shakeTime = 100; //vreme tranz. drhtanja
const switchTime = 200; //vreme tranz. izmedju pitanja

//inicajalna pozicija na prvom pitanju
let position = 0;

//inicijal. DOM elemenata
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');


//Events

//pitanja na ucitavanju DOM
document.addEventListener('DOMContentLoaded', getQuestion);

//next dugme klik
nextBtn.addEventListener('click', validate);

//prev dugme klik
prevBtn.addEventListener('click', backQuestion);



//enter klik u input field
inputField.addEventListener('keyup', e => {
    if(e.keyCode == 13){
        validate();
    }

});


//Funkcije



//uzima pitanje iz niza i dodaje ga markapu
function getQuestion(){
    //uzima trenutnu poziciju
    inputLabel.innerHTML = questions[position].question;
    //uzima trenutni tip
    inputField.type = questions[position].type || 'text';
    //uzima trenutni odgovor
    inputField.value = questions[position].answer || '';
    //fokus na trenutni element
    inputField.focus();

    //setovanje width progres bara  - promenljiva duzine pitanja
    progress.style.width = (position * 100)/questions.length + '%';

   

    //dodaj ikonu korisnika ili strelicu nazad u zavisnosti od pitanja
    prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';

    showQuestion();

}

//dugme prev vraca pitanje unazad
function backQuestion(){
    
    
     
}


//Prikazi pitanje korisniku
function showQuestion(){
    inputGroup.style.opacity = 1;
    inputProgress.style.transition = '';
    inputProgress.style.width = '100%';
}

//skrivanje pitanja od korisnika
function hideQuestion(){
    inputGroup.style.opacity = 0;
    inputLabel.style.marginLeft = 0;
    inputProgress.style.width = 0;
    inputProgress.style.transition = 'none';
    inputGroup.style.border = null;
}

//transform za kreiranje shake kretanja
function transform(x, y){
    formBox.style.transform = `translate(${x}px, ${y}px)`;

}

//polje validate
function validate(){
    //osiguraj da se patern slaze ako ga ima
    if(!inputField.value.match(questions[position].pattern || /.+/))
{
    inputFail();
}else{
    inputPass();
}

}

//Field input fail
function inputFail(){
    formBox.className = 'error';
    //ponovljeno shake kretanje - i je broj shakovanja
    for(let i=0; i < 6; i++){
        setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 10, 0);
        setTimeout(transform, shakeTime * 6, 0, 0);
        inputField.focus();
    }

}
//field input pass
function inputPass(){
    formBox.className = '';
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);

    //snimanje answera
    questions[position].answer = inputField.value;

    //position inkrementiranje
    position++;

    //ako novo pitanje, sakrij trenutno i uzmi sledece
    if(questions[position])
    {
        hideQuestion();
        getQuestion();


    }else{
        //ukloniti ako nema pitanja
        hideQuestion();
        formBox.className = 'close';
        progress.style.width = '100%';

        //forma kompletirana
        formComplete();
    }
}

//popunjena sva polja
function formComplete(){
    
    const h1 = document.createElement('h1');
    h1.classList.add('end');
    h1.appendChild(document.createTextNode(`Hvala, ${questions[0].answer}. Registrovani ste i ubrzo ce Vam stici e-mail.`)
    );
    setTimeout(() => {
        formBox.parentElement.appendChild(h1);
        setTimeout(() => h1.style.opacity = 1, 50);
    }, 1000);
}