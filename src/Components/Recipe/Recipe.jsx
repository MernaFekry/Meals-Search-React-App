import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './Recipe.css';

const Recipe = () => {
    const [meals, setMeals] = useState([{}]);

    const [searchText, setSearchText] = useState("");

    const [filteredMeals, setFilteredMeals] = useState([{}]);

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    

    async function getAPIData(){
        const response = await axios.get(url)
                        .then((res) => 
                        {
                            setMeals(res.data.meals);
                            console.log(res.data.meals);
                        // console.log(res);
                        })
                        .catch(err => {
                        console.log(err);
                        })
                        console.log(searchText);
    }   

    useEffect(() => {
        getAPIData();
    }, []);



    return <>

        <div className="row mb-5">
            <div className="col-12">
                <div>
                    <input onChange={(e) => setSearchText(e.target.value)} id='search-input' type="text" className='form-control' placeholder='Search'  />
                    {/* <button className='btn btn-primary' onClick={}>Search</button> */}
                </div>
            </div>
        </div>

        <div className="row g-3">
            {meals.filter((meal) => {
                return searchText.toLocaleLowerCase() === '' ? meal : meal.strMeal.toLowerCase().includes(searchText);
            }).map((meal,index) => 
                <div className="col-12  col-md-6 col-lg-4 col-xl-3" key={index}>
                    <div className='w-100 content'>
                        <img className='w-100' src={meal.strMealThumb} />
                        <div className="transparentLayer">
                            <h4>{meal.strArea}</h4>
                            <h6>{meal.strMeal}</h6>
                            <a href={meal.strYoutube} className='btn'>Watch Video</a>
                            {/* <button className='btn btn-primary'>Watch Video</button> */}
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    
    </>
}

export default Recipe;
