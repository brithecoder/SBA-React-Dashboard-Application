import './App.css'
import { ThemeProvider } from './utils/Theme/ThemeContext'
import Dashboard from './components/Dashboard/Dashboard'

function App() {

  return (

    <div id="appContainer" className="App">

     <ThemeProvider>
      <Dashboard />
      </ThemeProvider>
       
      </div>
    
  )
}

export default App
