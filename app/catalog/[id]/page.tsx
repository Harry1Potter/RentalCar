import { api } from "@/services/api";
import { Car } from "@/types/car";
import {
  Location,
  Calendar,
  CarType,
  Fuel,
  Engine,
  CheckMark,
} from "@/components/Sprite/Sprite";
import Image from "next/image";
import BookingForm from "@/components/BookingForm/BookingForm";
import { formatMileage } from "@/utils/formatMileage";
import css from "./CarPage.module.css";

async function getCar(id: string): Promise<Car> {
  const { data } = await api.get("/cars", {
    params: { limit: 100 },
  });

  const car = data.cars.find((c: Car) => c.id === id);

  if (!car) {
    throw new Error("Car not found");
  }

  return car;
}

export default async function CarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = await getCar(id);
  const shortId = car.id.split("-")[0];

  const city = car.address.split(", ")[1];

  return (
    <div className={css.carPage}>
      <div className={css.layout}>
        {/* LEFT COLUMN */}
        <div className={css.leftColumn}>
          <div className={css.imageWrapper}>
            <Image
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              width={640}
              height={512}
              priority
            />
          </div>

          <BookingForm />
        </div>

        {/* RIGHT COLUMN */}
        <div className={css.rightColumn}>
          {/* TITLE */}
          <div className={css.titleBlock}>
            <h1 className={css.title}>
              {car.brand} {car.model}, {car.year}
              <span className={css.id}>Id: {shortId}</span>
            </h1>

            <p className={css.location}>
              <Location />
              {city}, Ukraine · Mileage: {formatMileage(car.mileage)} km
            </p>

            <p className={css.price}>${car.rentalPrice}</p>
          </div>

          <p className={css.description}>{car.description}</p>

          {/* RENTAL CONDITIONS */}
          <section className={css.section}>
            <h2 className={css.sectionTitle}>Rental Conditions:</h2>

            <ul className={css.list}>
              {car.rentalConditions.map((condition, index) => (
                <li key={index} className={css.listItem}>
                  <CheckMark />
                  {condition}
                </li>
              ))}
            </ul>
          </section>

          {/* SPECIFICATIONS */}
          <section className={css.section}>
            <h2 className={css.sectionTitle}>Car Specifications:</h2>

            <ul className={css.list}>
              <li className={css.listItem}>
                <Calendar /> Year: {car.year}
              </li>

              <li className={css.listItem}>
                <CarType /> Type: {car.type}
              </li>

              <li className={css.listItem}>
                <Fuel /> Fuel Consumption: {car.fuelConsumption}
              </li>

              <li className={css.listItem}>
                <Engine /> Engine Size: {car.engineSize}
              </li>
            </ul>
          </section>

          {/* ACCESSORIES */}
          <section className={css.section}>
            <h2 className={css.sectionTitle}>
              Accessories and functionalities:
            </h2>

            <ul className={css.list}>
              {car.accessories.map((item, index) => (
                <li key={`acc-${index}`} className={css.listItem}>
                  <CheckMark />
                  {item}
                </li>
              ))}

              {car.functionalities.map((item, index) => (
                <li key={`func-${index}`} className={css.listItem}>
                  <CheckMark />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
