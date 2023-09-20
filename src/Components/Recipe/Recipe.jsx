import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './Recipe.css';

const Recipe = () => {
    const [meals, setMeals] = useState([{}]);

    const [searchText, setSearchText] = useState("");

    // const url = "https://api.spoonacular.com/recipes/complexSearch?apiKey=a34b3cdade3d4d7b9edc2586affee5be";
    


    async function getAPIData(){
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
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
                            
    }   

    useEffect(() => {
        getAPIData();
        // console.log(meal);
    }, []);



    return <>

        <div className="row mb-5">
            <div className="col-12">
                <div>
                <input type="text" className='form-control' placeholder='Search' onChange={(e) => setSearchText(e.target.value)} />
                </div>
            </div>
        </div>

        <div className="row g-3">
            {meals.map((meal,index) => 
                <div className="col-12  col-md-6 col-lg-4 col-xl-3" key={index}>
                    <div className='w-100 content'>
                        <img className='w-100' src={meal.strMealThumb} />
                        <div className="transparentLayer">
                            <h4>{meal.strArea}</h4>
                            <a href={meal.strYoutube} className='btn'>Watch Video</a>
                            {/* <button className='btn btn-primary'>Watch Video</button> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    
    </>
}

export default Recipe;
