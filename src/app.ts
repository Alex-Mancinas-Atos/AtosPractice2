
import axios from "axios";
import * as tingle from "tingle.js";
let currentPage: number = 0;
const itemsPerPage = 25

function paginateItems(page:number){
  currentPage = page;
  console.log(currentPage);
  const init = page * itemsPerPage;
  const limit = (page * itemsPerPage)+24;
  extractData(paisesData, init, limit)
  
 
}

let order = false;

const url = "https://restcountries.com/v3.1/all";

let paisp = document.getElementById("pais")!;
let paisesData: any;
axios
  .get(url)
  .then((reponse) => {
    paisesData = reponse.data as Array<any>; // * @ referenced array
    const { length } = paisesData;
    sortArray(paisesData);
    paginationItems(length);
    extractData(paisesData);
  })
  .catch((err) => console.log(err));




const paginationItems = (arrayLength: number) => {
  const pages = Math.ceil(arrayLength / itemsPerPage);
 
  const fatherElement = document.getElementById('pagination')!;

  for (let j = 0; j <= pages - 1; j++) {
    const newButtonId = `${j}-pagination-btn`;
    const button = document.createElement('button');
    button.innerHTML = `${j + 1}`;
    button.id = newButtonId;
    button.onclick = paginateItems.bind(this, j);
    fatherElement.appendChild(button);
 }


}


const extractData = (paisesData: any, init: number = 0, limit:number = 24) => {
  let body = "";

  for (let i = init; i <= limit; i++) {


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

const sort = ($e: Event) => {
  $e.preventDefault();
  paisesData.sort(order ? sortAsc : sortDesc);
  paginateItems(currentPage)
  order = !order;
};



document.getElementById('orderArray')?.addEventListener('click', sort);