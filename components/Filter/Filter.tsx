import CustomSelect from "../CustomSelect/CustomSelect";
import { formatNumber } from "../utils/formatNumber";
import css from "./Filter.module.css";

interface Props {
  brand: string;
  price: string;
  minMileage: string;
  maxMileage: string;
  brands: string[];

  setBrand: (v: string) => void;
  setPrice: (v: string) => void;
  setMinMileage: (v: string) => void;
  setMaxMileage: (v: string) => void;

  onSearch: () => void;
}

export default function Filter({
  brand,
  price,
  minMileage,
  maxMileage,
  brands,
  setBrand,
  setPrice,
  setMinMileage,
  setMaxMileage,
  onSearch,
}: Props) {
  return (
    <div className={css.filter}>
      <div className={`${css.group} ${css.brand}`}>
        {/* label triggers opening of custom select */}
        <label
          className={css.label}
          onClick={() => document.getElementById("brand-select")?.click()}
        >
          Car brand
        </label>

        <CustomSelect
          value={brand}
          options={brands}
          placeholder="Choose a brand"
          onChange={setBrand}
        />
      </div>

      <div className={`${css.group} ${css.price}`}>
        {/* label triggers opening of custom select */}
        <label
          className={css.label}
          onClick={() => document.getElementById("price-select")?.click()}
        >
          Price / 1 hour
        </label>

        <CustomSelect
          value={price}
          options={["30", "40", "50", "60", "70", "80"]}
          placeholder="Choose a price"
          onChange={setPrice}
          formatValue={(v) => `To $${v}`} // custom display format for price
        />
      </div>

      <div className={`${css.group} ${css.mileageGroup}`}>
        {/* clicking label focuses first mileage input */}
        <label
          className={css.label}
          onClick={() => document.getElementById("minMileage")?.focus()}
        >
          Car mileage / km
        </label>

        <div className={css.mileage}>
          <div className={css.inputWrapper}>
            <span className={css.prefix}>From</span>
            <input
              id="minMileage"
              className={css.input}
              value={formatNumber(minMileage)} // adds thousands separator
              onChange={(e) => setMinMileage(e.target.value)}
            />
          </div>

          <div className={css.divider}></div>

          <div className={css.inputWrapper}>
            <span className={css.prefix}>To</span>
            <input
              id="maxMileage"
              className={css.input}
              value={formatNumber(maxMileage)} // adds thousands separator
              onChange={(e) => setMaxMileage(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* applies selected filters */}
      <button className={css.search} onClick={onSearch}>
        Search
      </button>
    </div>
  );
}