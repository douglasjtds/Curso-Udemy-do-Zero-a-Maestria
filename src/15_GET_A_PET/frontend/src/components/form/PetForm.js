import { useState } from "react"
import formStyles from './Form.module.css'
import Input from "./Input"
import Select from "./Select"

function PetForm ({handleSubmit, petData, btnText}) {
    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ["White", "Black", "Gray", "Caramel", "Mixed Color"]

    function onFileChange(e){

    }

    function handleChange(e){

    }

    function handleColor(e){

    }

    return (
        <form className={formStyles.form_container}>
            <Input 
                text="Pet images"
                type="file"
                name="images"
                handleOnChange={onFileChange}
                multiple={true}
            />
            <Input 
                text="Pet name"
                type="text"
                name="name"
                placeholder="Type the pet's name..."
                handleOnChange={handleChange}
                value={pet.name || ''}
                />
            <Input 
                text="Pet age"
                type="text"
                name="age"
                placeholder="Type the pet's age..."
                handleOnChange={handleChange}
                value={pet.age || ''}
                />
            <Input 
                text="Pet weight"
                type="number"
                name="weight"
                placeholder="Type the pet's weight..."
                handleOnChange={handleChange}
                value={pet.weight || ''}
            />
            <Select 
                name="color"
                text="Select the color"
                options={colors}
                handleOnChange={handleColor}
                value={pet.color || ''}
            />
            <input type="submit" value={btnText}></input>
        </form>
    )
}

export default PetForm