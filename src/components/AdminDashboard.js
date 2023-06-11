import React from 'react'
import styled from 'styled-components'
import AddJobForm from './AddJobForm'
import RegisterForm from './RegisterForm'
import UpdateHeroForm from './UpdateHeroForm'
import UpdateServicesForm from './UpdateServicesForm'
import UpdateContactForm from './UpdateContactForm'

import FirebaseAuthService from '../firebase/FirebaseAuthService'

const AdminDashboard = ({ currentUser }) => {
    const handleLogout = () => {
        FirebaseAuthService.logoutUser()
    }
    return (
        <>
            <section>
                <div className='container'>
                    <h1>
                        Welcome to your Admin Dashboard
                        <br />
                        <span>{`${currentUser.email}`}</span>
                    </h1>
                    <button
                        style={{
                            backgroundColor: 'red',
                            width: '8rem',
                            display: 'block',
                            marginInline: 'auto',
                            padding: '0.25rem 0'
                        }}
                        onClick={handleLogout}
                    >
                        Sign Out
                    </button>
                </div>
            </section>
            <section className='bg-dark'>
                <div className='container'>
                    <h2>Register a New Admin User</h2>
                    <RegisterForm />
                </div>
            </section>
            <section>
                <div className='container'>
                    <h2>Update Hero</h2>
                    <UpdateHeroForm />
                </div>
            </section>
            <section className='bg-dark'>
                <div className='container'>
                    <h2>Update Services</h2>
                    <UpdateServicesForm />
                </div>
            </section>
            <section>
                <div className='container'>
                    <h2>Update Contact</h2>
                    <UpdateContactForm />
                </div>
            </section>
            <section className='bg-dark'>
                <div className='container'>
                    <h2>Add a New Job</h2>
                    <AddJobForm />
                </div>
            </section>
        </>
    )
}

export default AdminDashboard
