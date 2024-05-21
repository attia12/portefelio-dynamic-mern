import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect, useCallback } from "react";
import Loader from "./components/Loader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ReloadData, hideLoading, setPortfolioData, showLoading } from "./redux/rootSlice";
import Admin from "./pages/Admin";
import Login from "./pages/Admin/Login";


function App() {
  const { loading, portfolioData,reloadData } = useSelector((state) => state.root);

  const dispatch = useDispatch();
  
  const getPortfolioData = useCallback(async () => {
    try {
      dispatch(showLoading());

      const response = await axios.get('https://portefelio-dynamic-mern.onrender.com/api/portofolio/get-portfolio-data');
     
      dispatch(setPortfolioData(response.data));
      dispatch(ReloadData(false))
       dispatch(hideLoading());

    } catch (error) {
      dispatch(hideLoading());
    }
  }, []);

  useEffect(() => {
    if (!portfolioData) {
      getPortfolioData();
    }
  }, [portfolioData]);
  useEffect(()=>{
    if(reloadData)
      {
        getPortfolioData();
      }

  },[reloadData])

  return (
    <BrowserRouter>
      {loading ? <Loader/> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
