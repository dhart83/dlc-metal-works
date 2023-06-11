import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import FirebaseFirestoreService from '../firebase/FirebaseFirestoreService'
import FirebaseStorageService from '../firebase/FirebaseStorageService'
import ImageUploadPreview from './ImageUploadPreview'

const UpdateContactForm = () => {
    const [id, setId] = useState(null)
    const [title, setTitle] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [subTitle, setSubTitle] = useState('')
    const [newImageUrl, setNewImageUrl] = useState([])
    const [existingImageUrl, setExistingImageUrl] = useState('')

    const [didSubmit, setDidSubmit] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        fetchContactData()
    }, [])

    useEffect(() => {
        console.log(existingImageUrl)
    }, [existingImageUrl])

    const fetchContactData = async () => {
        const queryParams = {
            collection: 'contact',
            queries: null,
            orderByField: null,
            orderByDirection: null,
            perPage: null,
            cursorId: null
        }
        try {
            const response = await FirebaseFirestoreService.readDocuments(
                queryParams
            )
            const contact = response.docs[0]
            setId(contact.id)
            setTitle(contact.data().title)
            setEmail(contact.data().email)
            setPhone(contact.data().phone)
            setSubTitle(contact.data().subTitle)
            setExistingImageUrl(contact.data().imageUrl)
        } catch (error) {
            alert(error.message)
        }
    }

    const handleSuccessPrompt = () => {
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        }, 2000)
    }

    const handleContactUpdate = async (e) => {
        e.preventDefault()

        let url = existingImageUrl
        if (newImageUrl[0]) {
            url = newImageUrl[0]
        }

        const newContactData = {
            title: title,
            subTitle: subTitle,
            email: email,
            phone: phone,
            imageUrl: url
        }

        try {
            await FirebaseFirestoreService.updateDocument(
                'contact',
                id,
                newContactData
            )
            if (!newImageUrl) {
                await FirebaseStorageService.deleteFile(existingImageUrl)
            }
            setDidSubmit(true)
            fetchContactData()
            setNewImageUrl([])
            handleSuccessPrompt()
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <Styled_Update_Contact_Form>
            <form onSubmit={handleContactUpdate}>
                <label>
                    Title
                    <input
                        type='text'
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    Sub Title
                    <textarea
                        required
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                        cols='15'
                        rows='5'
                    />
                </label>
                <label>
                    Email
                    <input
                        type='email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    Phone
                    <input
                        type='text'
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </label>
                <label htmlFor='contact-image'>Contact Image</label>
                <ImageUploadPreview
                    id='contact-image'
                    basePath='contactImage'
                    multiUpload={false}
                    setUrlCallback={setNewImageUrl}
                    didSubmit={didSubmit}
                    setDidSubmit={setDidSubmit}
                />
                <div style={{ marginTop: '1rem' }}>
                    <button>Update Contact</button>
                </div>
                <div>
                    <p className={`success-prompt ${success ? 'show' : ''}`}>
                        Successfully Updated Contact
                    </p>
                </div>
            </form>
        </Styled_Update_Contact_Form>
    )
}

const Styled_Update_Contact_Form = styled.div`
    max-width: 16rem;
    margin-inline: auto;

    .success-prompt {
        color: green;
        opacity: 0;
        transition: opacity 150ms ease;
    }

    .success-prompt.show {
        opacity: 1;
    }

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
`

export default UpdateContactForm
