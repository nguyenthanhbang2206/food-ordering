import React from 'react';
import './Home.css';
import { MultiCarousel } from './MultiCarousel';
import { RestaurantCard } from '../Restaurant/RestaurantCard';
const restaurant = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
export const Home = () => {
  return (
    <div>
      <section className="banner relative flex flex-col items-center justify-center mt-10">
        <div className="w-[50vw] z-10 text-center">
          <p className="text-4xl font-bold text-white">Welcome to Our Website</p>
          <p className="z-10 font-bold text-white">Taste the convenience: Food, Fast, and Delivered</p>
        </div>
        <div className="cover absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
      </section>

      <section className="flex flex-col items-center justify-center">
        <p className="text-4xl font-bold text-center mt-10">Top Meals</p>
        <MultiCarousel />
      </section>
      <section className="flex flex-col items-center justify-center mt-10"></section>
        <h1 className="text-4xl font-bold text-center">Order from our favourites</h1>
        <div className='flex flex-wrap justify-around mt-10 items-center'>
            {
               restaurant.map((item, index) => (
                <RestaurantCard></RestaurantCard>
              ))
              
            }
        </div>
    </div>
  );
};
