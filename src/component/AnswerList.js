 import React from "react";
 import Answer from './Answer';

 export default function AnswerList(props)  {
     let answers = props.answers;
     if (answers === undefined) {
         answers = [];
     }
     let handler = props.handler;
     return (
         <div id="answerList" className="answerList" onClick={handler}>
           <ul id="answers">
             {answers.map((answer,index) => <Answer key={index} iscorrect={answer.isCorrect+""} >{answer.answer}</Answer>)}
           </ul>
         </div>
     );
 }