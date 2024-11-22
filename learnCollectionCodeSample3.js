const continents = ['Africa', 'Asia', 'Europe', 'North America', 'South America'];
const myCont = continents.filter(continent => continent.startsWith('A'))
console.log('myCont>>> ', myCont)//Output: [ 'Africa', 'Asia' ]
//////////////////////////////////////////////////////////
const myCont = continents.filter(continent => continent.endsWith('pe'))
console.log('myCont>>> ', myCont)//Output: [ 'Europe' ]
/////////////////////////////////////////////////
const numbers = [-1, -2, 20, 40, 50]
const test = numbers.every(number => {
  return number > 0
})
console.log("test", test)//Output: false. Return TRUE if const numbers = [1, 2, 20, 40, 50]
/////////////////////////////////////////////////////////
const numbers = [-1, -2, 20, 40, 50]
const test = numbers.some(number => {
  return number > 0
})
console.log("test", test)//Output: true
///////////////////////////////////////////////////////////////
const names = ['michael', 'nguyen', 'kelvin', 'linh', 'dung']
const newNames = names.map(name => name.toUpperCase())
console.log('newnames>> ', newNames)//Output: [ 'MICHAEL', 'NGUYEN', 'KELVIN', 'LINH', 'DUNG' ]
///////////////////////////////////////////////////////
letters = ['a', 'b', 'a', 'b', 'c', 'd', 'a']
let count = {}
letters.forEach(item => {
  if (count[item]){
    count[item]++//count[item] += 1
  } else{
    count[item] = 1
  }
})
console.log("count", count)//Output: { a: 3, b: 2, c: 1, d: 1 }
////////////////////////
const numberss = [1, 2, 3, 4, 5];
let sum = 0;
numberss.forEach(item => {
  sum += item;
})
console.log('SUM2>> ',sum);//Output: 15
/////////////////////////////////////////////////////////////////////////////////////
const products = [
  {
    name: 'laptop',
    price: 1000,
    customer: 'Max',
    income: 130000,
    address:[
      {
        street: '555 Main street',
        city: 'New York',
        country: 'US'
      }
    ]
  },
  {
    name: 'desktop',
     price: 1000,
    count: 2,
    customer: 'Dex',
    income: 100000,
    address:[
      {
        street: '2427 Sutton street',
        city: 'London',
        country: 'UK'
      }
    ]
  },
  {
    name: 'phone',
     price: 1000,
    count: 10,
    customer: 'Neil',
    income: 90000,
    address:[
      {
        street: '5757 Colo street',
        city: 'Paris',
        country: 'French'
      }
    ]
  }
];
function getNote() {
  for (let item of products){
    if (item.name === 'laptop'){
      return 'I love laptop 4'
    } else if (item.name === 'desktop'){
      return 'I love desktop'
    } else {
      return 'I love phone'
    }
  }
  // products.forEach(item=> {

  //   if(item.name == "laptop"){
  //      console.log('Name>> ', item.name)
  //     return `The labtop left over ${item.count}`
  //   } else if (item.name =='desktop'){
  //     return `The desktop left over ${item.count}`
  //   } else{
  //     return `No longer desktop and labtop in stock`
  //   }
  // })

}
let countt =0
const count22 = products.map(item => {
       item.address.forEach(address =>{
           this.address = `${address.street +', '+ address.city +" "+ address.country}`
         if(address.country === 'US'){
           address.price = item.price > 1000 ? item.price - 100 : item.price + 100
           this.finalPrice = address.price
         } else if (address.country === 'UK'){
           address.price = item.price > 500 ? `Increase price by ${item.price * 0.1}`: `Decrease price by ${item.price - 100}`
            this.finalPrice = address.price
         } else {
           address.price = item.price * 1.05
            this.finalPrice = address.price
         }
       })
  console.log('address now', item)
  return {
    name: item.name =='laptop' ? "Luxury labtop" : item.name,
    totalPrice: item.price * item.count > 2000 ? "Expensive" : "Cheap",
    totalAssets: products.reduce((sum, item) =>{
      return sum + item.price
    }, 0),
    note: item.name == 'laptop' ? 'I love laptop' : item.name =="desktop" ?'I love desktop' : 'I love phone',
    sum: item.count > 9 ? `${item.count} High Inventory` : `${item.count} Low Inventory`,
    total: countt++,
    fullname: item.name == 'laptop'? 'Michael Nguyen': item.name == 'desktop' ? 'James Nguyen' : 'John Nguyen',
    price: this.finalPrice,
    address: this.address,
    income: item.income > 100000 && item.income < 150000? 'High Income' : 'Low Income',
    foodTem: getFoodTem(item),
    totalIncome: products.filter(item=> {
      return item.income == 90000 ? "Hello":'Broke' || item.income == 100000 || item.income == 130000
    }).map(item => item.income == 90000 ? item.income + 1000 : item.income == 100000 ? item.income + 2000 : item.income).filter(item => {
      if(item == 130000){
        console.log("YYYYY")
      }
    })
  }
})

