'use client';

import { useEffect, useState } from 'react';

export default function GetUsers() {
  const [data, setData] = useState([]);

  useEffect(
    () =>
      async function fetchData() {
        try {
          const response = await fetch('https://dummyjson.com/products');
          const data = await response.json();
          setData(data.products);
        } catch (error) {
          console.log(error);
        }

        fetchData();
      },
    [],
  );

  return (
    <div>
      {data?.map((item) => (
        <div>
          <div>{item.description}</div>
          <div>{item.thumbnail}</div>
        </div>
      ))}
    </div>
  );
}
