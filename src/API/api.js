const baseUrl = "https://swapi.dev/api/films/";

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
// const empireStrikesBackMovie = async () => {
//   const res = await fetch(`${baseUrl}2/`);
//   if (res) {
//     const data = await res.json();

//     if (res.ok == false) {
//       throw Error(res.message);
//     }

//     return data;
//   }
// };
// const returnOfTheJediMovie = async () => {
//   const res = await fetch(`${baseUrl}3/`);
//   if (res) {
//     const data = await res.json();

//     if (res.ok == false) {
//       throw Error(res.message);
//     }

//     return data;
//   }
// };
// const phantomMenaceMovie = async () => {
//   const res = await fetch(`${baseUrl}4/`);
//   if (res) {
//     const data = await res.json();

//     if (res.ok == false) {
//       throw Error(res.message);
//     }

//     return data;
//   }
// };
// const attackOfClonesMovie = async () => {
//   const res = await fetch(`${baseUrl}5/`);
//   if (res) {
//     const data = await res.json();

//     if (res.ok == false) {
//       throw Error(res.message);
//     }

//     return data;
//   }
// };
// const revengeOfTheSithMovie = async () => {
//   const res = await fetch(`${baseUrl}6/`);
//   if (res) {
//     const data = await res.json();

//     if (res.ok == false) {
//       throw Error(res.message);
//     }

//     return data;
//   }
// };

export { moviesApi };
