"use client";

import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "../_actions/search";
import Header from "../../_components/header";
import RestaurantItem from "../../_components/restaurant-item";
import React from "react";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const searchParam = useSearchParams();
  const searchFor = searchParam.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) {
        return;
      }

      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Restaurantes Encontrados</h2>

        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Restaurants;
