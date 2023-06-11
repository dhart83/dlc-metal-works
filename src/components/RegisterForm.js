import React, { useState } from 'react'
import styled from 'styled-components'

import FirebaseAuthService from '../firebase/FirebaseAuthService'

const RegisterForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            await FirebaseAuthService.registerUser(username, password)
            setUsername('')
            setPassword('')
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <Styled_Register_Form>
            <form onSubmit={handleRegister}>
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
                    <button>Create Admin</button>
                </div>
            </form>
        </Styled_Register_Form>
    )
}

const Styled_Register_Form = styled.div`
    max-width: 16rem;
    margin-inline: auto;

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

export default RegisterForm
