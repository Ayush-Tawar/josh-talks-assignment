import React, { useEffect, useState } from 'react'
import styles from '../../styles/Result.module.css'
import { useQuizContext } from '../components/QuizContext'
import he from 'he'

function Result() {
  const { quizData, newQuizData, result, submittedAnswers, } = useQuizContext()
  const [loading, setLoading] = useState(true)

  const quizDataMapped = quizData?.map((dataItem, index) => ({
    question: dataItem.question,
    correctAnswer: dataItem.correct_answer,
    userAnswer: submittedAnswers[index] || '', // Ensure there is a user answer for each question
  }));

  return (
    <div className={styles.bodyWrapper}>
      <div className={styles.reportDetails}>
        <p className={styles.navDetail}>Correct answers :{result.correctAnswers}</p>
        <p className={styles.navDetail}>Wrong answers : {result.wrongAnswers}</p>
        <p className={styles.navDetail}>Total score :  {result.score}</p>
      </div>
      {/* <div className={styles.reportWrapper}>
        <div className={styles.questions}>
          Questions
          {newQuizData?.map((dataItem, index) => (
            <p key={index} className={styles.question}>{dataItem.decodedQuestion} </p>
          ))}
        </div>
        
        <div className={styles.answersWrapper}>
          <div>
            <b>Correct answer :</b>
            {newQuizData?.map((correctAns) => (
              <p className={styles.correctAnswer}>{correctAns.correctAnswerDecode}</p>
            ))}
          </div>
          <div>
            <b>Your Answers :</b>
            {submittedAnswers?.map((ans) => (
              <p className={styles.yourAnswer}> {ans}</p>
            ))}
          </div>
        </div>
      </div> */}
      <div className={styles.questions}>
        {quizDataMapped.map((item, index) => (
          <div className={styles.reportWrapper} key={index}>
            <p className={styles.question}>{item.question}</p>
            <p className={styles.correctAnswer}>Correct answer: {item.correctAnswer}</p>
            <p className={styles.yourAnswer}>Your answer: {item.userAnswer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Result