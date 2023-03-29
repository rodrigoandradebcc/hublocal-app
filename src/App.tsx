import { ChakraProvider } from "@chakra-ui/react";
import { ToastContainer } from 'react-toastify';
import { AppContext } from './contexts';
import Router from './routes';
import theme from './styles/GlobalStyles';

function App() {
  return (
      <ChakraProvider theme={theme}>
        <AppContext>
          <Router/>
        </AppContext>
        <ToastContainer />
      </ChakraProvider>
  )
}

export default App
