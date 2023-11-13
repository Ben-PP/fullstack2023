import { Routes, Route, Link } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'

const App = () => {
  return (
    <div>
      <div>
        <Link to="/">Authors</Link>
        <Link to="/books">Books</Link>
      </div>
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </div>
  )
}

export default App
