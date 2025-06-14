import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import SpinnerFullPage from './components/Spinner/SpinnerFullPage'

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import Authorization from "./pages/Authorization";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";

// 168.92 kB  build\static\js\main.30694665.js
// 5.18 kB    build\static\css\main.07236760.css


import CityList from "./components/CityList/CityList";
import CountryList from "./components/CountryList/CountryList";
import City from "./components/City/City";
import Form from "./components/Form/Form";
import { CitiesProvider } from "./contexts/CitiesContext/CitiesContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from './pages/ProtectedRoute'
import Login from "./components/Authorization/Login/Login";
import Register from "./components/Authorization/Register/Register";

const Homepage = lazy ( () => import("./pages/Homepage") )
const Product = lazy ( () => import("./pages/Product") )
const Pricing = lazy ( () => import("./pages/Pricing") )
const AppLayout = lazy ( () => import("./pages/AppLayout") )
const PageNotFound = lazy ( () => import("./pages/PageNotFound") )

function App () {


    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Suspense fallback={ <SpinnerFullPage/> }>
                        <Routes>
                            <Route index element={ <Homepage/> }/>
                            <Route path="product" element={ <Product/> }/>
                            <Route path="pricing" element={ <Pricing/> }/>
                            <Route path="login" element={ <Login/> }/>
                            <Route path="register" element={ <Register/> }/>
                            <Route path="app" element={
                                <ProtectedRoute>
                                    <AppLayout/>
                                </ProtectedRoute> }
                            >
                                <Route index element={ <Navigate replace to="cities"/> }/>
                                <Route path='cities' element={ <CityList/> }/>
                                <Route path="cities/:id" element={ <City/> }/>
                                <Route path='countries' element={ <CountryList/> }/>
                                <Route path='form' element={ <Form/> }/>
                            </Route>
                            <Route path="*" element={ <PageNotFound/> }/>
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    )
        ;
}

export default App;
