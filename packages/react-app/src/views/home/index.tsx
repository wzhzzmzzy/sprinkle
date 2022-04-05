import {useState} from "react";
import {Helmet} from "react-helmet";
import HomeStyle from './index.module.css';

function Home() {
  const [count, setCount] = useState(0)
  return (
    <div className={HomeStyle.Home}>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <h1>React SSR</h1>
      {count}
      <button onClick={() => setCount(v => v+1)}>+1</button>
    </div>
  )
}

export default Home