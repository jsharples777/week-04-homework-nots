import React from 'react';
import './css/App.css';
import Controller from "./Controller";
import logger from "./util/SimpleDebug";
import LinkToOtherSection from "./component/LinkToOtherSection";
import Timer from "./component/Timer";
import QuestionDisplay from "./component/QuestionDisplay";


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
    initialise() {
        /* setup the controller */
        this.controller = new Controller(this, window.localStorage);
        logger.log("Setting starting context");
        this.currentlyShowingQuiz = true;  // showing quiz, not the high scores
        this.startingTime = 100;
        this.timePenalty = 10;
        this.currentTime = this.startingTime;
        this.quizState = -1; //not started
        this.answerFeedback = "";
    }

    updateQuestionDisplay(question) {
        /* remove any existing question */
        this.setState({currentQuestion:question, quizState: this.quizState});
    }

    callbackQuizStarted() {
        // /* the timer has been started by the controller */
        this.quizState = 1; // record the current state - quiz started
        /* now display the first question */
        let question = this.controller.getNextQuestion();
        logger.log(question,2);
        this.updateQuestionDisplay(question);
    }


    callbackTimerRanOut() {
        logger.log("Timer ran out",1);
        this.quizState = 2;
        let score = 0;
        this.callbackQuestionsFinished(score);
    }

    callbackShowNextQuestion() {
        /* ask for the next question from the controller */
        let question = this.controller.getNextQuestion();
        /*
          do we have anymore questions?  if so, proceed to update the display,
          the controller will let us know if we are done with a different callback
        */

        if (question != null) {
            let answerFeedbackTimeOut = -1; // no timeout
            this.updateQuestionDisplay(question,answerFeedbackTimeOut);
        }

    }

    callbackQuestionsFinished(score = 0) {
        logger.log("Quiz Finished - no further questions", 1);
        this.quizState = 2;
        this.score = score;
        let answerFeedbackTimeOut = 2000;
        /* clear the question display */
        this.updateQuestionDisplay(null, answerFeedbackTimeOut);
        /* let the controller manage the user submission of a user added highscore */
    }

    /* private */ resetDisplay(showQuiz = true) {
        this.currentlyShowingQuiz = showQuiz;
        this.currentTime = this.startingTime;
        this.quizState = -1; // no quiz started
        this.setState({currentQuestion: null, highScores: [], quizState: this.quizState});
    }

    /* private */ showHighScores() {
        let highScores = this.controller.getHighScores();
        this.setState({currentQuestion: null,highScores:highScores,quizState:this.quizState})
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
        /* This is a naughty method that is bypassing the usual REACT rendering for performance
          accessing the timer element directly.  We are trying to avoid the page re-rendering for each
          timer countdown, but need to store the time remaining for later re-render calls.
         */
        logger.log("Update timer display " + timeRemaining, 5);
        this.currentTime = timeRemaining;  // save what the timer should be showing for later re-render calls
        document.getElementById("timer").innerHTML = timeRemaining + " s";
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

    /* components are all setup, now we can render everything */
    componentDidMount() {
        logger.log("REACT component mounted - will initialise",1);
        this.initialise();

        /* set the debugging log */
        logger.setLevel(3);
        logger.setOn();
    }

    /* construct the view */
    render() {
        return (
            <div id="App" className="App">
                <header className="container-fluid">
                    <div className="row">
                        <LinkToOtherSection>View High Scores</LinkToOtherSection>
                        <h1 className="col-sm-8">Coding Quiz</h1>
                        <Timer>Time: {this.currentTIme}s</Timer>
                    </div>
                </header>
                <div id="root" className="container-fluid">
                    <div className="row">
                        <div id="content" className="content col-sm-12 container-fluid">
                            <div className="col">
                                <QuestionDisplay question={this.state.currentQuestion}>A series of coding questions about Javascript, please press Start Quiz to begin</QuestionDisplay>
                            </div>
                        </div>
                    </div>
                </div>
                <Timer/>
            </div>
        );
    }
}




export default App;
