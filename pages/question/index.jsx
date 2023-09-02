import { useState } from 'react';
import styles from '../../styles/Home.module.css';
import Timer from '../components/timer';
import { useRouter } from 'next/router';
import { useQuizContext } from '../components/QuizContext';
import he from 'he'

export default function Questions() {
    const { newQuizData, visited, setIsVisited, submittedAnswers, setSubmittedAnswers, setCorrectAnswer, yourAnswer, setYourAnswer, result, setResult, isAttempted, setIsAttempted } = useQuizContext();

    const router = useRouter();
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [activeOption, setActiveOption] = useState(0);
    const [loading, setLoading] = useState(true);
    const [visitedIds, setVisitedIds] = useState([]);
    const [visitedOptions, setVisitedOptions] = useState([]);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [attemptedQuestions, setAttemptedQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [checked, setChecked] = useState(false);

    const { answerOptions, decodedQuestion, correctAnswerDecode, correct_answer } = newQuizData[activeQuestion]

    const handleViewQuestion = (data, id) => {
        setSelectedAnswerIndex(null);
        setActiveQuestion(id);
        // Check if the ID has not been visited before
        if (!visitedIds.includes(id)) {
            // Update the active question and increment the visited count
            setVisitedIds((prevIds) => [...prevIds, id]);
            setIsVisited((prevCount) => prevCount + 1);

            // setVisitedOptions([]);
        }
    };

    const handleSubmit = () => {
        router.push('/result')
    }

    const onAnswerSelected = (answer, idx) => {
        const decodedAnswer = he.decode(answer)
        setActiveOption(idx);
        if (!attemptedQuestions.includes(activeQuestion)) {
            setAttemptedQuestions((prevQuestions) => [
                ...prevQuestions,
                activeQuestion,
            ]);

            setIsAttempted((prev) => prev + 1);
      
            
            // setReportData([{submittedAnswers:answer, submittedCorrectAnswer:correctAnswerDecode, submittedQuestion:decodedQuestion}])
        }
        setSelectedAnswers((prevSelectedAnswers) => ({
            ...prevSelectedAnswers,
            [activeQuestion]: answer,
        }));
        setChecked(true);
        setSelectedAnswerIndex(idx);
        setYourAnswer(answer);
        setCorrectAnswer(correct_answer);
        setSubmittedAnswers([...submittedAnswers, decodedAnswer]);
        if (answer === correct_answer) {
            setSelectedAnswer(true);
        } else {
            setSelectedAnswer(false);
        }

        setResult((prev) =>
            selectedAnswer
                ? {
                    ...prev,
                    score: prev.score + 1,
                    correctAnswers: prev.correctAnswers + 1,

                }
                : {
                    ...prev,
                    wrongAnswers: prev.wrongAnswers + 1,
                }
        );

    };

    

    return (
        <div className={styles.bodywrapper}>

            <div className={styles.navbar}>
                <Timer />
                <div className={styles.navDetail}>Questions visited: {visited}</div>
                <div className={styles.navDetail}>Questions attempted: {isAttempted}</div>
                <div className={styles.navDetail}>Questions unvisited: {(newQuizData.length) - visited}</div>
                <button className={styles.submitButton} onClick={handleSubmit}>Submit</button>
            </div>

            <div className={styles.mainContainer}>
                <div className={styles.questionSection}>
                    Questions
                    {newQuizData?.map((dataItem, index) => (
                        <div
                            key={index}
                            className={`${styles.questionWrapper} ${index === activeQuestion ? styles.activeQuestion : visitedIds.includes(index) ? styles.visitedQuestion : ''}`}
                            onClick={() => handleViewQuestion(dataItem, index)}
                        >
                            <span>{index + 1}</span> <p className={styles.question}>{dataItem.decodedQuestion}</p>
                        </div>
                    ))}
                </div>
                <div className={styles.fullQuestionView}>

                    <div className={styles.selectedWrapper}>
                        <div>{activeQuestion + 1}</div>
                        <div className={styles.selectedQuestion}>{decodedQuestion}</div>
                    </div>
                    {answerOptions.map((answer, idx) => (
                        <p
                            className={
                                selectedAnswerIndex === idx ||
                                    selectedAnswers[activeQuestion] === answer
                                    ? styles.selectedOptions
                                    : styles.options
                            }
                            key={idx}
                            onClick={() => onAnswerSelected(answer, idx)}
                        >
                            {answer}
                        </p>
                    ))}
                </div>
            </div>

        </div>
    );
}
