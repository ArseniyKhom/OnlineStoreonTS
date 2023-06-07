import React, { useState } from 'react';

const DEFAULT_CATEGORY = "";
const SORT_OPTIONS = [
  { value: "", label: "Умолчанию" },
  { value: "lowest", label: "Возрастанию цены" },
  { value: "highest", label: "Убыванию цены" },
  { value: "az", label: "От A до Z" },
  { value: "za", label: "От Z до A" },
];

type FilterProps = {
  category: string;
  categories: string[];
  count: number;
  sort: string;
  search: string;
  handleChangeCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangeSort: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function declOfNum(number: number, words: string[]) {
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
}

const Filter: React.FC<FilterProps> = ({
  category,
  categories,
  count,
  sort,
  search,
  handleChangeCategory,
  handleChangeSort,
  handleChangeSearch,
}) => {
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <label>Фильтровать:</label>
          <select className="form-control" value={category} onChange={handleChangeCategory}>
            <option value="">{DEFAULT_CATEGORY}</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label>Сортировать по: </label>
          <select className="form-control" value={sort} onChange={handleChangeSort}>
            {SORT_OPTIONS.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label>Поиск </label>
          <input
            type="text"
            className="form-control"
            value={search}
            onChange={handleChangeSearch}
            placeholder="Введите название товара"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">Найдено {count} {declOfNum(count, ['товар', 'товара', 'товаров'])}</div>
      </div>
    </>
  );
};

export default Filter;