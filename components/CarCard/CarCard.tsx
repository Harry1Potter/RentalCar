import Link from "next/link";
import { Car } from "@/types/car";
import { formatMileage } from "@/utils/formatMileage";
import { useCarsStore } from "@/store/useCarsStore";
import { Favorite, FavoriteActive } from "../Sprite/Sprite";
import Image from "next/image";
import css from "./CarCard.module.css";

interface Props {
  car: Car;
}

export default function CarCard({ car }: Props) {
  // get favorites state and toggle action from Zustand store
  const favorites = useCarsStore((state) => state.favorites);
  const toggleFavorite = useCarsStore((state) => state.toggleFavorite);

  const isFavorite = favorites.includes(car.id);

  // extract city from address string
  const city = car.address.split(", ")[1];

  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <Image src={car.img} alt={car.model} width={276} height={268} />

        {/* toggle car in favorites */}
        <button
          className={css.favoriteButton}
          onClick={() => toggleFavorite(car.id)}
        >
          {isFavorite ? <FavoriteActive /> : <Favorite />}
        </button>
      </div>

      <div className={css.titleRow}>
        <h3 className={css.title}>
          {car.brand} <span>{car.model}</span>, {car.year}
        </h3>

        <p className={css.price}>${car.rentalPrice}</p>
      </div>

      <div className={css.info}>
        <p>
          {city} | Ukraine | {car.rentalCompany}
        </p>

        <p>
          {car.type} | {formatMileage(car.mileage)} km
        </p>
      </div>

      {/* link to dynamic car details page */}
      <Link className={css.readButton} href={`/catalog/${car.id}`}>
        Read more
      </Link>
    </div>
  );
}