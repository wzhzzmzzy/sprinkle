import {Suspense, useEffect, useState} from 'react'

function cacheFetch(fetchFn: () => Promise<string>): () => string | null {
  let ref: string | null = null
  let done = false
  return () => {
    if (done) {
      return ref
    }
    throw fetchFn().then(res => {
      ref = res
      done = true
    })
  }
}

const fetchSomething = cacheFetch(() => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Hello')
    }, 1000)
  })
})

function Sub () {
  const data = fetchSomething()

  return (
    <div>Sub, {data}</div>
  )
}

export default function Counter () {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
  }, [])

  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <Sub />
      </Suspense>
      <div>count is {count}</div>
    </>
  )
}
