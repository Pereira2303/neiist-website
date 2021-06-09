import React, { useState } from 'react'
import axios from 'axios'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const CarregarAreas = () => {
    const [areas, setAreas] = useState(null)

    return (
        <>
            <NavBar />
            <div style={{ margin: "10px 30vw" }}>
                <form method="post" action="#" id="#">
                    <div>
                        <label>Areas in JSON format:</label>
                        <input type="text" name="file" onChange={event => setAreas(event.target.value)} />
                        <button
                            type="button"
                            className="btn btn-success btn-block"
                            onClick={() => {
                                axios.post("http://localhost:5000/areas/upload", areas, {
                                    headers: {
                                        // Overwrite Axios's automatically set Content-Type
                                        'Content-Type': 'application/json'
                                    }})
                            }}
                        >
                            Upload
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )
}

export default CarregarAreas