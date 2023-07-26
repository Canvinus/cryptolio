import { BrowserRouter as Router } from 'react-router-dom'
import { Main } from './Main'

const App = () => {
  return (
    <>
      <Router basename={'/'}>
        <Main />
      </Router>
    </>
  )
}

export default App
