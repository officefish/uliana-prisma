
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Providers from './providers'
import Cabinet from './layout/cabinet'

import useTelegramWebApp from '@/hooks/useTelegramApp'
//import useIntroCustomize from './hooks/useIntroCustomize'

import '@/types/telegram-webapp.d.ts'
import useLocalizeDocumentAttributes from './i18n/useLocalizeDocumentAttributes'

function App() {

  useTelegramWebApp()
  useLocalizeDocumentAttributes()

  //useIntroCustomize()

  return (
    <Providers>
    <BrowserRouter future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      <Cabinet />
    </BrowserRouter>
  </Providers>
  )
}

export default App
