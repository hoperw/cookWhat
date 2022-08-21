import '../recipeDisplay.css';


export default function RecipeDisplay(props) {
    return (
        <div id="recipe-display">
            <h2 id="recipe-name">{props.recipe.name ? props.recipe.name : "Recipe Suggestion"}</h2>
            {
                // if the ural exists display the link to it

                props.recipe.url !== "" && <a id="recipe-link" href={props.recipe.url}>Go to Recipe</a>
            }
            <div className="recipe-img-wrapper">
                { props.recipe.img  ? <img id="recipe-img" src={props.recipe.img} alt="recipe-served"/> : <h3>Recipe Shows Up Here!</h3>}
            </div>
        </div>
    );
  }