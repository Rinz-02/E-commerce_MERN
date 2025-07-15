import { Button,Box,Center,Spinner } from "@chakra-ui/react"
import { Route,Routes } from "react-router-dom"
import NavBar from "./component/NavBar"
import HomePage from "./page/HomePage"
import CreatePage from "./page/CreatePage"
import ProtectedRoute from "./context/ProtectedRoute"
import Login from "./page/Login"
import Register from "./page/Register"
import AdminPage from "./page/Adminpage"
import { useContext } from "react"
import { authContext } from "./context/AuthProvider"
import CheckOutPage from "./page/CheckOutPage"

function App() {
  const { loading } = useContext(authContext);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return (
   <>
   <Box minH={'100vh'}>
    <NavBar/>
     <Routes>
       <Route path="/" element={<HomePage/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/register' element={<Register/>}/>

        <Route path="/admin" element={
        <ProtectedRoute roles={['admin']}>
         <AdminPage/>
        </ProtectedRoute>
       }/>
         <Route path="/create" element={
        <ProtectedRoute roles={['admin']}>
         <CreatePage/>
        </ProtectedRoute>
       }/>
       <Route path="/checkout" element={
        <ProtectedRoute roles={['user']}>
         <CheckOutPage/>
        </ProtectedRoute>
       }/>
     </Routes>
   </Box>
   </>
  )
}

export default App
