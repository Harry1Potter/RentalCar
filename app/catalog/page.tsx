"use client";

import { useEffect, useState } from "react";
import { fetchBrands, fetchCars } from "@/services/api";
import { Car } from "@/types/car";
import CarCard from "@/components/CarCard/CarCard";
import Filter from "@/components/Filter/Filter";
import { useCarsStore } from "@/store/useCarsStore";
import Loader from "@/components/Loader/Loader";
import css from "./CatalogPage.module.css";

export default function CatalogPage() {
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [page, setPage] = useState(1);

  // filter states
  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  const [hasMore, setHasMore] = useState(true);

  // filters used for API request (applied only after clicking Search)
  const [filters, setFilters] = useState({
    brand: "",
    price: "",
    minMileage: "",
    maxMileage: "",
  });

  const loadFavorites = useCarsStore((state) => state.loadFavorites);

  // load favorite cars from localStorage when page mounts
  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  // fetch cars when page or filters change
  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);

      const data = await fetchCars({
        brand: filters.brand,
        rentalPrice: filters.price,
        minMileage: filters.minMileage,
        maxMileage: filters.maxMileage,
        page,
        limit: 8,
      });

      // if API returns less than 8 items → no more pages
      if (data.length < 8) {
        setHasMore(false);
      }

      // append new cars to existing list (pagination)
      setCars((prev) => [...prev, ...data]);

      setLoading(false);
    };

    loadCars();
  }, [page, filters]);

  // load brand list for filter dropdown
  useEffect(() => {
    const loadBrands = async () => {
      const data = await fetchBrands();
      setBrands(data);
    };

    loadBrands();
  }, []);

  return (
    <div className={css.container}>
      <Filter
        brand={brand}
        price={price}
        minMileage={minMileage}
        maxMileage={maxMileage}
        brands={brands}
        setBrand={setBrand}
        setPrice={setPrice}
        setMinMileage={setMinMileage}
        setMaxMileage={setMaxMileage}
        onSearch={() => {
          // reset list and start new search with selected filters
          setCars([]);
          setPage(1);
          setHasMore(true);

          setFilters({
            brand,
            price,
            minMileage,
            maxMileage,
          });
        }}
      />

      <div className={css.carsGrid}>
        {cars.map((car, index) => (
          <CarCard key={`${car.id}-${index}`} car={car} />
        ))}
      </div>

      {!loading && cars.length === 0 && (
        <p className={css.empty}>No cars found</p>
      )}

      {loading && (
        <div className={css.loader}>
          <Loader />
        </div>
      )}

      {cars.length > 0 && !hasMore && (
        <p className={css.end}>You&apos;ve reached the end of the list</p>
      )}

      {hasMore && (
        <button
          className={css.loadMore}
          disabled={loading}
          onClick={() => setPage((p) => p + 1)}
        >
          Load More
        </button>
      )}
    </div>
  );
}
