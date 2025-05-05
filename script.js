const recipes = [
    {
        title: "Spaghetti Carbonara",
        description: "A classic Italian pasta dish",
        ingredients: ["Spaghetti", "Eggs", "Parmesan Cheese", "Pancetta", "Pepper"],
        steps: [
            "Boil the spaghetti.",
            "Cook the pancetta until crisp.",
            "Mix eggs and cheese in a bowl.",
            "Combine spaghetti with pancetta and remove the heat.",
            "Stir in the egg mixture and serve"
        ],
        image: "Spaghetti Carbonara.jpg"
    },
    {
        title: "Chicken Curry",
        description: "A rich and flavorful curry",
        ingredients: ["Chicken", "Onions", "Tomatoes", "Garlic", "Spices"],
        steps: [
            "Sauté the onions and garlic.",
            "Add spices and cook until fragrant.",
            "Add chicken and brown.",
            "Add tomatoes and simmer until chicken is cooked.",
            "Serve with rice"
        ],
        image: "Chicken Curry.jpg"
    },
    {
        title:"Lasagna",
        description:"Made from scratch tomato sauce and a deliciously cheesy filling.",
        ingredients:["Meat","Onion","Canned tomatoes","Fresh herbs","Sugar","Spices and seasonings","Noodles","Cheese","Eggs"],
        steps:["Cook the meat","Cook the noodles","Make the cheese layer","Assemble the lasagna","Bake the lasagna","Serve with salad"],
        image:"lasagna.jpg"
    }
    
];

const searchButton = document.getElementById("searchBtn");
const searchBar = document.getElementById("search");
const suggestionsBox = document.getElementById("list");
const recipeList = document.getElementById("match");
const recipeDetails = document.getElementById("details");
const recipeTitle = document.getElementById("name");
const recipeImage = document.getElementById("recipeImg");
const ingredientsList = document.getElementById("ingredients");
const stepsList = document.getElementById("instructions");
const printButton = document.getElementById("printBtn");

searchButton.addEventListener("click", findRecipes);
searchBar.addEventListener("focus", () => {
    suggestionsBox.style.display = "block";
});
document.addEventListener("click", (event) => {
    if (!event.target.closest(".search") && !event.target.closest("#searchBtn")) {
        suggestionsBox.style.display = "none";
    }
});

printButton.addEventListener("click", () => window.print());

function findRecipes() {
    const query = searchBar.value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(query));
    displayRecipes(filteredRecipes);
}

function displayRecipes(filteredRecipes) {
    while (recipeList.firstChild) {
        recipeList.removeChild(recipeList.firstChild);
    }
    if (filteredRecipes.length === 0) {
        const noRecipeItem = document.createElement("li");
        noRecipeItem.textContent = "Recipe not found.";
        recipeList.appendChild(noRecipeItem);
    }else{
    filteredRecipes.forEach(recipe => {
        const recipeItem = document.createElement("li");
        recipeItem.textContent = `${recipe.title}: ${recipe.description}`;

        recipeItem.addEventListener("click", () => showRecipeDetails(recipe));

        recipeList.appendChild(recipeItem);
    });}
    
}

function showRecipeDetails(recipe) {
    recipeDetails.style.display = "block";
    recipeTitle.textContent = recipe.title;
    recipeImage.src = recipe.image;
    ingredientsList.innerHTML = "";
    stepsList.innerHTML = "";

    recipe.ingredients.forEach(ingredient => {
        const ingredientItem = document.createElement("li");
        ingredientItem.textContent = ingredient;

        ingredientItem.addEventListener("click", () => {
            ingredientItem.classList.toggle("purchased");
        });

        ingredientsList.appendChild(ingredientItem);
    });

    recipe.steps.forEach(step => {
        const stepItem = document.createElement("li");
        stepItem.textContent = step;
        stepsList.appendChild(stepItem);
    });
}
