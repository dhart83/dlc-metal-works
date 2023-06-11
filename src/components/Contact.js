import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaMobileAlt } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

import FirebaseFirestoreService from '../firebase/FirebaseFirestoreService'

const Contact = () => {
    const [data, setData] = useState('')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const data = await FirebaseFirestoreService.readDocuments({
                collection: 'contact',
                queries: null,
                orderByField: null,
                orderByDirection: null,
                perPage: null,
                cursorId: null
            })

            data.docs.map((doc) => {
                const newDoc = doc.data()
                newDoc.id = doc.id
                setData(newDoc)
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const copyLink = (e) => {
        const msg = 'Email address copied to clipboard'
        e.target.parentElement.previousElementSibling.innerHTML = msg
        const copyText = e.target.innerHTML
        navigator.clipboard.writeText(copyText)
    }
    const showMessage = (e, msg) => {
        e.target.parentElement.previousElementSibling.innerHTML = msg
        e.target.parentElement.previousElementSibling.classList.add('show')
    }
    const hideMessage = (e) => {
        e.target.parentElement.previousElementSibling.classList.remove('show')
    }
    return (
        <Styled_Section id='contact' imageUrl={data.imageUrl}>
            <div className='container'>
                <h2>{data ? data.title : null}</h2>
                <div className='contact_container'>
                    <div className='image_wrapper'>
                        <div className='image'></div>
                    </div>
                    <div className='content'>
                        <div className='msg'>
                            <h3>{data ? data.subTitle : null}</h3>
                        </div>
                        <div className='opt'>
                            <FaMobileAlt size={25} />
                            <div className='link_wrapper'>
                                <div className='copy-message'>
                                    Click to send to phone
                                </div>
                                <a href='tel:+1-813-784-7705'>
                                    <h4
                                        className='copy_link'
                                        onMouseOver={(e) =>
                                            showMessage(
                                                e,
                                                'Click to send to phone'
                                            )
                                        }
                                        onMouseLeave={hideMessage}
                                    >
                                        {data ? data.phone : null}
                                    </h4>
                                </a>
                            </div>
                        </div>
                        <div className='opt'>
                            <MdEmail size={25} />
                            <div className='link_wrapper'>
                                <div className='copy-message'>
                                    Click to copy email to clipboard
                                </div>
                                <a>
                                    <h4
                                        className='copy_link'
                                        onMouseOver={(e) =>
                                            showMessage(
                                                e,
                                                'Click to copy email to clipboard'
                                            )
                                        }
                                        onMouseOut={hideMessage}
                                        onClick={copyLink}
                                    >
                                        {data ? data.email : null}
                                    </h4>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Styled_Section>
    )
}

const Styled_Section = styled.section`
    .contact_container {
        margin-top: 3rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .image_wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .image {
        width: 250px;
        height: 250px;
        border-radius: 50%;
        background-image: url(${(props) => props.imageUrl});
        background-size: cover;
        background-color: whitesmoke;
        filter: grayscale(100%);
    }

    img {
        border-radius: 50%;
        object-fit: cover;
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .msg {
        margin-bottom: 2rem;
        margin-left: 1rem;
        width: 50%;
        h3 {
            text-align: left;
        }
    }

    .opt {
        display: flex;
        margin: 0.3rem 1rem;
    }

    .copy_link {
        margin: 0;
        margin-left: 1rem;
        cursor: pointer;
    }

    .link_wrapper {
        align-items: center;
    }
    .copy-message {
        transform: translate(0%, -150%);
        position: absolute;
        display: none;
        width: auto;
        white-space: nowrap;
        font-size: 12px;
        background-color: black;
        color: white;
        padding: 2px 6px;
        border-radius: 2px;
        &:before {
            content: '';
            top: 100%;
            left: 50%;
            border: solid transparent;
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
            border-color: rgba(0, 0, 0, 0);
            border-top-color: #000000;
            border-width: 4px;
            margin-left: -4px;
        }
    }
    .show {
        display: block;
    }
    .hide {
        display: none;
    }

    @media (max-width: 600px) {
        .contact_container {
            grid-template-columns: 1fr;
        }
        .msg {
            /* margin-bottom: 2rem;
            margin-left: 1rem;
            width: 50%; */
            h3 {
                text-align: center;
            }
        }
        .content {
            align-items: center;
        }
    }
`
export default Contact
