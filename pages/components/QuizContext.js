import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchquizData } from '../../store/slices/quizslice';
import he from 'he'
// Create a context for your quiz-related states
const QuizContext = createContext();

// Create a custom hook to access the QuizContext
export const useQuizContext = () => {
  return useContext(QuizContext);
};

// Create a context provider component
export const QuizContextProvider = ({ children }) => {

  // Define your quiz-related states here
  const dispatch = useDispatch();
  const quizData = useSelector((state) => state.quiz.quiz.results);
  const [visited, setIsVisited] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [isAttempted, setIsAttempted] = useState(0);
  const [yourAnswer, setYourAnswer] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [loading, setLoading] = useState(true)
  const [submittedAnswers, setSubmittedAnswers] = useState([])
  const [submittedQuestion, setSubmitteQuestion] = useState([])
  const [submittedCorrectAnswer, setSubmitteCorrectAnswer] = useState([{}])
  const [reportData, setReportData] = useState([{
    submittedAnswers:"",
    submittedQuestion:'',
    submittedCorrectAnswer:"",

  }])
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  useEffect(() => {
    dispatch(fetchquizData())
      .then(() => setLoading(false)) // Set loading to false when data is available
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (loading) {
    return <div style={{width:"100%", height:"100vh", display:'flex', justifyContent:"center", alignItems:'center'}}>
      <p style={{fontSize:"32px"}}>Loading...</p>
    </div>
  }

  const newQuizData = quizData?.map((quizItem) => {
    // Concatenate the incorrect_answers and correct_answer arrays
    const concatAnswers = [...quizItem.incorrect_answers, quizItem.correct_answer];
    const decodedQuestion = he.decode(quizItem.question);
    const correctAnswerDecode = he.decode(quizItem.correct_answer);
    const answerOptions = concatAnswers.map((answer) => (
      he.decode(answer)
    ))

    return {
      ...quizItem,
      answerOptions,
      decodedQuestion,
      correctAnswerDecode,
    };
  });

  return (
    <QuizContext.Provider value={{submittedCorrectAnswer, setSubmitteCorrectAnswer, submittedQuestion, setSubmitteQuestion, reportData, setReportData, quizData, newQuizData, visited, setIsVisited, submittedAnswers, setSubmittedAnswers, correctAnswer, setCorrectAnswer, yourAnswer, setYourAnswer, showResult, setShowResult, result, setResult, isAttempted, setIsAttempted }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
