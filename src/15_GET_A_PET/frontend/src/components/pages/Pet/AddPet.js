import api from '../../../utils/api'
import styles from './AddPet.module.css'
import { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

function AddPet () {
    return (
        <section className={styles.addpet_header}>
            <div>
                <h1>Register a pet</h1>
                <p>It will be available for adoption later</p>
            </div>
            <p>formulário</p>
        </section>
    )
}

export default AddPet