import ResturantCard from "./ResturantCard";
// import resObj from "../utils/mockData";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";



const Body = () => {

  let [Obj, setObj] = useState([]);
  const [filteredRestaurant, setfilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Same thing like above

  // const arr = useState(resObj);

  // // const []
  // const Obj = arr[0];
  // const setObj = arr[1];


  useEffect(() => {
    fetchData();
  }, []);


  // Fetching data from the Swiggy API using link and async await
  const fetchData = async () => {

    // Swiggy dynamic API link
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.3633587&lng=83.00122100000002&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

    const json = await data.json();

    console.log(json);

    // Setting data to the Obj by de-referencing the data using JSON 
    // Optional changing
    setObj(json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setfilteredRestaurant(json.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  };

  //returning shimmer UI if no data is loaded from the API
  return Obj.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">


      {/* applying filter the data to show only restaurant with over 4.4 star ratings. */}
      <div className="filter">
        <div className="search">
          <input 
            type="text"  
            className="search-box" 
            value={searchText}
            onChange={(e) =>{
              setSearchText(e.target.value)
            }} 
          />
          <button onClick={() => {
            //filter the resturant and Update to UI
            //search the intered text

            const myFilteredRestaurant = Obj.filter(
              res => res.info.cuisines.toString().toLowerCase()
              .includes(searchText.toString().toLowerCase())
            );
            
            setfilteredRestaurant(myFilteredRestaurant);

          }}>
            Search
          </button>
        </div>
        <button className="filter-btn"
          onClick={() => {
            const filteredList = Obj.filter(
              (res) => res.info.avgRating > 4.4
            );

            // calling the filteredList which we are getting after the Obj.filter has returned after the setObj the 
            // ReactDOM fibre algorithm will render the entire app because of any change in the statehook.
            setfilteredRestaurant(filteredList);
          }}
        >
          Top Rated Restaurants</button>
      </div>


      {/* passing the data i.e. Obj to the map function Obj is the state hook variable */}
      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
          // using resturant.info.id to pass the unique id and 
          // resData={restaurant.info} to pass the info key for the resturant array which is in our SWIGGY API see SWIGGY API if wanted.
          // The key (info) is holding the data ===> restaurant = [{ info : {data, data, data}}]
          <ResturantCard key={restaurant.info.id}
            resData={restaurant.info} />
        ))
        }
      </div>

    </div>
  );
};


export default Body;

