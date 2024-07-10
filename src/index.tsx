/// <reference types="vite/client" />
import { renderToDom } from '@zardoy/react-util'
import App from './App'
import 'tailwindcss/tailwind.css'
import './main.css'

renderToDom(<App />)
