import React from 'react'

const Carousal = () => {
  return (
    <div>
      <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel" style={{objectFit : "conatain !important",width: "100%", height: "auto"}}>
        <div class="carousel-inner"  id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success bg-info text-white" type="submit">Search</button>
            </form>
          </div>
          <div class="carousel-item active">
            <img src="https://media.cnn.com/api/v1/images/stellar/prod/140430115517-06-comfort-foods.jpg?q=w_1110,c_fill" class="d-block w-100" style={{filter:"brightness(30%)"}} alt="..." />
          </div>
          <div class="carousel-item">
            <img src="https://food.fnr.sndimg.com/content/dam/images/food/plus/fullset/2020/04/30/0/FNK_The-Best-Cheddar-And-Herb-Chaffle_H_s4x3.jpg.rend.hgtvcom.1280.720.suffix/1588257306685.jpeg" class="d-block w-100"  style={{filter:"brightness(30%)"}} alt="..." />
          </div>
          <div class="carousel-item">
            <img src="https://images.indianexpress.com/2023/12/food.jpg" class="d-block w-100"  style={{filter:"brightness(30%)"}} alt="..." />
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
  )
}

export default Carousal
