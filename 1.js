const parser = new DOMParser();

const xmlString = `
  <list>
    <student>
      <name lang="en">
        <first>Ivan</first>
        <second>Ivanov</second>
      </name>
      <age>35</age>
      <prof>teacher</prof>
    </student>
    <student>
      <name lang="ru">
        <first>Петр</first>
        <second>Петров</second>
      </name>
      <age>58</age>
      <prof>driver</prof>
    </student>
  </list>
`;
const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const students = xmlDOM.querySelectorAll("student");

const result = {
list: [] 
} ;

// Обрабатываем каждого студента отдельно
students.forEach(student => {
  const first = student.querySelector("first");
  const second = student.querySelector("second");
  const ageNode = student.querySelector("age");
  const profNode = student.querySelector("prof");
  const name = student.querySelector("name"); // добавлена точка
  const langAttr = name.getAttribute('lang');

  result.list.push({
    name: first.textContent + " " + second.textContent,
    age: Number(ageNode.textContent),
    prof: profNode.textContent,
    lang: langAttr,
  });
});

console.log(result);