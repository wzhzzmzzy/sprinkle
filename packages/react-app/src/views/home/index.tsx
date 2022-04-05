import {useState} from 'react'
import {Helmet} from 'react-helmet'
import { css } from '@emotion/react'

const style = css`
  color: hotpink;
`

function Home() {
  const [count, setCount] = useState(0)
  return (
    <div css={style}>
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