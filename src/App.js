import Header from "./container/Header";
import Footer from "./container/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import './index.css';

function App() {
  return (
      <div className='flex flex-col h-screen'>
          <Header/>
          <div className='flex-grow'>
              <Toaster
                  position="top-left"
                  reverseOrder={false}
              />
              <Outlet/>
          </div>
          <Footer/>
      </div>
  );
}

export default App;
