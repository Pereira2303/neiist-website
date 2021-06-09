import React, { useState, useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { UserDataContext } from '../App'

const Seccoes = () => {
    const { userData } = useContext(UserDataContext)

    const [userState, setUserState] = useState(null)

    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:5000/votar/registar/${userData.username}`)
            .then(res => res.json())
            .then(state => setUserState(state.userState))
    }, [])

    return (
        <>
            <NavBar />
            <div style={{ margin: "10px 20vw" }}>
                {(userState === "inexistente") &&
                    <Button href="/socios/registar" target="_blank" rel="noreferrer" style={{ textAlign: "center" }}>REGISTAR</Button>
                }
                {(userState === "regular") &&
                    <p style={{ textAlign: "center" }}>AINDA NAO PODES VOTAR</p>
                }
                {(userState === "eleitor") &&
                    <Button href="/socios/votar" target="_blank" rel="noreferrer" style={{ textAlign: "center" }}>VOTAR</Button>
                }
                {(userState === "adormecido") &&
                    <Button href="/socios/renovar" target="_blank" rel="noreferrer" style={{ textAlign: "center" }}>RENOVAR</Button>
                }
            </div>
            <Footer />
        </>
    )
}

export default Seccoes