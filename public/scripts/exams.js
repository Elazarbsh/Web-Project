// 
const examQuestionsUrl = '/examQuestions.json';

// general data fetching function.
const getData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

// return a question element html as a string (build dynamically from the question object).
const createQuestionElement = (questionObj, questionNum) => {
    const _formatNumber = (x) => ( x < 10 ? '0'+x : ''+x );
    
    let questionElement = `
    <div class="question">
        <span class="question-number">${_formatNumber(questionNum)}.</span>
        <span class="question-body">${questionObj.question}</span>
    </div>
    `;

    questionObj.answers.forEach( (answer, answerNum) => {
        questionElement += `
        <div class="answer-wrapper">
            <input type="radio" id="q${questionNum}-a${answerNum}" name="q${questionNum}" value="a${answerNum}" required data-validation-required-message="Please select one of these answers.">
            <label for="q${questionNum}-a${answerNum}">
                <span class="answer-number">${String.fromCharCode("a".charCodeAt(0) + answerNum)}.</span>
                <span class="answer-body">${answer}</span>
            </label>
        </div>
        `;
    } );

    return `<div class="question-wrapper">${questionElement}</div>`;
}

const renderQuestions = async () => {
    const examForm = document.getElementById('form-exam-questions');
    
    const examQuestions = await getData(examQuestionsUrl)
        .catch( err => console.log('there was some error while fetching the data !\n', err));
    
    let formHTML = '';
    examQuestions.forEach( (question, i) => {
        formHTML += createQuestionElement(question, i+1);
    });
    examForm.innerHTML = formHTML;
}

const addFormEvents = async () => {
    const form = document.getElementById('form-exam');
    const submitBtn = form.querySelector('button');
    
    form.addEventListener('change', () => {
        if ( form.checkValidity() ) {
            submitBtn.classList.remove('tooltip');
            submitBtn.attributes['disabled'] && submitBtn.attributes.removeNamedItem('disabled');
        }
    } );
}


// ------------------------------------------------------------------------------------------------
// --- main ---------------------------------------------------------------------------------------

( () => {
    renderQuestions();
    addFormEvents();
})();