function getFoodTem(item){
 
  if(item.income == 90000){
    return `${item.customer} Family with low income ${item.income}`
  } else if(item.income == 100000){
    return `${item.customer} Family with medium income ${item.income}`
  } else {
    return `${item.customer} Family with high income ${item.income}`
  }
}
console.log('Count me>>', count22)
//////////////////////////////////////////////////////////////////
var options = [
  { name: 'One', assigned: true }, 
  { name: 'Two', assigned: false }, 
  { name: 'Three', assigned: true }, 
];

var reduced = options.reduce(function(filtered, option) {
  if (option.assigned) {
     var someNewValue = { name: option.name, newProperty: 'Foo' }
     filtered.push(someNewValue);
  }
  return filtered;
}, []);

document.getElementById('output').innerHTML = JSON.stringify(reduced);
//////////////////////////////
var data = [
  {
      "pmid": 12637528,           
      "citation_count": 75
  },
  {
      "pmid": 12732634,          
      "citation_count": 49
  },
  {
      "pmid": 15118089,           
      "citation_count": 88
  }
]
// let iIndex =  data.map(d => d.citation_count).filter( d => d >=50);
const result = data.reduce((result, { citation_count }) => {
  if (citation_count >= 50) {
    result.push(citation_count)
  }
  return result
}, [])

console.log(result)
/////////////////////////////////////////////////////////////////
var devs = [
  {
      name: 'A',
      age: 26,
      tech: ['JavaScript','React'],
      addr:{
          country:'India',
          city:'Pune'
      }
  },
  {
      name: 'B',
      age: 25,
      tech: ['Node','AngularJs'],
      addr:{
          country:'USA',
          city:'NY'
      }
  },
  {
      name: 'C',
      age: 27,
      tech: ['Java','AWS'],
      addr:{
          country:'UK',
          city:'London'
      }
  }
]

let newArr =devs.filter(temp => temp.tech.includes('React')).map(({name,tech}) => ({name,tech}));
console.log(newArr);//Just display 2 fields only in the object (name, tech)
//////////////////////////////////
var devs = [
  {
      name: 'A',
      age: 26,
      tech: ['JavaScript','React'],
      addr: {country:'India', city:'Pune'}
  },
  {
      name: 'B',
      age: 25,
      tech: ['Node','AngularJs'],
      addr: {country:'USA', city:'NY'}
  },
  {
      name: 'C',
      age: 27,
      tech: ['React','AWS'],
      addr: {country:'UK', city:'London'}
  }
];

// let res = devs.reduce((acc, {name, tech}) =>
// {
//   tech.includes("React") && acc.push({name, tech});
//   return acc;
// }, []);
let res = devs.filter(item=>item.tech.includes('React')).map(item=>{
  return {
      name: item.name,
      tech: item.tech
  }
})//GOOD
let newArr =devs.filter(temp => temp.tech.includes('React')).map(({name,tech}) => ({name,tech}));
console.log('LINH>> ',newArr);//GOOD
[
  {
      "name": "A",
      "tech": [
          "JavaScript",
          "React"
      ]
  },
  {
      "name": "C",
      "tech": [
          "React",
          "AWS"
      ]
  }
]

