import { AppRouter } from "@/router/AppRouter"
import { render } from "@testing-library/react"
import { ReactNode } from "react"
import { MemoryRouter } from "react-router-dom"

export const renderWithRouter = (component: ReactNode, initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AppRouter />
      {component}
    </MemoryRouter>
  )
}