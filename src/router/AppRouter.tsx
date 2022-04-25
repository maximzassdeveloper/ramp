import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import { routes } from '.'

export const AppRouter: FC = () => {
  return (
    <Switch>
      {routes.map(route => 
        <Route 
          key={route.path}
          path={route.path}
          exact
          component={route.component} 
        />
      )}
    </Switch>
  )
}