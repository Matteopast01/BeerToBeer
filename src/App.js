import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {PrivateRoute} from "./components/PrivateRoute";
import Homepage from "./pages/Homepage.js";
import Search from "./pages/Search";
import Login from "./pages/Login"
import Profilepage from "./pages/Profilepage"
import Signup from "./pages/Signup"


function App() {
    return (
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
    );
}

export default App;
