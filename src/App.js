import { useEffect, useState, useTransition } from 'react';
import './App.css';

function App() {
  const questions = [
  {
    question: "What is the capital city of France?",
    correctAnswer: "Paris",
    wrongAnswers: [
      "Berlin",
      "London",
      "Madrid"
    ]
  },
  {
    question: "What continent is Uruguary in?",
    correctAnswer: "South America",
    wrongAnswers: [
      "Asia",
      "Europe",
      "North America"
    ]
  },
  {
    question: "What is the largest country on Earth?",
    correctAnswer: "Russia",
    wrongAnswers: [
      "Canada",
      "The United States of America",
      "Brazil"
    ]
  }];

  const [questionIndex, setQuestionIndex] = useState(0);

  const [questionSubmitted, setQuestionSubmitted] = useState(false);

  const [finished, setFinished] = useState(false);

  const [correctAnswers, setCorrectAnswers] = useState(0);

  /*useEffect(() => {
    console.log("Called");
  }, []);
  */

  const handleAnswerPressed = (event) => {
    if(questionSubmitted === false) {
      const question = questions[questionIndex];
      if(event.target.innerHTML === question.correctAnswer) {
        //CORRECT ANSWER PRESSED
        setCorrectAnswers(prev => prev + 1)
        event.target.style.backgroundColor = "green";
      }
      else {
        //WRONG ANSWER PRESSED
        event.target.style.backgroundColor = "red";
        event.target.parentNode.childNodes.forEach((node) => {
          if(node.innerHTML === question.correctAnswer) {
            node.style.backgroundColor = "green";
          }
        });
      }
    }

    setQuestionSubmitted(true);
  };

  const generateAnswerElements = (correctAnswer, wrongAnswers) => {
    const rightElement = <li key = {correctAnswer} onClick={handleAnswerPressed} className="Button">{correctAnswer}</li>;
    const wrongElements = wrongAnswers.map((ans) => (<li key={ans} onClick={handleAnswerPressed} className="Button">{ans}</li>))
    const allElements = []
    wrongElements.forEach(element => {
      allElements.splice(Math.floor(Math.random() * (allElements.length + 1)), 0, element);
    });
    allElements.splice(Math.floor(Math.random() * (allElements.length + 1)), 0, rightElement)

    return (
      <ul>
        {allElements}
      </ul>
    )
  };

  const [answerElements, setAnswerElements] = useState(() => generateAnswerElements(questions[questionIndex].correctAnswer, questions[questionIndex].wrongAnswers));

  const nextQuestion = () => {
    if(questionIndex < questions.length - 1) {
      setQuestionSubmitted(false);
      setQuestionIndex(prevIndex => prevIndex + 1);
    }
    else {
      setFinished(true);
    }
  }

  useEffect(() => {
    setAnswerElements(generateAnswerElements(questions[questionIndex].correctAnswer, questions[questionIndex].wrongAnswers));
  }, [questionIndex]);

  const resetQuiz = () => {
    setCorrectAnswers(0);
    setFinished(false);
    setQuestionIndex(0);
    setAnswerElements(generateAnswerElements(questions[questionIndex].correctAnswer, questions[questionIndex].wrongAnswers));
    setQuestionSubmitted(false);
  }

  return (
    <div className="App">
      {!finished ?
      <div className="QuizFrame">
        <h1>Question {questionIndex + 1}</h1>
        <h2>{questions[questionIndex].question}</h2>
        {answerElements}
        {questionSubmitted ? <p onClick={nextQuestion} className="NextQuestion">Next Question</p> : null}
      </div> 
      :
      <div className="QuizFrame">
        <h1>All questions completed!</h1>
        <h2>You scored {correctAnswers}/{questions.length} ({(correctAnswers / questions.length * 100).toFixed(1)}%)</h2>
        <li onClick={resetQuiz} className="Button">Try Again?</li>
      </div>
      }

    </div>
  );
}

export default App;