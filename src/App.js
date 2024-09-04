import React, { useEffect, useState } from "react";
import Genogram from "./components/Genogram.js";
// import Explain from './components/Explain.js';
import "./App.css";

// const genoData = [
//   {
//     key: "66d8162f1d98eac4786c9148",
//     n: "Aaron",
//     s: "M",
//     m: "66d8162ff869a265791a63b2",
//     f: "66d8162f5ad03a15d9ec7967",
//     spouse: "66d8162fbefbe39e9793beea",
//   },
//   {
//     key: "66d8162fbefbe39e9793beea",
//     n: "Alice",
//     s: "F",
//     m: "66d8162f8dc6942c206028c7",
//     f: "66d8162f0db5f6166f19a218",
//   },
//   {
//     key: "66d8162fcdf2df7ebdcd4761",
//     n: "Bob",
//     s: "M",
//     m: "66d8162fbefbe39e9793beea",
//     f: "66d8162f1d98eac4786c9148",
//     spouse: "66d8162fca64c8e65dcae8bd",
//   },
//   {
//     key: "66d8162fca64c8e65dcae8bd",
//     n: "Barbara",
//     s: "F",
//   },
//   {
//     key: "66d8162f8f69c14743b30d15",
//     n: "Bill",
//     s: "M",
//     m: "66d8162fbefbe39e9793beea",
//     f: "66d8162f1d98eac4786c9148",
//     spouse: ["66d8162f871e5490704b1dde", "66d8162f8f69c14743b30501"],
//   },

//   {
//     key: "66d8162f8f69c14743b30501",
//     n: "Anna",
//     s: "F",
//     m: "66d8162fbefbe39e9793beea",
//     f: "66d8162f1d98eac4786c9148",
//     spouse: "66d8162f8f69c14743b30d15",
//   },

