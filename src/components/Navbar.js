import React, { useState } from 'react'
import styled from 'styled-components'
import logo from '../logo.svg'
import { GiHamburgerMenu } from 'react-icons/gi'

const Navbar = () => {
    const toggleMenu = () => {
        const menu = document.querySelector('.mobile-overlay')
        menu.classList.toggle('open')
    }

    return (
        <>
            <Styled_Header>
                <div className='container'>
                    <a href='#home'>
                        <img src={logo} alt='logo' />
                    </a>
                    <GiHamburgerMenu
                        className='burger-icon'
                        onClick={toggleMenu}
                    />
                    <div className='mobile-overlay'>
                        <nav>
                            <ul>
                                <li>
                                    <a href='#home' onClick={toggleMenu}>
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href='#services' onClick={toggleMenu}>
                                        Services
                                    </a>
                                </li>
                                <li>
                                    <a href='#projects' onClick={toggleMenu}>
                                        Projects
                                    </a>
                                </li>
                                <li>
                                    <a href='#contact' onClick={toggleMenu}>
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </Styled_Header>
            <div style={{ width: '100%', height: '4rem' }}></div>
        </>
    )
}

const Styled_Header = styled.header`
    max-height: 4rem;
    background-color: white;
    position: fixed;
    width: 100%;
    z-index: 1000;
    box-shadow: 0 4px 2px -2px gray;

    .burger-icon {
        cursor: pointer;
        z-index: 1000;
        display: none;
    }

    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    img {
        max-height: 4rem;
    }

    ul {
        list-style: none;
        display: flex;
    }

    li {
        margin: ${(props) => (props.isMobile ? '1rem 4rem' : '0 0 0 2rem')};
        padding-bottom: 4px;
        border-bottom: 2px solid;
        border-color: rgba(84, 21, 14, 0);
        transition: border-color 300ms ease;
    }

    li:hover {
        border-color: var(--color-primary);
        opacity: 1;
    }

    a {
        font-size: 0.875rem;
    }

    @media (max-width: 768px) {
        ul {
            flex-direction: column;
        }
        li {
            margin: 1rem 4rem;
            text-align: center;
        }
        .burger-icon {
            display: block;
        }
        .mobile-overlay {
            position: absolute;
            top: 65px;
            right: 0;
            background-color: white;
            transform: translateX(100%);
            transition: transform 300ms ease;
        }
        .mobile-overlay.open {
            transform: translateX(0%);
        }
    }
`

export default Navbar
