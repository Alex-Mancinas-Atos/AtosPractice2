import axios from "axios";
import * as tingle from 'tingle.js'


const url = "https://restcountries.com/v3.1/all";

let paisp = document.getElementById('pais')!;
axios
  .get(url)
  .then((data) =>  {
    const paisesData = data.data
    console.log(paisesData)
    extractData(paisesData)})
  .catch((err) => console.log(err));


  const extractData = (paisesData: any)=>{
    let body ='';





    
    for(let i = 0; i<paisesData.length ; i++){
        let item: any;  
      
        const languages = Object.keys(paisesData[i].languages|| {}).map((key)=>paisesData[i].languages[key])
        
        body+= `<tr>
            
            <td onclick=()>${paisesData[i].name.official}</td>
            <td>${paisesData[i].capital}</td>
            <td>${paisesData[i].region}</td>
            <td >${reduceToString(languages, "No capital")}</td>
            <td>${paisesData[i].population}</td>
            <td><img src="${paisesData[i].flags.png}"></td>
            
        </tr>`
       
    }
    
    document.getElementById('data')!.innerHTML = body

  }


  let reduceToString = function reduceToString(str_arr: string[] , default_message: string) {
    const valid_array = (typeof str_arr === "object" && str_arr.length > 0);
    return valid_array ? str_arr.reduce((f, l) => `${f}, ${l} `) : default_message;
}

function sort(){
  
}

var modal = new tingle.modal({
  footer: true,
  stickyFooter: false,
  closeMethods: ['overlay', 'button', 'escape'],
  closeLabel: "Close",
  cssClass: ['custom-class-1', 'custom-class-2'],
  onOpen: function() {
      console.log('modal open');
  },
  onClose: function() {
      console.log('modal closed');
  },
  beforeClose: function() {
      // here's goes some logic
      // e.g. save content before closing the modal
      return true; // close the modal
      return false; // nothing happens
  }
});

// set content
modal.setContent('<h1>here\'s some content</h1>');

// add a button
modal.addFooterBtn('Button label', 'tingle-btn tingle-btn--primary', function() {
  // here goes some logic
  modal.close();
});

// add another button
modal.addFooterBtn('Dangerous action !', 'tingle-btn tingle-btn--danger', function() {
  // here goes some logic
  modal.close();
});

// open modal
modal.open();

// close modal
modal.close();