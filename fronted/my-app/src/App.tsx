import {RouterProvider} from 'react-router'
import router from './route/index'
function App() {
    return(
      <div className='app'>
        <RouterProvider router={router}></RouterProvider>
      </div>
    )
}

export default App
