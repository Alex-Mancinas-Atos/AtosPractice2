import axios from "axios";
import * as tingle from "tingle.js";

let order = false;

const url = "https://restcountries.com/v3.1/all";

let paisp = document.getElementById("pais")!;
let paisesData: any;
axios
  .get(url)
  .then((reponse) => {
    paisesData = reponse.data as Array<any>; // * @ referenced array

    sortArray(paisesData);
    extractData(paisesData);
  })
  .catch((err) => console.log(err));

const extractData = (paisesData: any) => {
  let body = "";

  for (let i = 0; i < paisesData.length; i++) {
    let item: any;

    const languages = Object.keys(paisesData[i].languages || {}).map(
      (key) => paisesData[i].languages[key]
    );

    body += `<tr>
            
            <td onclick=()>${paisesData[i].name.official}</td>
            <td>${paisesData[i].capital}</td>
            <td>${paisesData[i].region}</td>
            <td >${reduceToString(languages, "No capital")}</td>
            <td>${paisesData[i].population}</td>
            <td><img src="${paisesData[i].flags.png}"></td>
            
        </tr>`;
  }

  document.getElementById("data")!.innerHTML = body;
};

let reduceToString = function reduceToString(
  str_arr: string[],
  default_message: string
) {
  const valid_array = typeof str_arr === "object" && str_arr.length > 0;
  return valid_array
    ? str_arr.reduce((f, l) => `${f}, ${l} `)
    : default_message;
};

const sortAsc = (a: any, b: any) =>
  a.name.official.localeCompare(b.name.official);

const sortDesc = (a: any, b: any) =>
  b.name.official.localeCompare(a.name.official);

function sortArray(paisesData: Array<any>) {
  paisesData.sort(sortAsc);
}

const sort = ($e:Event) => {
  $e.preventDefault();
  paisesData.sort(order ? sortAsc : sortDesc);
  extractData(paisesData);
  order = !order;
};

document.getElementById('orderArray')?.addEventListener('click',sort);