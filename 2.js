const parser = new DOMParser();

const jsonString = `
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}
`;
const data = JSON.parse(jsonString);

const list = data.list;

const result = {
list: [] 
} ;

  list.forEach(list => {
  result.list.push({
  name: list.name,
  age:  list.age,
  prof: list.prof,
  });
 });

console.log(result);