import React from 'react';
import './App.css';
import Controller from "./Controller";
import DataModel from "./DataModel";
import logger from "./SimpleDebug";



function AnswerView(props) {
    return (
      <li className="answer" id={props.id} isCorrect={props.iscorrect}>
        {props.id}.  {props.children}
      </li>
    );
}

class AnswerListView extends React.Component {
  render () {
    let answers = this.props.answers;
    if (answers === undefined) {
        answers = [];
    }
    return (
        <div id="answerList" className="answerList">
          <ul id="answers">
            {answers.map(answer => <AnswerView key={answer.id} iscorrect={answer.isCorrect+""} >{answer.answer}</AnswerView>)}
          </ul>
        </div>
    );
  }
}

class QuestionDisplayView extends React.Component {
  render() {
    let question = this.props.question;
    if (question === undefined) {
        question = {};
    }
    return (
        <div id="questionDisplayView">
          <h4 id="question">{question.question}</h4>
          <AnswerListView answers={question.answers}/>
          <ScoreDisplay/>
        </div>
    )
  }
}

function HighScores() {
  return (
      <div id="goToHighScores" className={"linkToHighScores col-sm-3"}>View High Scores</div>
  )
}

function Timer() {
  return (
      <div id="timer" className={"timer col-sm-3"}>Time: 0s</div>
  )
}
function ScoreDisplay() {
    return (
        <div id="scoreDisplay" className={"col-sm-3 hidden"}></div>
    )
}

class App extends React.Component {
    /*
      The quiz has multiple states (an enumeration would be useful)
      1.  Quiz not started - VALUE -1;
      2.  Quiz started, not yet finished - VALUE 1;
      3.  Quiz finished - VALUE 2;
      4.  Not showing Quiz, but showing high scores - VALUE 3;
     */

    constructor() {
        super();
        logger.log("Setting starting state");
        this.state = { currentQuestion: {} , highScores: [], quizState: -1};
    }

    /* components are all setup, now we can render everything */
    componentDidMount() {
        /* setup the model view controller */
        let model = new DataModel(window.localStorage);
        let controller = new Controller(this,document,model);
    }

    /* construct the view */
    render() {
        switch(this.state.quizState) {
            case 0: {

            } //quiz not started
        }
        return (
            <div id="App" className="App container-fluid">
                <HighScores/>
                <QuestionDisplayView question={this.state.currentQuestion}/>
                <Timer/>
            </div>
        );
    }

    callbackQuizStarted() {
        /* the timer has been started by the controller */
        this.quizState = 1; // record the current state - quiz started
        /* hide the start button */
        let startQuizButtonView = document.getElementById("startQuiz");
        startQuizButtonView.style.display = "none";
        /* now display the first question */
        let question = this.controller.getNextQuestion();
        logger.log(question,2);
        this.updateQuestionDisplay(question);
    }



    callbackShowNextQuestion() {
        /* ask for the next question from the controller */
        let question = this.controller.getNextQuestion();
        /*
          do we have anymore questions?  if so, proceed to update the display,
          the controller will let us know if we are done with a different callback
        */

        if (question != null) {
            this.updateQuestionDisplay(question);
        }

    }


    callbackTimerRanOut() {
        this.setState({quizState:2});
        let score = 0;

    }

    callbackQuestionsFinished(score) {
        this.setState({quizState:2});

    }

    callbackShowHighScores() {
        this.setState({quizState:3});
    }

    callbackShowOtherSection() {
        logger.log("Show the other section", 1);
        if (this.currentlyShowingQuiz) {
            /* user wants to see the high scores */
            logger.log("Showing highscores");
            this.resetDisplay(false);
            this.showHighScores();
        }
        else {
            logger.log("Show quiz");
            /* user wants to go back to the quiz */
            this.resetDisplay(true);
        }
    }

    callbackUpdateTimerDisplay(timeRemaining) {
        logger.log("Update timer display " + timeRemaining, 5);
        this.timerView.innerHTML = timeRemaining + " s";
    }

    callbackResetQuizDisplay() {
        logger.log("Resetting quiz display",1);
        /* show the base test and button to start the quiz */
        this.resetDisplay(true);
    }

    callbackProvideAnswerFeedback(isCorrect = false) {
        let spanTextView = this.answerFeedbackView.querySelector("span");
        spanTextView.innerText = (isCorrect)?"Previous answer was Correct":" Previous answer was Incorrect";
        /* get the feedback to appear */
        this.answerFeedbackView.style.display = "block";
    }


}




export default App;
