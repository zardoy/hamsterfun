import { RouterProvider, createBrowserRouter, redirect, useLocation } from 'react-router-dom'
import RouterView from './RouterView'
import ErrorPageProviderRouter from './ErrorPageProviderRouter'
import Dashboard from './pages/Dashboard'
import TokenPage from './pages/TokenPage'
import TradingHistoryChart from './TokenChart'
import FuturisticGridBackground from './Background'
import {} from '@ton/core'
import TokenPageNew from './pages/TokenPageNew'
import CreateTokenForm from './pages/CreateCoin'

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
                Component: TokenPageNew,
            },
            {
                path: '/create',
                Component: CreateTokenForm,
            },
            {
                path: '/chart',
                Component: TradingHistoryChart,
            },
            {
                path: '/bg',
                Component: FuturisticGridBackground,
            },
        ],
    },
])
