'use client';

import { useEffect, useState } from 'react';

export default function GetUsers() {
  const [data, setData] = useState([]);

  useEffect(
    () =>
      async function getData() {
        try {
          const url = 'https://dummyjson.com/produccts';
          const result = await fetch(url);
          const data = await result.json();
          setData(data.products);
        } catch (error) {
          console.log(error);
        }

        getData();
      },
    [],
  );

  return (
    <div>
      {data?.map((item) => (
        <div>
          <div>{item.description}</div>
          {/* <img src={item.thumbnail} /> */}
        </div>
      ))}
    </div>
  );
}
