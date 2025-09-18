export const FilterData = (country, destinations) => {
  return destinations.filter((destination) =>
    destination.country.toLowerCase() === country.toLowerCase()
  );
};