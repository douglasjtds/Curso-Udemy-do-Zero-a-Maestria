import api from '../../../utils/api'
import styles from './AddPet.module.css'
import { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

/* components */
import PetForm from '../../form/PetForm'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function AddPet () {
    return (
        <section className={styles.addpet_header}>
            <div>
                <h1>Register a pet</h1>
                <p>It will be available for adoption later</p>
            </div>
            <PetForm btnText="Register pet"/>
        </section>
    )
}

export default AddPet