//   {
//     key: "66d8162f871e5490704b1dde",
//     n: "Brooke",
//     s: "F",
//   },
//   {
//     key: "66d8162fd0972b12b6b485d6",
//     n: "Claire",
//     s: "F",
//     m: "66d8162fbefbe39e9793beea",
//     f: "66d8162f1d98eac4786c9148",
//   },
//   {
//     key: "66d8162f7d2d6683c06817dc",
//     n: "Carol",
//     s: "F",
//     m: "66d8162fbefbe39e9793beea",
//     f: "66d8162f1d98eac4786c9148",
//   },
//   {
//     key: "66d8162fab9a858192e3bc1a",
//     n: "Chloe",
//     s: "F",
//     m: "66d8162fbefbe39e9793beea",
//     f: "66d8162f1d98eac4786c9148",
//     spouse: "66d8162fe33a61fcad679327",
//   },
//   {
//     key: "66d8162fe33a61fcad679327",
//     n: "Chris",
//     s: "M",
//   },
//   {
//     key: "66d8162fa50c2ecced0a0196",
//     n: "Ellie",
//     s: "F",
//     m: "66d8162fca64c8e65dcae8bd",
//     f: "66d8162fcdf2df7ebdcd4761",
//   },
//   {
//     key: "66d8162fda9d02db42902e99",
//     n: "Dan",
//     s: "M",
//     m: "66d8162fca64c8e65dcae8bd",
//     f: "66d8162fcdf2df7ebdcd4761",
//   },
//   {
//     key: "66d8162f62e22512734759b2",
//     n: "Elizabeth",
//     s: "F",
//     spouse: "66d8162f2b6fd541a8fa4dee",
//   },
//   {
//     key: "66d8162f2b6fd541a8fa4dee",
//     n: "David",
//     s: "M",
//     m: "66d8162f871e5490704b1dde",
//     f: "66d8162f8f69c14743b30d15",
//   },
//   {
//     key: "66d8162f119a40a1196ab27f",
//     n: "Emma",
//     s: "N",
//     m: "66d8162f871e5490704b1dde",
//     f: "66d8162f8f69c14743b30d15",
//   },
//   {
//     key: "66d8162f98cfbf87141ecb4e",
//     n: "Evan",
//     s: "M",
//     m: "66d8162fab9a858192e3bc1a",
//     f: "66d8162fe33a61fcad679327",
//   },
//   {
//     key: "66d8162f3c2254456788f916",
//     n: "Ethan",
//     s: "M",
//     m: "66d8162fab9a858192e3bc1a",
//     f: "66d8162fe33a61fcad679327",
//   },
//   {
//     key: "66d8162f1af7e108367c4102",
//     n: "Eve",
//     s: "F",
//     spouse: "66d8162f3c2254456788f916",
//   },
//   {
//     key: "66d8162f7b0f852ba8b2c73d",
//     n: "Emily",
//     s: "F",
//     m: "66d8162fab9a858192e3bc1a",
//     f: "66d8162fe33a61fcad679327",
//   },
//   {
//     key: "66d8162f457bfbbfc33c7b6d",
//     n: "Fred",
//     s: "F",
//     m: "66d8162f1af7e108367c4102",
//     f: "66d8162f3c2254456788f916",
//     t: "d",
//   },
//   {
//     key: "66d8162f63fe827f2c17d23a",
//     n: "Faith",
//     s: "F",
//     m: "66d8162f1af7e108367c4102",
//     f: "66d8162f3c2254456788f916",
//     t: "d",
//   },
//   {
//     key: "66d8162f1d5ab5921fa0f9b9",
//     n: "Felicia",
//     s: "F",
//     m: "66d8162f62e22512734759b2",
//     f: "66d8162f2b6fd541a8fa4dee",
//   },
//   {
//     key: "66d8162f9fed4340a1b12928",
//     n: "Frank",
//     s: "M",
//     m: "66d8162f62e22512734759b2",
//     f: "66d8162f2b6fd541a8fa4dee",
//   },
//   {
//     key: "66d8162ff869a265791a63b2",
//     n: "Paternal Grandfather",
//     s: "M",
//     m: "66d8162fc19708d468c76d4e",
//     f: "66d8162fe4e08bab547838ff",
//     spouse: "66d8162f5ad03a15d9ec7967",
//   },
//   {
//     key: "66d8162f5ad03a15d9ec7967",
//     n: "Paternal Grandmother",
//     s: "F",
//   },
//   {
//     key: "66d8162fe4e08bab547838ff",
//     n: "Paternal Great",
//     s: "M",
//     spouse: "66d8162fc19708d468c76d4e",
//   },
//   {
//     key: "66d8162fc19708d468c76d4e",
//     n: "Paternal Great",
//     s: "F",
//   },
//   {
//     key: "66d8162fc4762d3723fb691e",
//     n: "Great Uncle",
//     s: "M",
//     m: "66d8162fc19708d468c76d4e",
//     f: "66d8162fe4e08bab547838ff",
//   },
//   {
//     key: "66d8162fe707d230c8a8909b",
//     n: "Great Aunt",
//     s: "F",
//     m: "66d8162fc19708d468c76d4e",
//     f: "66d8162fe4e08bab547838ff",
//   },
//   {
//     key: "66d8162f077b65d8f4bf4a6e",
//     n: "Uncle",
//     s: "M",
//     m: "66d8162f5ad03a15d9ec7967",
//     f: "66d8162ff869a265791a63b2",
//   },
//   {
//     key: "66d8162f8dc6942c206028c7",
//     n: "Maternal Grandfather",
//     s: "M",
//     spouse: "66d8162f0db5f6166f19a218",
//   },
//   {
//     key: "66d8162f0db5f6166f19a218",
//     n: "Maternal Grandmother",
//     s: "F",
//     m: "66d8162f80d76d9b9fd6c0b1",
//     f: "66d8162fef37a2e03266499c",
//   },
//   {
//     key: "66d8162fe695d5841e48af63",
//     n: "Aunt",
//     s: "F",
//     m: "66d8162f0db5f6166f19a218",
//     f: "66d8162f8dc6942c206028c7",
//   },
//   {
//     key: "66d8162fb2c7fb08f60ae03f",
//     n: "Uncle",
//     s: "M",
//     spouse: "66d8162fe695d5841e48af63",
//   },
//   {
//     key: "66d8162f19a55231b67c1d33",
//     n: "Cousin",
//     s: "M",
//     m: "66d8162fe695d5841e48af63",
//     f: "66d8162fb2c7fb08f60ae03f",
//   },
//   {
//     key: "66d8162fef37a2e03266499c",
//     n: "Maternal Great",
//     s: "M",
//     spouse: "66d8162f80d76d9b9fd6c0b1",
//   },
//   {
//     key: "66d8162f80d76d9b9fd6c0b1",
//     n: "Maternal Great",
//     s: "F",
//     m: "66d8162fdd4b51a8274d7a81",
//     f: "66d8162f719a2d5ecc802240",
//   },
//   {
//     key: "66d8162f1973cae12c2bd1d1",
//     n: "Great Uncle",
//     s: "M",
//     m: "66d8162fef37a2e03266499c",
//     f: "66d8162f80d76d9b9fd6c0b1",
//   },
//   {
//     key: "66d8162fdef40bca3342e763",
//     n: "Great Aunt",
//     s: "M",
//     m: "66d8162fef37a2e03266499c",
//     f: "66d8162f80d76d9b9fd6c0b1",
//   },
//   {
//     key: "66d8162fdd4b51a8274d7a81",
//     n: "Maternal Great Great",
//     s: "F",
//     spouse: "66d8162f719a2d5ecc802240",
//   },
//   {
//     key: "66d8162f719a2d5ecc802240",
//     n: "Maternal Great Great",
//     s: "M",
//   },
//   {
//     s: "LinkLabel",
//     key: -42,
//   },
//   {
//     s: "LinkLabel",
//     key: -43,
//   },
//   {
//     s: "LinkLabel",
//     key: -44,
//   },
//   {
//     s: "LinkLabel",
//     key: -45,
//   },
//   {
//     s: "LinkLabel",
//     key: -46,
//   },
//   {
//     s: "LinkLabel",
//     key: -47,
//   },
//   {
//     s: "LinkLabel",
//     key: -48,
//   },
//   {
//     s: "LinkLabel",
//     key: -49,
//   },
//   {
//     s: "LinkLabel",
//     key: -50,
//   },
//   {
//     s: "LinkLabel",
//     key: -51,
//   },
//   {
//     s: "LinkLabel",
//     key: -52,
//   },
//   {
//     s: "LinkLabel",
//     key: -53,
//   },
// ];

