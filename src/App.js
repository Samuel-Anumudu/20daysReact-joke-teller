import { useSpeechSynthesis } from 'react-speech-kit'
import { useState, useEffect } from 'react'
import './styles.css'

function App() {
  const [jokes, setJokes] = useState('')
  const { speak } = useSpeechSynthesis()

  async function getJokes() {
    let joke = ''
    try {
      const response = await fetch(
        'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist'
      )
      const data = await response.json()
      if (data.setup) {
        joke = `${data.setup} ... ${data.delivery}`
      } else {
        joke = data.joke
      }
      return joke
    } catch (error) {
      console.log('Fetch failed', error)
    }
  }

  useEffect(() => {
    const playJoke = async () => {
      const jokesFromServer = await getJokes()
      setJokes(jokesFromServer)
    }
    playJoke()
  })

  return (
    <div className="container">
      <button id="button" onClick={speak({ text: jokes })}>
        Tell Me A Joke
      </button>
    </div>
  )
}

export default App
