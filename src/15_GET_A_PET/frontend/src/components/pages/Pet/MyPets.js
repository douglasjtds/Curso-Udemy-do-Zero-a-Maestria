import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function MyPets () {
const[pets, setPets] = useState([])

    return (
        <section>
            <h1>MyPets</h1>
            <Link to="/pet/add">Register pet</Link>
            <div>
                {pets.length > 0 && <p>My registered pets</p>}
                {pets.length === 0 && <p>There are no registered pets.</p>}
            </div>
        </section>
    )
}

export default MyPets