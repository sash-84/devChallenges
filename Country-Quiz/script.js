const questions = {
    1: {
        q: "Which country's flag is known as the 'Union Jack'?",
        options: ["Australia", "United States", "United Kingdom", "New Zealand"],
        correct: "United Kingdom"
    },
    2: {
        q: "Which country has the capital city of Buenos Aires?",
        options: ["Brazil", "Argentina", "Chile", "Peru"],
        correct: "Argentina"
    },
    3: {
        q: "What is the official language of Brazil?",
        options: ["Spanish", "Portuguese", "French", "Italian"],
        correct: "Portuguese"
    },
    4: {
        q: "Which country is known for its maple leaf symbol?",
        options: ["Canada", "Sweden", "Norway", "Denmark"],
        correct: "Canada"
    },
    5: {
        q: "Which country is home to the Great Barrier Reef?",
        options: ["Philippines", "Indonesia", "Australia", "Fiji"],
        correct: "Australia"
    },
    6: {
        q: "Which country has a flag with a red circle on a white background?",
        options: ["South Korea", "Japan", "China", "Indonesia"],
        correct: "Japan"
    },
    7: {
        q: "In which country is the ancient Incan city of Machu Picchu located?",
        options: ["Colombia", "Peru", "Bolivia", "Ecuador"],
        correct: "Peru"
    },
    8: {
        q: "Which country celebrates the festival of Diwali?",
        options: ["India", "Thailand", "Indonesia", "Malaysia"],
        correct: "India"
    },
    9: {
        q: "Which country is famous for its tulips and windmills?",
        options: ["Belgium", "Switzerland", "Netherlands", "Germany"],
        correct: "Netherlands"
    },
    10: {
        q: "Which country has a dragon on its national flag?",
        options: ["Bhutan", "Nepal", "Mongolia", "Sri Lanka"],
        correct: "Bhutan"
    }
};

const question = document.querySelector(".question-text");
const option = document.querySelectorAll(".option");
const circles = document.querySelectorAll(".circle");
const result = document.querySelector(".result");
const container = document.querySelector(".container");
const play = document.querySelector(".btn");

var correct = 0;
var solved = 0;
let currentquestion = 1;

function loadQuestion(index) { 
    question.innerHTML = questions[index].q;
    option.forEach((op,i) => {
        op.innerHTML = questions[index].options[i]
        op.classList.remove("disable");
        op.classList.remove("selected");
    });
}

function resetQuiz() {
    currentquestion = 1;
    correct = 0;
    solved = 0;
    loadQuestion(currentquestion);
    circles.forEach((c,i)=>{
        c.classList.remove("active","disabled");
        if(i===0) c.classList.add("active");
    });
}

loadQuestion(currentquestion);

circles.forEach((circle)=>{
    circle.addEventListener("click", ()=>{
        currentquestion = parseInt(circle.innerHTML);
        loadQuestion(currentquestion);
        circles.forEach((c) => c.classList.remove('active'));
        circle.classList.add('active');
    });
});

option.forEach((op) => {
    op.addEventListener("click", () => {
        let index = parseInt(document.querySelector(".active").innerHTML);
        if(op.innerHTML == questions[currentquestion].correct){
            op.classList.add("selected");
            op.innerHTML = `${op.innerHTML}<img src="assets/Check_round_fill.svg"></img>`;
            correct++;
        }else{
            op.innerHTML = `${op.innerHTML}<img src="assets/Close_round_fill.svg"></img>`;
            op.classList.add("selected");
            option.forEach((o) => {
                if (o.innerHTML.includes(questions[currentquestion].correct.trim())) {
                    o.innerHTML = `${o.innerHTML} <img src="assets/Check_round_fill.svg">`;
                }
            });                    
        }
        circles[index-1].classList.add("disabled");
        option.forEach((o) => {
            o.classList.add("disable");
        })
        solved++;
        if(solved == 10){
            setTimeout(() => {
                container.style.display = "none";
                result.style.display = "block";
                document.querySelector(".h3").innerHTML = `You score ${correct}/10 correctly`;
            }, 300);
        }
    })
})

play.addEventListener("click", () => {
    container.style.display = "block";
    result.style.display = "none";
    resetQuiz();
})
