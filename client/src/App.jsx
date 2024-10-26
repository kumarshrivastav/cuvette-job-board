import {BrowserRouter,Routes,Route} from "react-router-dom"
import SignUp from "./pages/SignUp"
import SheduledInterview from "./pages/SheduledInterview"
import JobPost from "./pages/JobPost"
import ProtectedRoute from "./components/ProtectedRoute"
import Structure from "./components/Structure"
function App() {

  return (
    <Routes>
      <Route path="/" element={<SignUp/>}/>

      <Route element={<ProtectedRoute/>}>
        <Route path="/interview" element={<Structure><SheduledInterview/></Structure>}/>
        <Route path="/jobposting" element={<Structure><JobPost/></Structure>}/>
      </Route>
    </Routes>
  )
}

export default App
