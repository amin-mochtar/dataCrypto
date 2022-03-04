import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import CoinList from './pages/coinList';
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CoinList/>} />
      </Routes>
    </Router>
  )
}

export default App;
