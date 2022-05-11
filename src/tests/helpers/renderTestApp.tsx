import { ReactNode } from 'react'
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Provider } from 'react-redux'
import { AppRouter } from "@/router/AppRouter"
import { store } from '@/store'

interface TestAppOptions {
  route?: string
  showRoutes?: boolean
}

export const renderTestApp = (component: ReactNode, options?: TestAppOptions) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[options?.route ?? '']}>
        {options?.showRoutes && <AppRouter />}
        {component}
      </MemoryRouter>
    </Provider>
  )
}