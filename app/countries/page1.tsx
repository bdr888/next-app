'use client';

import React, { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState([]);
  const url = 'https://dummyjson.com/products';

  useEffect(
    () =>
      async function getData() {
        try {
          const response = await fetch(url);
          const data = await response.json();
          setData(data);
        } catch (error) {
          console.log(error);
        }

        getData();
      },
    [],
  );
  return (
    <div>
      {data.map((item) => (
        <div key={item.description}>{item.description}</div>
      ))}
    </div>
  );
}
