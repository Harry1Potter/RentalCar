"use client";

import css from "./CustomSelect.module.css";
import { useState, useRef, useEffect } from "react";
import { ArrowDown, ArrowUp } from "../Sprite/Sprite";

interface Props {
  value: string;
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
  formatValue?: (value: string) => string;
}

export default function CustomSelect({
  value,
  options,
  placeholder,
  onChange,
  formatValue,
}: Props) {
  const [open, setOpen] = useState(false); // controls dropdown visibility

  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    onChange(option); // update selected value in parent component
    setOpen(false);
  };

  useEffect(() => {
    // close dropdown when clicking outside of the component
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className={css.select}>
      <button
        id={placeholder === "Choose a brand" ? "brand-select" : "price-select"}
        className={css.button}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={css.value}>
          {/* display placeholder or formatted selected value */}
          {value ? (formatValue ? formatValue(value) : value) : placeholder}
        </span>

        {/* arrow changes depending on dropdown state */}
        {open ? <ArrowUp /> : <ArrowDown />}
      </button>

      {open && (
        <ul className={css.dropdown}>
          {options.map((option) => (
            <li
              key={option}
              className={`${css.option} ${
                value === option ? css.selected : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}