import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {PrivateRoute} from "./components/PrivateRoute";
import Homepage from "./pages/Homepage.js";
import Search from "./pages/Search";
import OurPubs from "./pages/OurPubs";
import {Login} from "./pages/Login"
import {Signup} from "./pages/Signup"
import Profile from "./pages/Profile";
import { Provider } from 'react-redux';
import store from "./store/App";

function App() {
    return (
        <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={< Homepage />}/>
                <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={< Profile />}/>
                </Route>
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/search" element={<Search/>} />
                <Route path="/ourpubs" element={<OurPubs/>} />
            </Routes>
        </BrowserRouter>
        </Provider>
    );
}

export default App;