const data = [
  {
    key: "66d6f476bdea5f8ea7842059",
    n: "Viola Von",
    s: "F",
  },
  {
    key: "66d6f476bdea5f8ea784205c",
    n: "Freda Dooley",
    s: "M",
    m: "66d6f476bdea5f8ea7842059",
  },
  {
    key: "66d6f476bdea5f8ea784205e",
    n: "Lois Emmerich",
    s: "F",
  },
  {
    key: "66d6f476bdea5f8ea7842060",
    n: "Erick Klein",
    s: "M",
    m: "66d6f476bdea5f8ea784205e",
    f: "66d6f476bdea5f8ea784205c",
  },
  {
    key: "66d6f476bdea5f8ea7842062",
    n: "Gabriel Koss",
    s: "F",
    m: "66d6f476bdea5f8ea784205e",
    f: "66d6f476bdea5f8ea784205c",
  },
  {
    key: "66d6f476bdea5f8ea7842064",
    n: "Austin Bode",
    s: "M",
    m: "66d6f476bdea5f8ea784205e",
    f: "66d6f476bdea5f8ea784205c",
  },
  {
    key: "66d6f476bdea5f8ea7842069",
    n: "Miss Mae Greenfelder",
    s: "M",
  },
  {
    key: "66d6f476bdea5f8ea784206b",
    n: "Christie Shields",
    s: "M",
    f: "66d6f476bdea5f8ea7842069",
  },
  {
    key: "66d6f476bdea5f8ea784206d",
    n: "Marilyn Lakin",
    s: "F",
  },
  {
    key: "66d6f476bdea5f8ea784206f",
    n: "Kristy Wunsch",
    s: "F",
    m: "66d6f476bdea5f8ea784206d",
    f: "66d6f476bdea5f8ea784206b",
  },
  {
    key: "66d6f476bdea5f8ea7842071",
    n: "Dan Cartwright",
    s: "F",
    m: "66d6f476bdea5f8ea784206d",
    f: "66d6f476bdea5f8ea784206b",
  },
  {
    key: "66d6f476bdea5f8ea7842073",
    n: "Dr. Danny Jacobson-Mueller",
    s: "M",
    m: "66d6f476bdea5f8ea784206d",
    f: "66d6f476bdea5f8ea784206b",
  },
  {
    key: "66d6f476bdea5f8ea7842078",
    n: "Nicolas Stracke",
    s: "F",
  },
  {
    key: "66d6f476bdea5f8ea784207a",
    n: "Daisy Sawayn",
    s: "M",
    m: "66d6f476bdea5f8ea7842078",
  },
  {
    key: "66d6f476bdea5f8ea784207c",
    n: "Mr. Dean Kulas-Erdman",
    s: "F",
  },
  {
    key: "66d6f476bdea5f8ea784207e",
    n: "Olga Prosacco",
    s: "F",
    m: "66d6f476bdea5f8ea784207c",
    f: "66d6f476bdea5f8ea784207a",
  },
  {
    key: "66d6f476bdea5f8ea7842080",
    n: "Lynda Romaguera",
    s: "M",
    m: "66d6f476bdea5f8ea784207c",
    f: "66d6f476bdea5f8ea784207a",
  },
  {
    key: "66d6f476bdea5f8ea7842082",
    n: "Delbert Murray",
    s: "F",
    m: "66d6f476bdea5f8ea784207c",
    f: "66d6f476bdea5f8ea784207a",
  },
  {
    key: "66d6f476bdea5f8ea7842087",
    n: "Ms. Paula Rau",
    s: "F",
  },
  {
    key: "66d6f476bdea5f8ea7842089",
    n: "Preston Yost Jr.",
    s: "M",
    m: "66d6f476bdea5f8ea7842087",
  },
  {
    key: "66d6f476bdea5f8ea784208b",
    n: "Marie Keebler IV",
    s: "F",
  },
  {
    key: "66d6f476bdea5f8ea784208d",
    n: "Eula Fisher",
    s: "F",
    m: "66d6f476bdea5f8ea784208b",
    f: "66d6f476bdea5f8ea7842089",
  },
  {
    key: "66d6f476bdea5f8ea784208f",
    n: "Roger Mraz",
    s: "M",
    m: "66d6f476bdea5f8ea784208b",
    f: "66d6f476bdea5f8ea7842089",
  },
  {
    key: "66d6f476bdea5f8ea7842091",
    n: "Ellen Beahan",
    s: "M",
    m: "66d6f476bdea5f8ea784208b",
    f: "66d6f476bdea5f8ea7842089",
  },
  {
    key: "66d6f476bdea5f8ea7842096",
    n: "Lyle Mertz",
    s: "F",
  },
  {
    key: "66d6f476bdea5f8ea7842098",
    n: "Dr. Lance Ledner",
    s: "M",
    m: "66d6f476bdea5f8ea7842096",
  },
  {
    key: "66d6f476bdea5f8ea784209a",
    n: "Robert Romaguera",
    s: "F",
  },
  {
    key: "66d6f476bdea5f8ea784209c",
    n: "Dr. Darryl Williamson",
    s: "M",
    m: "66d6f476bdea5f8ea784209a",
    f: "66d6f476bdea5f8ea7842098",
  },
  {
    key: "66d6f476bdea5f8ea784209e",
    n: "Clay Schmitt",
    s: "F",
    m: "66d6f476bdea5f8ea784209a",
    f: "66d6f476bdea5f8ea7842098",
  },
  {
    key: "66d6f476bdea5f8ea78420a0",
    n: "Leroy DuBuque-Kerluke",
    s: "M",
    m: "66d6f476bdea5f8ea784209a",
    f: "66d6f476bdea5f8ea7842098",
  },
  {
    key: "66d6f476bdea5f8ea78420a5",
    n: "Camille Kub II",
    s: "M",
  },
  {
    key: "66d6f476bdea5f8ea78420a7",
    n: "Virgil Boehm",
    s: "M",
    f: "66d6f476bdea5f8ea78420a5",
  },
  {
    key: "66d6f476bdea5f8ea78420a9",
    n: "Emanuel Hoeger",
    s: "F",
  },
  {
    key: "66d6f476bdea5f8ea78420ab",
    n: "Tasha Dicki",
    s: "F",
    m: "66d6f476bdea5f8ea78420a9",
    f: "66d6f476bdea5f8ea78420a7",
  },
  {
    key: "66d6f476bdea5f8ea78420ad",
    n: "Cecilia Conroy",
    s: "F",
    m: "66d6f476bdea5f8ea78420a9",
    f: "66d6f476bdea5f8ea78420a7",
  },
  {
    key: "66d6f476bdea5f8ea78420af",
    n: "Kelly Borer",
    s: "M",
    m: "66d6f476bdea5f8ea78420a9",
    f: "66d6f476bdea5f8ea78420a7",
  },
  {
    key: "66d6f476bdea5f8ea78420b4",
    n: "Jeanette Cruickshank",
    s: "F",
  },
  {
    key: "66d6f476bdea5f8ea78420b6",
    n: "Angelina Mosciski II",
    s: "M",
    m: "66d6f476bdea5f8ea78420b4",
  },
  {
    key: "66d6f476bdea5f8ea78420b8",
    n: "Stella Greenholt",
    s: "F",
  },
  {
    key: "66d6f476bdea5f8ea78420ba",
    n: "Horace Ondricka",
    s: "F",
    m: "66d6f476bdea5f8ea78420b8",
    f: "66d6f476bdea5f8ea78420b6",
  },
  {
    key: "66d6f476bdea5f8ea78420bc",
    n: "Mr. Dana Wilkinson",
    s: "M",
    m: "66d6f476bdea5f8ea78420b8",
    f: "66d6f476bdea5f8ea78420b6",
  },
  {
    key: "66d6f476bdea5f8ea78420be",
    n: "Wendell Corwin-Bruen",
    s: "F",
    m: "66d6f476bdea5f8ea78420b8",
    f: "66d6f476bdea5f8ea78420b6",
  },
  {
    key: "66d6f476bdea5f8ea78420c3",
    n: "Diane Nicolas",
    s: "F",
  },
  {
    key: "66d6f476bdea5f8ea78420c5",
    n: "Mable Lubowitz",
    s: "M",
    m: "66d6f476bdea5f8ea78420c3",
  },
  {
    key: "66d6f476bdea5f8ea78420c7",
    n: "Tracy Conroy",
    s: "F",
  },
  {
    key: "66d6f476bdea5f8ea78420c9",
    n: "Dora Mraz",
    s: "M",
    m: "66d6f476bdea5f8ea78420c7",
    f: "66d6f476bdea5f8ea78420c5",
  },
  {
    key: "66d6f476bdea5f8ea78420cb",
    n: "Penny O'Hara",
    s: "F",
    m: "66d6f476bdea5f8ea78420c7",
    f: "66d6f476bdea5f8ea78420c5",
  },
  {
    key: "66d6f476bdea5f8ea78420cd",
    n: "Arnold Bode",
    s: "F",
    m: "66d6f476bdea5f8ea78420c7",
    f: "66d6f476bdea5f8ea78420c5",
  },
  {
    key: "66d6f476bdea5f8ea78420d2",
    n: "Belinda Hoeger",
    s: "F",
  },
  {
    key: "66d6f476bdea5f8ea78420d4",
    n: "Marion Jones",
    s: "M",
    m: "66d6f476bdea5f8ea78420d2",
  },
  {
    key: "66d6f476bdea5f8ea78420d6",
    n: "Chris Braun",
    s: "F",
  },
  {
    key: "66d6f476bdea5f8ea78420d8",
    n: "Cedric Bartoletti-Green",
    s: "F",
    m: "66d6f476bdea5f8ea78420d6",
    f: "66d6f476bdea5f8ea78420d4",
  },
  {
    key: "66d6f476bdea5f8ea78420da",
    n: "Timothy Cole",
    s: "F",
    m: "66d6f476bdea5f8ea78420d6",
    f: "66d6f476bdea5f8ea78420d4",
  },
  {
    key: "66d6f476bdea5f8ea78420dc",
    n: "Lyle Schoen PhD",
    s: "M",
    m: "66d6f476bdea5f8ea78420d6",
    f: "66d6f476bdea5f8ea78420d4",
  },
  {
    key: "66d6f476bdea5f8ea78420e1",
    n: "Billy Heidenreich",
    s: "F",
  },
  {
    key: "66d6f476bdea5f8ea78420e3",
    n: "Mrs. Melissa Reilly",
    s: "M",
    m: "66d6f476bdea5f8ea78420e1",
  },
  {
    key: "66d6f476bdea5f8ea78420e5",
    n: "Velma Medhurst",
    s: "F",
  },
  {
    key: "66d6f476bdea5f8ea78420e7",
    n: "Russell Hills",
    s: "M",
    m: "66d6f476bdea5f8ea78420e5",
    f: "66d6f476bdea5f8ea78420e3",
  },
  {
    key: "66d6f476bdea5f8ea78420e9",
    n: "Brandy Gorczany",
    s: "F",
    m: "66d6f476bdea5f8ea78420e5",
    f: "66d6f476bdea5f8ea78420e3",
  },
  {
    key: "66d6f476bdea5f8ea78420eb",
    n: "Jana Gerhold",
    s: "M",
    m: "66d6f476bdea5f8ea78420e5",
    f: "66d6f476bdea5f8ea78420e3",
  },
  {
    key: "66d6f4ee2b18fdbdde97cc05",
    n: "Jhon Doe",
    s: "M",
    f: "66d6f476bdea5f8ea784205c",
  },
  {
    key: "66d6f54b2b18fdbdde97cc10",
    n: "Jhon Doe",
    s: "M",
    m: "66d6f476bdea5f8ea784209e",
  },
];

const App = () => {
  const [loading, setLoading] = useState(false);
  const [genoData, setGenoData] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);

    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8080/api/members`, {
          signal: abortController.signal,
        });
        const result = await response.json();
        console.log(result);
        setGenoData(result);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => abortController.abort();
  }, []);

  return (
    <div className="App" style={{ marginTop: "-70px" }}>
      {/* <Explain /> */}
      {loading ? <div>Loading...</div> : <Genogram Genogram={genoData} />}
    </div>
  );
};

export default App;
