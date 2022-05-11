import { render } from 'react-dom'
import { MainProvider } from './components/MainProvider'
import { App } from './components'
import './styles/global.scss'

render(
  <MainProvider>
    <App />
  </MainProvider>,
  document.getElementById('root')
)