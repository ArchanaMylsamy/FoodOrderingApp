import { useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Hamburger",
    description: "The Classic Burger",
    price: 500,
    image: 'https://images.media-allrecipes.com/userphotos/960x960/3757723.jpg',
  },
  {
    id: "m2",
    name: "Fried chicken",
    description: "Special crispy chicken.",
    price: 250,
    image: 'https://thumbs.dreamstime.com/b/spicy-deep-fried-breaded-chicken-wings-ranch-74976107.jpg',
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 790,
    image: 'https://www.tasteofhome.com/wp-content/uploads/2018/01/exps28800_UG143377D12_18_1b_RMS.jpg',
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 300,
    image: 'https://img.delicious.com.au/2hUHdiwU/w759-h506-cfill/del/2018/05/green-and-gold-rice-bowls-80254-2.jpg',
  },
];

const AvailableMeals = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMeals, setFilteredMeals] = useState(DUMMY_MEALS);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = DUMMY_MEALS.filter((meal) =>
      meal.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMeals(filtered);
  };
  const mealsList = filteredMeals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      image={meal.image}
    />
  ));
  

  return (
    <section className={classes.meals}>
      <Card>
      <input
          type="text"
          placeholder="Search Meals..."
          value={searchQuery}
          className={classes.searchInput}
          onChange={handleSearch}
        />
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
