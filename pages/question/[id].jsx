
import { useRouter } from 'next/router';

const Question = () => {
  const router = useRouter();
  const { data, id } = router.query;

  // Use dataItem and index in your component

  return (
    <div key={id}>
      <h1>Questions Page</h1>
      <p>Data Item: {data}</p>
    </div>
  );
};

export default Question;
