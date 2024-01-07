import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {PrivateRoute} from "./components/PrivateRoute";
import Homepage from "./pages/Homepage.js";
import Search from "./pages/Search";
import Login from "./pages/Login"
import Profilepage from "./pages/Profilepage"
import Signup from "./pages/Signup"

import { Provider } from 'react-redux';
import store from "./store/searchStore";



function App() {
    return (
        <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={< Homepage />}/>
                <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={< Profilepage />}/>
                </Route>
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/search" element={<Search/>} />
            </Routes>
        </BrowserRouter>
        </Provider>
    );
}

export default App;
