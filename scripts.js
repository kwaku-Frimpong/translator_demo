window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const poemBoard = document.querySelector('.poem');

const voiceRecognition = new SpeechRecognition();

function processVoice(e){
    transcript = Array.of(e.results)
        .map(result=>{
            return result[0];
        })
        .map(result=>{
            return result[0].transcript;
        })
        .join('');
    
        writeToScreen(transcript);
        getTranslation(transcript,'nl');
}

function buildUrl(sentence="Hello World",from="en",to="fr"){
    sentence = sentence.split(' ').join('%20');
    return `https://api.mymemory.translated.net/get?q=${sentence}!&langpair=${from}|${to}`;
}

function getTranslation(sentence,to,from="en"){
    url = buildUrl(sentence,from,to);
    fetch(url).then(res=>{
        res.json().then(res=>{
            console.log(res.responseData.translatedText);
            writeToScreen(res.responseData.translatedText);
            return res.responseData.translatedText;
        })
    },err=>{
        console.log(err);
    })
}

function writeToScreen(txt=""){
    p = document.createElement('p');
    poemBoard.appendChild(p);
    p.textContent = txt;
}

voiceRecognition.addEventListener('result',processVoice);
voiceRecognition.addEventListener('end',voiceRecognition.start);


voiceRecognition.start();
