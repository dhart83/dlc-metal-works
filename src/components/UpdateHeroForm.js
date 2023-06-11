import { async } from '@firebase/util'
import React, { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'

import FirebaseFirestoreService from '../firebase/FirebaseFirestoreService'
import FirebaseStorageService from '../firebase/FirebaseStorageService'
import ImageUploadPreview from './ImageUploadPreview'

const AddJobForm = () => {
    const [id, setId] = useState(null)
    const [title, setTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')
    const [existingImageUrl, setExistingImageUrl] = useState('')
    const [newImageUrl, setNewImageUrl] = useState([])

    const [didSubmit, setDidSubmit] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        fetchHeroData()
    }, [])

    const fetchHeroData = async () => {
        const queryParams = {
            collection: 'hero',
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
            const hero = response.docs[0]
            setId(hero.id)
            setTitle(hero.data().title)
            setSubTitle(hero.data().subTitle)
            setExistingImageUrl(hero.data().imageUrl)
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

    const handleHeroUpdate = async (e) => {
        e.preventDefault()

        let url = existingImageUrl
        if (newImageUrl[0]) {
            url = newImageUrl[0]
        }

        const newHeroData = {
            title: title,
            subTitle: subTitle,
            imageUrl: url
        }

        try {
            await FirebaseFirestoreService.updateDocument(
                'hero',
                id,
                newHeroData
            )
            if (!newImageUrl) {
                await FirebaseStorageService.deleteFile(existingImageUrl)
            }
            setDidSubmit(true)
            fetchHeroData()
            setNewImageUrl([])
            handleSuccessPrompt()
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <Styled_Update_Hero_Form>
            <form onSubmit={handleHeroUpdate}>
                <label>
                    Title
                    <textarea
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        cols='15'
                        rows='5'
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
                <label htmlFor='hero-image'>Hero Image</label>
                <ImageUploadPreview
                    id='hero-image'
                    basePath='heroImage'
                    multiUpload={false}
                    setUrlCallback={setNewImageUrl}
                    didSubmit={didSubmit}
                    setDidSubmit={setDidSubmit}
                />
                <div style={{ marginTop: '1rem' }}>
                    <button>Update Hero</button>
                </div>
                <div>
                    <p className={`success-prompt ${success ? 'show' : ''}`}>
                        Successfully Updated Hero
                    </p>
                </div>
            </form>
        </Styled_Update_Hero_Form>
    )
}

const Styled_Update_Hero_Form = styled.div`
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

export default AddJobForm
