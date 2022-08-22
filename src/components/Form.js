import { useState, useEffect } from 'react';
import data from '../recipeData';
import RecipeDisplay from './RecipeDisplay';


export default function Form() {

    const [recipeData, setRecipeData] = useState({})

    const [formData, setFormData] = useState({
        flavorProfile: "savory", 
        vegan: false, vegetarian: false, glutenFree: false, 
        inspiredFrom: "indian"
    })

    const [recipe, setRecipe] = useState({
        name: "",
        url: "",
        img: ""
    });

    useEffect(() => {
        setRecipeData(data);
    }, [])

    function getRecipe() {
        const allRecipes = recipeData.data.recipes

        // collect recipes that satisfy the user's flavorProfile and inspiredFrom choices

        let recipeArray = allRecipes.filter(recipe => {

            return recipe.flavorProfile.includes(formData.flavorProfile) 
                   && recipe.inspiredFrom.includes(formData.inspiredFrom)
        })

        // from those find the unique dietary requirements if they exist

        if (formData.vegetarian) {
            recipeArray = recipeArray.filter(recipe => {

                return recipe.vegetarian
            })
        }
        if (formData.vegan) {
            recipeArray = recipeArray.filter(recipe => {

                return recipe.vegan
            })
        }
        if (formData.glutenFree) {
            recipeArray = recipeArray.filter(recipe => {

                return recipe.glutenFree
            })
        }

        // once the options are limited by the user's preference requirements, pick a random one

        const randomNumber = Math.floor(Math.random() * recipeArray.length)

        if (recipeArray.length > 0) {
            const url = recipeArray[randomNumber].url
            const name = recipeArray[randomNumber].name
            const img = recipeArray[randomNumber].img
            setRecipe({
                name: name,
                url: url,
                img: img
            })
        } else {
            setRecipe({
                name: "Sorry that combination doesn't exist in the collection yet!",
                url: "",
                img: "https://wallpapercave.com/uwp/uwp768450.jpeg"
            })
        } 
    }

    // set the formData state based on user's choices

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
    }


    return (
        <div className="form-wrapper">
        <div className="shape1"></div>
        <form id="recipe-form" onSubmit={handleSubmit}>
            <div className="checkbox-wrapper">
                <h3 className="section-label">Dietary Restrictions: </h3>
                <div className="checkbox-container">
                    <label htmlFor="vegan">Vegan: </label>
                    <input 
                        className="checkbox-item"
                        type="checkbox"
                        id="vegan"
                        checked={formData.vegan}
                        onChange={handleChange}
                        name="vegan"               
                    />
                </div>
                <div className="checkbox-container">
                    <label htmlFor="vegetarian">Vegetarian: </label>
                    <input 
                        className="checkbox-item"
                        type="checkbox"
                        id="vegetarian"
                        checked={formData.vegetarian}
                        onChange={handleChange}
                        name="vegetarian"               
                    />
                </div>
                <div className="checkbox-container">
                    <label htmlFor="glutenFree">Gluten Free: </label>
                    <input 
                        className="checkbox-item" 
                        type="checkbox"
                        id="glutenFree"
                        checked={formData.glutenFree}  
                        onChange={handleChange}
                        name="glutenFree"              
                    />
                </div>
            </div>
            <div id="select-lists-container">
                <label htmlFor="flavorProfile" className="section-label">Flavor Profile: </label>
                <div className="select-container">
                    <select
                        id="flavorProfile"
                        value={formData.flavorProfile}
                        onChange={handleChange}
                        name="flavorProfile"
                    >
                        <option value="savory">Savory</option>
                        <option value="sweet">Sweet</option>
                    </select>
                </div>
                <label htmlFor="inspiredFrom" className="section-label">Inspired: </label>
                <div className="select-container">
                    <select
                        id="inspiredFrom"
                        value={formData.inspiredFrom}
                        onChange={handleChange}
                        name="inspiredFrom"
                    >
                        <option value="american">American</option>
                        <option value="chinese">Chinese</option>
                        <option value="ethiopian">Ethiopian</option>
                        <option value="indian">Indian</option>
                        <option value="japanese">Japanese</option>
                        <option value="korean">Korean</option>
                        <option value="italian">Italian</option>
                        <option value="mediterranean">Mediterranean</option>
                        <option value="mexican">Mexican</option>
                        <option value="thai">Thai</option>
                        <option value="west-african">West African</option>
                    </select>
                </div>
            </div>
            <button id="form-submit" onClick={getRecipe}>Get a Recipe</button>
        </form>
            <div className="shape2"></div>
            <RecipeDisplay recipe={recipe} />

        </div>
    )
}