import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
// import Carousal from '../components/Carousal';

const Home = () => {
  const [search, setSearch]=useState('');

  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: { // Corrected here
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    // console.log(response[0], response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />

      <div>
        <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel" style={{ objectFit: "conatain !important", width: "100%", height: "auto" }}>
          <div class="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
                {/* <button className="btn btn-outline-success bg-info text-white" type="submit">Search</button> */}
              </div>
            </div>
            <div class="carousel-item active">
              <img src="https://media.cnn.com/api/v1/images/stellar/prod/140430115517-06-comfort-foods.jpg?q=w_1110,c_fill" class="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div class="carousel-item">
              <img src="https://food.fnr.sndimg.com/content/dam/images/food/plus/fullset/2020/04/30/0/FNK_The-Best-Cheddar-And-Herb-Chaffle_H_s4x3.jpg.rend.hgtvcom.1280.720.suffix/1588257306685.jpeg" class="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div class="carousel-item">
              <img src="https://images.indianexpress.com/2023/12/food.jpg" class="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {
          foodCat.length > 0 ? (
            foodCat.map((data) => (
              <div className='row mb-3'>
                <div key={data._id} className='fs-3 m-3'>
                  {data.CategoryName}
                </div>
                <hr />
                {
                  foodItem.length > 0 ? (
                    foodItem
                      .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                      .map(filterItems => (
                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                          <Card foodItem={filterItems}
                            options={filterItems.options[0]}
                          />
                        </div>
                      ))
                  ) : <div>No Such Data Found</div>
                }
              </div>
            ))
          ) : <div>*********</div>
        }
      </div>

      <Footer />
    </div>
  );
};

export default Home;
