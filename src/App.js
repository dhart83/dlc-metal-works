import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './routes/LandingPage'
import AdminPage from './routes/AdminPage'

const LandingPageContainer = () => {
    return (
        <>
            <Navbar />
            <LandingPage />
            <Footer />
        </>
    )
}

const App = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<LandingPageContainer />} />
                <Route path='/admin' element={<AdminPage />} />
            </Routes>
        </>
    )
}

export default App
