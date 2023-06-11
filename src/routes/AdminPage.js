import React, { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import AdminDashboard from '../components/AdminDashboard'
import LoginForm from '../components/LoginForm'
import FirebaseAuthService from '../firebase/FirebaseAuthService'
import firebase from '../firebase/FirebaseConfig'

const AdminPage = () => {
    const [user, setUser] = useState(null)
    // useEffect(() => {
    //     console.log(user)
    //     console.log(user?.email)
    // }, [user])

    FirebaseAuthService.subscribeToAuthChanges(setUser)

    return (
        <Styled_Admin_Page>
            {user ? (
                <AdminDashboard currentUser={user} />
            ) : (
                <section>
                    <div className='container'>
                        <div className='login-form-wrapper'>
                            <h1>Admin Login</h1>
                            <LoginForm />
                        </div>
                    </div>
                </section>
            )}
        </Styled_Admin_Page>
    )
}

const Styled_Admin_Page = styled.div`
    .login-form-wrapper {
        /* min-height: 80vh; */
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
`

export default AdminPage
