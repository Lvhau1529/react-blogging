import ReactDOM from "react-dom/client"
import { ThemeProvider } from "styled-components"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { theme } from "./utils/constants"
import App from "./App.jsx"
import "./styles/index.scss"
import "react-toastify/dist/ReactToastify.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
      <ToastContainer></ToastContainer>
    </BrowserRouter>
  </ThemeProvider>
)
