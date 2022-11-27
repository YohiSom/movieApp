const moviesApi = async () => {
  const res = await fetch("https://swapi.dev/api/films/");

  if (res) {
    const data = await res.json();

    if (res.ok == false) {
      throw Error(res.message);
    }

    return data.results;
  }
};

export { moviesApi };
