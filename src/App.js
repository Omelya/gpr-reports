import Header from "./container/Header";
import Footer from "./container/Footer";
import { Outlet } from "react-router-dom";
import './index.css';

function App() {
  return (
      <div className='flex flex-col h-screen'>
          <Header/>
          <div className='flex-grow'>
              <Outlet/>
          </div>
          <Footer/>
      </div>
  );
}

export default App;
