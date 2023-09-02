import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css'
import Image from 'next/image';
import { useQuizContext } from './components/QuizContext';
export default function Home() {
  const { showResult, setShowResult} = useQuizContext()

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Email validation using regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email || !email.match(emailRegex)) {
      setError('Please enter a valid email address');
      return;
    }

    // Valid email, navigate to new page
      router.push('/question');
  };


  return (
    <div className={styles.welcomeContainer}>
      <Image src="https://www.joshtalks.com/wp-content/themes/josh_talks/img/josh-logo.svg" width={300} height={200} />

      <form className={styles.emailForm} onSubmit={handleSubmit}>
        <h1 className={styles.welcomeHeading}>Welcome to <b style={{ color: "#2385c7" }}>Josh</b> <b style={{ color: "#f4792a" }}>Talks</b> Quiz</h1>
          <input className={styles.input} placeholder='Please enter your email' value={email} onChange={handleEmailChange} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className={styles.emailButton} type="submit">Submit</button>
      </form>
    </div>
  );
}
