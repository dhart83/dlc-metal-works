import React, { useState } from 'react'
import styled from 'styled-components'

import FirebaseAuthService from '../firebase/FirebaseAuthService'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            await FirebaseAuthService.loginUser(username, password)
            // await FirebaseAuthService.registerUser(username, password)
            setUsername('')
            setPassword('')
        } catch (error) {
            alert(error.message)
        }
    }

    const handlePasswordReset = async () => {
        try {
            if (!username) {
                alert('Please provide email address')
            } else {
                await FirebaseAuthService.sendPasswordResetEmail(username)
                alert(`Password reset sent to ${username}`)
            }
        } catch (error) {
            alert(error.message)
            throw error
        }
    }

    return (
        <Styled_Login_Form>
            <form onSubmit={handleLogin}>
                <label>
                    Email
                    <input
                        type='email'
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Password
                    <input
                        type='password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <div>
                    <button>Log In</button>
                </div>
            </form>
            <p onClick={handlePasswordReset}>Reset password</p>
        </Styled_Login_Form>
    )
}

const Styled_Login_Form = styled.div`
    max-width: 16rem;

    form {
        display: flex;
        flex-direction: column;
    }

    label {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
    }

    button {
        width: 100%;
        margin: 0 0 0.25rem 0;
        padding: 0.25rem 0;
    }

    p {
        color: red;
        opacity: 0.7;
        cursor: pointer;
        transition: all 300ms ease;
    }

    p:hover {
        color: #333333;
        opacity: 1;
    }
`

export default LoginForm
