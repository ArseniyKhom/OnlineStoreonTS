import React from 'react';

function getCartItemWordForm(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return "товар";
  } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
    return "товара";
  } else {
    return "товаров";
  }
}

const Filter = (props) => {
  const { category, categories, handleChangeCategory, count, sort, handleChangeSort, search, handleChangeSearch } = props;

  return (
    <div className="row">
      <div className="col-md-4">Найдено {count} {getCartItemWordForm(count)}</div>
      <div className="col-md-4">
        <label>Сортировать по: </label>
        <select className="form-control" value={sort} onChange={handleChangeSort}>
          <option value="">Умолчанию</option>
          <option value="lowest">Возрастанию цены</option>
          <option value="highest">Убыванию цены</option>
          <option value="az">От A до Z</option>
          <option value="za">От Z до A</option>
        </select>
      </div>
      <div className="col-md-4">
        <label>Фильтровать:</label>
        <select className="form-control" value={category} onChange={handleChangeCategory}>
          <option value="">Все</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
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
  );
};

export default Filter;
