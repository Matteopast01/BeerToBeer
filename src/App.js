import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {PrivateRoute} from "./components/PrivateRoute";
import Homepage from "./pages/Homepage.js";
import Search from "./pages/Search";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={< Homepage />}/>
                <Route path="/search" element={<Search/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

//<PrivateRoute path="/search" component={Search} />
//<Route path="/search" element={<PrivateRoute component={<Search/>} />}/>