console.log(res);
/////////////////////////////////////////////////
const newArray = [];
const mainArray = [{
    id: 1,
    name: "Shoes",
    stock: 5,
    price: 10
  },
  {
    id: 2,
    name: "Bag",
    stock: 10,
    price: 50
  },
];

function clicked(inp) {
  let exist = newArray.find(ele => ele.id === inp)
  if(exist) {
    exist.stock++
  } else {
    let {id,name, price} = mainArray.find(ele => ele.id === inp)
    exist = {id,name, price, stock: 1};
    newArray.push({...exist})
  }
  console.log('newArray :', newArray)
  console.log('mainArray :', mainArray)
}
//////////////////////////////////////////////////////////////////
var devs = [
  {
      name: 'A',
      age: 26,
      tech: ['JavaScript','React'],
      addr:{
          country:'India',
          city:'Pune'
      }
  },
  {
      name: 'B',
      age: 25,
      tech: ['Node','AngularJs'],
      addr:{
          country:'USA',
          city:'NY'
      }
  },
  {
      name: 'C',
      age: 27,
      tech: ['Java','AWS'],
      addr:{
          country:'UK',
          city:'London'
      }
  }
]
mydata = devs.filter(item=> item.name.includes('C')).map(({name,age})=> ({name,age}))
newArr = devs.filter(item => item.age == 27).map(({name, tech})=>({name, tech}) )

test2 = devs.filter(item=>item.includes("B")).map(item=>item.name)

arrMap = devs.map(({name, age})=> ({name, age}))

// let newArr =devs.filter(temp => temp.tech.includes('React')).map(({name,tech}) => ({name,tech}));
console.log('mydata>>> ', test2);//Just display files (name, age)
//////////////////////////////////////////
const stations = ["New Haven", "West Haven", "Milford (closed)", "Stratford"];
const line = stations
  .filter((name) => !name.endsWith("(closed)"))
  .flatMap((name, idx, arr) => {
    // Without the arr argument, there's no way to easily access the
    // intermediate array without saving it to a variable.
    if (idx === arr.length - 1) return []; // last station has no next station
    return [`${name} - ${arr[idx + 1]}`];
  });
console.log(line); // ['New Haven - West Haven', 'West Haven - Stratford']
///////////////////////////////////////////////////////////////
var arr = ["one","two","three"];
arr.forEach(function(part) {
  part = "four";
  return "four";
})
// console.log('mikearr', arr);
// alert(arr);
arr.forEach(function(item, index, theArray) {
  if(item.includes("one")){
    arr[index] = "hello world";
  } else if(item == "three"){
    // arr[index] = "hello Bao";
     arr.splice(index, 1)
    arr.unshift(item)
  }
 
});
console.log('arr>>>',arr );//[
//     "three",
//     "hello world",
//     "two"
// ]
///////////////////////////////////////////////////////

var stuff= ["uyuuyu", "76gyuhj***", "uiyghj", "56tyg", "juijjujh***"];

for(var i = 0; i < stuff.length; i++)
{
    if(stuff[i].indexOf('***') != -1)
{
        stuff[i] = stuff[i].replace('***','0')
    // this is where i guess the replacing would go
}
console.log(stuff[i]);
}
//////////////////////////////////////
let colorOptions = ["green", "blue", "orange"];
let optionsArray = [];

colorOptions.forEach((item) => {
   let colorOption = document.createElement("div");
   colorOption.innerText = item;
   colorOption.setAttribute('class','dmo')
   colorOption.style.backgroundColor = item;
   optionsArray.push(colorOption);    
});


optionsArray.forEach((item) => {
  console.log(item);
  document.body.appendChild(item);
});