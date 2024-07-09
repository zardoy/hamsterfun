import { RouterProvider, createBrowserRouter, redirect, useLocation } from 'react-router-dom'
import RouterView from './RouterView'
import ErrorPageProviderRouter from './ErrorPageProviderRouter'
import Dashboard from './pages/Dashboard'
import TokenPage from './pages/TokenPage'
import TradingHistoryChart from './TokenChart'

export const mainRouter = createBrowserRouter([
    {
        path: '/',
        Component: RouterView,
        ErrorBoundary: ErrorPageProviderRouter,
        children: [
            {
                path: '/',
                Component: Dashboard,
            },
            {
                path: '/token/:tokenId',
                Component: TokenPage,
            },
            {
                path: '/chart',
                Component: TradingHistoryChart,
            },
        ],
    },
])
