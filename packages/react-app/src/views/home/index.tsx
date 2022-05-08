import {Helmet} from 'react-helmet-async'
import Counter from '@/views/home/test'

// import TinyExcel from '@/components/tiny-excel'

function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Counter />
    </>
  )
}

export default Home
