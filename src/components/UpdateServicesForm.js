import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import FirebaseFirestoreService from '../firebase/FirebaseFirestoreService'

const UpdateServicesForm = () => {
    const [type, setType] = useState('roofing')
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [existingData, setExistingData] = useState([])
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        // console.log(existingData.findIndex((item) => item.type === 'building'))
        // handleCheckboxChange(type)
    }, [existingData])

    const fetchData = async () => {
        setExistingData([])
        const queryParams = {
            collection: 'services',
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
            response.docs.map((doc) => {
                const newDoc = doc.data()
                newDoc.id = doc.id
                setExistingData((existingData) => [...existingData, newDoc])
                if (newDoc.type === type) {
                    setId(newDoc.id)
                    setTitle(newDoc.title)
                    setDescription(newDoc.description)
                }
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const handleCheckboxChange = (type) => {
        setType(type)
        setId(
            existingData[existingData.findIndex((item) => item.type === type)]
                .id
        )
        setTitle(
            existingData[existingData.findIndex((item) => item.type === type)]
                .title
        )
        setDescription(
            existingData[existingData.findIndex((item) => item.type === type)]
                .description
        )
    }

    const handleSuccessPrompt = () => {
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        }, 2000)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        const newDoc = {
            type: type,
            title: title,
            description: description
        }
        try {
            await FirebaseFirestoreService.updateDocument(
                'services',
                id,
                newDoc
            )
            setTitle('')
            setDescription('')
            handleSuccessPrompt()
            fetchData()
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <Styled_Update_Services_Form>
            <form onSubmit={handleUpdate}>
                <fieldset style={{ margin: '1rem 0' }}>
                    <legend>Select type of service:</legend>
                    <div className='checkbox-wrapper'>
                        <input
                            type='radio'
                            id='usf-roofing'
                            checked={type === 'roofing'}
                            onChange={() => handleCheckboxChange('roofing')}
                        />
                        <label className='checkbox-label' htmlFor='usf-roofing'>
                            Roofing
                        </label>
                    </div>

                    <div className='checkbox-wrapper'>
                        <input
                            type='radio'
                            id='usf-building'
                            checked={type === 'building'}
                            onChange={() => handleCheckboxChange('building')}
                        />
                        <label
                            className='checkbox-label'
                            htmlFor='usf-building'
                        >
                            Building
                        </label>
                    </div>

                    <div className='checkbox-wrapper'>
                        <input
                            type='radio'
                            id='usf-repair'
                            checked={type === 'repair'}
                            onChange={() => handleCheckboxChange('repair')}
                        />
                        <label className='checkbox-label' htmlFor='usf-repair'>
                            Repair
                        </label>
                    </div>
                </fieldset>
                <label htmlFor='title'>
                    Title
                    <input
                        id='title'
                        type='text'
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>

                <label>
                    Description
                    <textarea
                        type='text'
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        cols='30'
                        rows='10'
                    />
                </label>
                <div>
                    <button>Update Selected Service</button>
                </div>
                <div>
                    <p className={`success-prompt ${success ? 'show' : ''}`}>
                        Successfully Updated Service
                    </p>
                </div>
            </form>
        </Styled_Update_Services_Form>
    )
}

const Styled_Update_Services_Form = styled.div`
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

export default UpdateServicesForm
