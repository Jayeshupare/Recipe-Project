import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Navbar Component
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-white bg-white">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img id="brandlogo" src="logo.jpg" alt="brand icon" /> FOODIES
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" 
          aria-controls="navbarText" 
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// RecipeDashboard Component
const RecipeDashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    image: "",
  });

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(storedRecipes);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewRecipe({ ...newRecipe, image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addRecipe = () => {
    if (
      !newRecipe.name ||
      !newRecipe.ingredients ||
      !newRecipe.instructions ||
      !newRecipe.image
    ) {
      alert("Please fill in all fields and add an image.");
      return;
    }
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    setNewRecipe({ name: "", ingredients: "", instructions: "", image: "" });
  };

  const deleteRecipe = (index) => {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Recipe Dashboard</h2>
      <h4 className="mt-4">All Recipes</h4>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {recipes.map((recipe, index) => (
          <div className="col" key={index}>
            <div className="card h-100">
              <img src={recipe.image} className="card-img-top" alt={recipe.name} style={{ height: "200px", objectFit: "cover" }}/>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{recipe.name}</h5>
                <div className="mt-auto">
                  <button className="btn btn-primary me-2" onClick={() => setRecipeDetails(recipe)}>
                    Explore
                  </button>
                  <button className="btn btn-danger" onClick={() => deleteRecipe(index)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Recipe Form */}
      <div className="card p-3 mt-4">
        <h4>Add New Recipe</h4>
        <input
          type="text"
          name="name"
          value={newRecipe.name}
          onChange={handleInputChange}
          placeholder="Recipe Name"
          className="form-control mb-2"
        />
        <textarea
          name="ingredients"
          value={newRecipe.ingredients}
          onChange={handleInputChange}
          placeholder="Ingredients"
          className="form-control mb-2"
        ></textarea>
        <textarea
          name="instructions"
          value={newRecipe.instructions}
          onChange={handleInputChange}
          placeholder="Instructions"
          className="form-control mb-2"
        ></textarea>
        <input
          type="file"
          onChange={handleImageUpload}
          className="form-control mb-2"
          accept="image/*"
        />
        <button className="btn btn-success" onClick={addRecipe}>
          Add Recipe
        </button>
      </div>

      {/* Recipe Details Modal */}
      {recipeDetails && (
        <div className="card mt-4 p-3">
          <h5>{recipeDetails.name}</h5>
          <p>
            <strong>Ingredients:</strong> {recipeDetails.ingredients}
          </p>
          <p>
            <strong>Instructions:</strong> {recipeDetails.instructions}
          </p>
          <button className="btn btn-secondary" onClick={() => setRecipeDetails(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <>
      <Navbar />
      <RecipeDashboard />
    </>
  );
};

export default App;