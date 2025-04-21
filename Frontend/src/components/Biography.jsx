import React from 'react'

const Biography = ({imageUrl}) => {
  return (
    <div className='container biography'>
      <div className="banner">
        <img src={imageUrl} alt="aboutImg" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut minima porro neque sunt corporis sequi sed temporibus aliquam cumque soluta. Suscipit illum saepe nesciunt quam labore impedit reprehenderit dolores delectus quis itaque aperiam quae autem ipsa aliquid ducimus, praesentium libero, deleniti asperiores? Expedita omnis dolore repellat id earum provident dolor!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde dolorum voluptates adipisci libero expedita aperiam repellat, doloribus eligendi consectetur, laborum debitis? Recusandae maxime nemo, esse et sunt beatae ducimus. Quo magni ullam aliquam nesciunt reprehenderit?</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate possimus veritatis quam!</p>
        <p>Lorem, ipsum dolor.</p>
      </div>
    </div>
  )
}

export default Biography
