import { createRoot } from 'react-dom/client'
import App from "./components/App";
import './index.css'

window.Buffer = window.Buffer || require("buffer").Buffer;

const contianer = document.getElementById('root')
const root = createRoot(contianer)
root.render(<App />)