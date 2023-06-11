import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { BiHome, BiBuildings, BiWrench } from 'react-icons/bi'

import FirebaseFirestoreService from '../firebase/FirebaseFirestoreService'

const Services = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const data = await FirebaseFirestoreService.readDocuments({
                collection: 'services',
                queries: null,
                orderByField: null,
                orderByDirection: null,
                perPage: null,
                cursorId: null
            })
            data.docs.map((doc) => {
                const newDoc = doc.data()
                newDoc.id = doc.id
                setData((data) => [...data, newDoc])
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const services = {
        title: 'title',
        description:
            'jsdflk skjdflsjf sdkfj fd d dfkjl slksdjfljl lksd sdfjsll sd sdfsdfls sdfsf fffll'
    }
    return (
        <Styled_Section id='services'>
            <div className='container'>
                <h2 className='section__title'>Services</h2>
                <div className='card_container'>
                    <a href='#'>
                        <div className='card'>
                            <div className='card__image'>
                                <BiHome
                                    className='icon icon__roofing'
                                    size={100}
                                />
                            </div>
                            <div className='card__info'>
                                <h3>
                                    {data.length > 0
                                        ? data[
                                              data.findIndex(
                                                  (item) =>
                                                      item.type === 'roofing'
                                              )
                                          ].title
                                        : null}
                                </h3>
                                <p>
                                    {data.length > 0
                                        ? data[
                                              data.findIndex(
                                                  (item) =>
                                                      item.type === 'roofing'
                                              )
                                          ].description
                                        : null}
                                </p>
                            </div>
                        </div>
                    </a>
                    <a href='#'>
                        <div className='card'>
                            <div className='card__image'>
                                <BiBuildings
                                    className='icon icon__building'
                                    size={100}
                                />
                            </div>
                            <div className='card__info'>
                                <h3>
                                    {data.length > 0
                                        ? data[
                                              data.findIndex(
                                                  (item) =>
                                                      item.type === 'building'
                                              )
                                          ].title
                                        : null}
                                </h3>
                                <p>
                                    {data.length > 0
                                        ? data[
                                              data.findIndex(
                                                  (item) =>
                                                      item.type === 'building'
                                              )
                                          ].description
                                        : null}
                                </p>
                            </div>
                        </div>
                    </a>
                    <a href='#'>
                        <div className='card'>
                            <div className='card__image'>
                                <BiWrench
                                    className='icon icon__repair'
                                    size={100}
                                />
                            </div>
                            <div className='card__info'>
                                <h3>
                                    {data.length > 0
                                        ? data[
                                              data.findIndex(
                                                  (item) =>
                                                      item.type === 'repair'
                                              )
                                          ].title
                                        : null}
                                </h3>
                                <p>
                                    {data.length > 0
                                        ? data[
                                              data.findIndex(
                                                  (item) =>
                                                      item.type === 'repair'
                                              )
                                          ].description
                                        : null}
                                </p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </Styled_Section>
    )
}

const Styled_Section = styled.section`
    .card_container {
        margin-top: 3rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 1rem;
    }
    .card {
        text-align: center;
    }

    .card:hover {
        color: black;
    }

    .card__image {
        height: 200px;
        background-color: whitesmoke;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon {
        opacity: 0.5;
    }

    .card__info {
        padding: 0 1rem;
    }

    @media (max-width: 768px) {
        .card_container {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media (max-width: 568px) {
        .card_container {
            grid-template-columns: 1fr;
            grid-gap: 5rem;
        }
        .card__info {
            text-align: justify;
        }
    }

    @media (max-width: 320px) {
    }
`

export default Services
