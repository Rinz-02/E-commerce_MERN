import { Button,Box } from "@chakra-ui/react"
import { Route,Routes } from "react-router-dom"
import NavBar from "./component/NavBar"
import HomePage from "./page/HomePage"
import CreatePage from "./page/CreatePage"
function App() {
 

  return (
   <>
   <Box minH={'100vh'}>
    <NavBar/>
     <Routes>
       <Route path="/" element={<HomePage/>}/>
       <Route path="/create" element={<CreatePage/>}/>
     </Routes>
   </Box>
   </>
  )
}

export default App
