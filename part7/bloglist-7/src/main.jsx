import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import { NotificationContextProvider } from './contexts/NotificationContext'
import { BlogsContextProvider } from './contexts/BlogsContext'
import { UsersContextProvider } from './contexts/UsersContext'
import './index.css'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <BlogsContextProvider>
        <UsersContextProvider>
          <Router>
            <App />
          </Router>
        </UsersContextProvider>
      </BlogsContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
)
