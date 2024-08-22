'use client';

import React, { useEffect, useState } from 'react';
import { countryData } from './countries';

interface TimelineEntry {
  date?: string;
  gdp?: number;
  population?: number;
}

interface Country {
  name: string;
  total_population: number;
  area: number;
  total_gdp: number;
  timeline: TimelineEntry[];
  average_population?: number;
  timeline_entries?: number;
}

interface HighestPopulation {
  name: string | null;
  population: number;
}

export default function Countries() {
  const [countries, setCountries] = React.useState<Country[] | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedYear, setSelectedYear] = useState('2018');
  const [highestPop, setHighestPop] = useState<HighestPopulation | null>(null);
  console.log(`🤙🐊🏄‍♀️🤙🐊🏄 highestPop: ${highestPop} 🤙🐊🏄‍♀️🤙🐊🏄`);
  const [globalGdp, setGlobalGdp] = useState<number>();

  function getGlobalGdp() {
    const totalGdp = countries?.reduce(
      (sum, country) => sum + country.total_gdp || 0,
      0,
    );
    setGlobalGdp(totalGdp);
  }

  function findCountryWithHighestPopulation() {
    const highest = countries?.reduce<HighestPopulation>(
      (highest, country) => {
        const entryForYear = country.timeline.find(
          (entry) =>
            entry.date &&
            entry.date.substring(entry.date.length - 4) === selectedYear,
        );

        const populationForYear = entryForYear?.population ?? 0;

        if (populationForYear > highest.population) {
          return { name: country.name, population: populationForYear };
        }

        return highest;
      },
      { name: null, population: -1 },
    );
    setHighestPop(highest || null);
  }

  function calculateTotalGDP(country: Country): number {
    return country.timeline.reduce((sum, entry) => {
      if (entry && entry.gdp !== undefined) {
        return sum + entry.gdp;
      }
      return sum;
    }, 0);
  }

  function calculateAvgPop(country: Country): number {
    const totalPopulation = country.timeline.reduce((sum, entry) => {
      if (entry.population !== undefined) return sum + entry.population;
      return sum;
    }, 0);
    const timelineEntries = country.timeline.length;

    const avgPop = timelineEntries > 0 ? totalPopulation / timelineEntries : 0;
    return avgPop;
  }

  function updateData() {
    const updatedCountryData = countryData?.map((country) => {
      let calculatedGdp = calculateTotalGDP(country);
      let calculatedAvgPop = calculateAvgPop(country);
      return {
        ...country,
        total_gdp: calculatedGdp,
        average_population: calculatedAvgPop,
        timeline_entries: country.timeline.length,
      };
    });

    setCountries(updatedCountryData);
  }

  useEffect(() => {
    findCountryWithHighestPopulation();
  }, [selectedYear]);

  useEffect(() => {
    updateData();
  }, []);

  useEffect(() => {
    getGlobalGdp();
  }, [countries]);

  return (
    <div className="min-h-screen">
      <div className="py-4">Global GDP: {globalGdp}</div>
      <div className="py-4">Selected Country: {selectedCountry?.name}</div>
      <div className="py-4">Selected Year: {selectedYear}</div>
      <div className="pb-4">
        In {selectedYear} {highestPop?.name} had the highest population of{' '}
        {highestPop?.population}
      </div>
      <div>
        <div className="grid grid-cols-5 gap-4 justify-start font-extrabold">
          <div>Name</div>
          <div>Total Population</div>
          <div>Average population</div>
          <div>Total GDP</div>
          <div>Years of data</div>
        </div>
        {countries?.map((country) => (
          <div
            className="grid grid-cols-5 gap-4 justify-start"
            key={country.name}
            onClick={() => setSelectedCountry(country)}
          >
            <div>{country.name}</div>
            <div>{country.total_population}</div>
            <div>{country?.average_population || 'n/a'}</div>
            <div>{country.total_gdp}</div>
            <div>{country.timeline_entries}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
