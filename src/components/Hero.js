import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import FirebaseFirestoreService from '../firebase/FirebaseFirestoreService'

const Hero = () => {
    const [data, setData] = useState({})

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const hero = await FirebaseFirestoreService.readDocuments({
                collection: 'hero',
                queries: null,
                orderByField: null,
                orderByDirection: null,
                perPage: null,
                cursorId: null
            })

            const newData = hero.docs[0].data()
            newData.id = hero.docs[0].id
            setData(newData)
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <Styled_Hero id='home' data={data}>
            <div className='container'>
                <h1>{data.title}</h1>
                <p>{data.subTitle}</p>
                <div className='button-container'>
                    <button
                        className='primary'
                        onClick={() => {
                            location.href = '#contact'
                        }}
                    >
                        Contact us today
                    </button>
                </div>
                <a href='#services'>Learn more</a>
            </div>
        </Styled_Hero>
    )
}

const Styled_Hero = styled.section`
    padding: 150px 0;
    background-image: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
        url(${(props) => props.data.imageUrl});
    background-size: cover;
    background-position: 0 0, 50% 50%;

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .button-container {
        margin-top: 50px;
    }

    h1 {
        color: #f7f7f7;
    }

    p {
        color: #e9e9e9;
    }

    a {
        color: whitesmoke;
        text-decoration: none;
        font-size: 0.7rem;
        margin-top: 0.7rem;
    }
`

export default Hero
