import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import FirebaseFirestoreService from '../firebase/FirebaseFirestoreService'
import ImageUploadPreview from './ImageUploadPreview'

const AddJobForm = () => {
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [featuredUrl, setFeaturedUrl] = useState([])
    const [galleryUrls, setGalleryUrls] = useState([])
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [title, setTitle] = useState('')
    const [type, setType] = useState('roofing')

    const [didSubmit, setDidSubmit] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSuccessPrompt = () => {
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        }, 2000)
    }

    const handleAddJob = async (e) => {
        e.preventDefault()

        // console.log('date: ', date)
        // console.log('description: ', description)
        // console.log('featuredUrl: ', featuredUrl)
        // console.log('galleryUrls: ', galleryUrls)
        // console.log('city: ', city)
        // console.log('state: ', state)
        // console.log('title: ', title)
        // console.log('type: ', type)

        const newJobData = {
            date: date,
            description: description,
            featuredUrl: featuredUrl[0],
            galleryUrls: galleryUrls,
            city: city,
            state: state,
            title: title,
            type: type
        }

        try {
            await FirebaseFirestoreService.createDocument(
                newJobData.type,
                newJobData
            )

            setDate('')
            setDescription('')
            setFeaturedUrl([])
            setGalleryUrls([])
            setCity('')
            setState('')
            setTitle('')
            setType('roofing')

            setDidSubmit(true)
            setSuccess(true)
            handleSuccessPrompt()
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <Styled_Add_Job_Form>
            <form onSubmit={handleAddJob}>
                <fieldset style={{ margin: '1rem 0' }}>
                    <legend>Select type of service:</legend>
                    <div className='checkbox-wrapper'>
                        <input
                            type='radio'
                            id='roofing'
                            checked={type === 'roofing'}
                            onChange={() => setType('roofing')}
                        />
                        <label className='checkbox-label' htmlFor='roofing'>
                            Roofing
                        </label>
                    </div>

                    <div className='checkbox-wrapper'>
                        <input
                            type='radio'
                            id='building'
                            checked={type === 'building'}
                            onChange={() => setType('building')}
                        />
                        <label className='checkbox-label' htmlFor='building'>
                            Building
                        </label>
                    </div>

                    <div className='checkbox-wrapper'>
                        <input
                            type='radio'
                            id='repair'
                            checked={type === 'repair'}
                            onChange={() => setType('repair')}
                        />
                        <label className='checkbox-label' htmlFor='repair'>
                            Repair
                        </label>
                    </div>
                </fieldset>

                <label>
                    Date
                    <input
                        type='date'
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>
                <label>
                    City
                    <input
                        type='text'
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>
                <label>
                    State
                    <input
                        type='text'
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </label>
                <label>
                    Job Title
                    <input
                        type='text'
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label>
                    Description
                    <textarea
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        cols='30'
                        rows='10'
                    ></textarea>
                </label>
                <label htmlFor='featured-image-input'>Featured Image</label>
                <ImageUploadPreview
                    id='featured-image-input'
                    basePath='featuredImage'
                    multiUpload={false}
                    didSubmit={didSubmit}
                    setDidSubmit={setDidSubmit}
                    setUrlCallback={setFeaturedUrl}
                />

                <label htmlFor='gallery-image-input'>Gallery Images</label>
                <ImageUploadPreview
                    id='gallery-image-input'
                    basePath='galleryImages'
                    multiUpload={true}
                    didSubmit={didSubmit}
                    setDidSubmit={setDidSubmit}
                    setUrlCallback={setGalleryUrls}
                />

                <div>
                    <button>Add New Job</button>
                </div>
                <div>
                    <p className={`success-prompt ${success ? 'show' : ''}`}>
                        Successfully Added New Job
                    </p>
                </div>
            </form>
        </Styled_Add_Job_Form>
    )
}

const Styled_Add_Job_Form = styled.div`
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

    .checkbox-wrapper {
        display: flex;
        align-items: center;
        /* justify-content: center; */
    }

    .checkbox-label {
        margin: 0 0 0 1rem;
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
