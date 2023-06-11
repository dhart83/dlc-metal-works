import React from 'react'
import styled from 'styled-components'

const Footer = () => {
    let date = new Date()
    let year = date.getFullYear()
    return (
        <Styled_Section>
            <div className='container'>
                <p>
                    Copyright &copy; {year} DLC Metal Works LLC. All Rights
                    Reserved
                </p>
                <p>
                    Website Designed {'&'} Developed by{' '}
                    <a href='https://www.donniehartman.com' target='_blank'>
                        Donnie Hartman
                    </a>
                </p>
            </div>
        </Styled_Section>
    )
}

const Styled_Section = styled.footer`
    background-color: #333333;
    text-align: center;
    padding: 3rem 0 1rem 0;
    a {
        color: #6464fe;
    }
    p {
        margin-top: 1rem;
    }
    @media (max-width: 600px) {
        p {
            font-size: 0.6rem;
            margin-top: 0.6rem;
        }
    }
`
export default Footer
