import { render } from '@testing-library/react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'

export const renderWithRedux = (component: ReactNode) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  )
}