/// <reference types="react/experimental" />
/// <reference types="react-dom/experimental" />

import { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router'
import { HashRouter } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { StylesProvider } from '@material-ui/core/styles'
import { DialogRoutes } from './index'

const root = document.createElement('div')
document.body.insertBefore(root, document.body.children[0])
ReactDOM.unstable_createRoot(root).render(
    <StylesProvider injectFirst>
        <Suspense fallback="loading...">
            <Dialogs />
        </Suspense>
    </StylesProvider>,
)

const PermissionAwareRedirect = lazy(() => import('./PermissionAwareRedirect'))
function Dialogs() {
    return (
        <HashRouter>
            <Switch>
                <Route path={DialogRoutes.PermissionAwareRedirect} children={<PermissionAwareRedirect />} exact />
            </Switch>
        </HashRouter>
    )
}
