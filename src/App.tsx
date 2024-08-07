import { useLocation } from "react-router-dom";
import './App.css';
import SideBar from './Components/SideBar';
import AllRoutes from './Pages/AllRoutes';

function App() {
  // Get the current location object which contains information about the URL
  const location = useLocation();
  // Extract the pathname from the location object to determine the current route
  const currentRoute = location.pathname;

  return (
    <div className="App">
      {/* Header section */}
      <h1 className='z-50 w-full fixed shadow-sm shadow-slate-700 top-0 text-2xl text-yellow-100 bg-indigo-300 font-bold p-4'>
        {
          // Conditional rendering of the header text based on the current route
          currentRoute === "/" ? 'Contact Page' : 
          currentRoute === "/dashboard" ? "Charts and Maps" : 
          'Contact Page'
        }
      </h1>
      <div className='flex w-full'>
        {/* Sidebar section */}
        <div className='sticky top-0 h-screen'>
          <SideBar />
        </div>
        {/* Main content section */}
        <div className='w-full pt-16'>
          <AllRoutes />
        </div>
      </div>
    </div>
  );
}

export default App;
