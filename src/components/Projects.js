import { async } from '@firebase/util'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import FirebaseFirestoreService from '../firebase/FirebaseFirestoreService'

const Projects = ({ work }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const queryParams = {
            collection: 'roofing',
            queries: null,
            orderByField: null,
            orderByDirection: null,
            perPage: null,
            cursorId: null
        }
        try {
            const roofing = await FirebaseFirestoreService.readDocuments(
                queryParams
            )
            queryParams.collection = 'building'
            const building = await FirebaseFirestoreService.readDocuments(
                queryParams
            )
            queryParams.collection = 'repair'
            const repair = await FirebaseFirestoreService.readDocuments(
                queryParams
            )

            roofing.docs.map((doc) => {
                const newData = doc.data()
                newData.id = doc.id
                setData((data) => [...data, newData])
            })

            building.docs.map((doc) => {
                const newData = doc.data()
                newData.id = doc.id
                setData((data) => [...data, newData])
            })

            repair.docs.map((doc) => {
                const newData = doc.data()
                newData.id = doc.id
                setData((data) => [...data, newData])
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const imageHandler = (e) => {
        const body = document.body
        const imageURL = e.target.src
        const imageEl = document.querySelector('.overlay__image')
        const overlay = document.querySelector('.overlay')

        body.style.overflow = 'hidden'
        overlay.classList.add('show')
        imageEl.src = imageURL
    }
    const overlayHandler = () => {
        const body = document.body
        const overlay = document.querySelector('.overlay')

        body.style.overflow = 'visible'
        overlay.classList.remove('show')
    }

    return (
        <Styled_Section className='bg-dark' id='projects'>
            <div className='overlay' onClick={overlayHandler}>
                <img className='overlay__image' src='' alt='' />
            </div>
            <div className='container'>
                <h2>Projects</h2>
                <div className='gallery'>
                    {data.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className='image'
                                onClick={imageHandler}
                            >
                                <img
                                    src={item.featuredUrl}
                                    alt='picture of completed work'
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </Styled_Section>
    )
}

const Styled_Section = styled.section`
    .overlay {
        position: fixed;
        display: none;
        top: 0;
        left: 0;
        right: 0;
        bottom: 100%;
        z-index: 1100;
        background-color: rgba(0, 0, 0, 0.9);
        transition: all 500ms ease;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .overlay.show {
        /* display: block; */
        bottom: 0;
    }

    .overlay__image {
        max-width: 800px;
        object-fit: contain;
        object-position: 0 0, 50% 50%;
    }

    @keyframes overlay-anim {
    }

    .gallery {
        margin-top: 3rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 2rem;
    }

    .image {
        height: 300px;
        transition: all 250ms ease-in-out;
        cursor: pointer;
    }

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: 0 0, 50% 50%;
        overflow: hidden;
    }

    .image:hover {
        transform: translateY(-1rem);
        opacity: 0.7;
    }

    @media (max-width: 1000px) {
        .gallery {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media (max-width: 600px) {
        .gallery {
            grid-template-columns: 1fr;
        }
    }
`

export default Projects
