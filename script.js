//UI Element
const filejson = document.querySelector(".filejson");
const filecsv = document.querySelector(".filecsv");
const row = document.querySelector(".row");
const slackName = document.querySelector(".slackName");
const email = document.querySelector(".email");
const point = document.querySelector(".point");
const output = document.querySelector(".output");
const button = document.querySelector("button");

// Store all users
let data = [];

// Function to update UI with data from the file
const updateUI = () => {};

// Function to Update DOM
const updateDOM = (paramData = data) => {
  output.innerHTML = `<h1>
    <strong class="fullname">FULLNAME</strong>
    <strong class="username">USERNAME</strong
    ><strong class="email">EMAIL</strong
    ><strong class="points">POINTS</strong>
  </h1>`;

  paramData.forEach((para) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `${para.fullname}  ${para.username} ${para.email}  ${para.points}`;
    output.appendChild(element);
  });
};

// Function to sort users based on points
const sortUsers = () => {
  data.sort((a, b) => {
    return b.points - a.points;
  });
  updateDOM();
  console.log("...sorting");
};

// Function to load JSON File
const getJSON = (e) => {
  let input = e.target;

  let reader = new FileReader();
  //   console.log(reader);
  reader.onload = () => {
    let jsons = JSON.parse(reader.result);
    console.log("jsons", jsons);
    for (let i = 0; i < jsons.length; i++) {
      let json = jsons[i];
      let first = json["FULL NAME"];
      let second = json["USERNAME"];
      let third = json["EMAIL"];
      let fourth = json["TOTAL POINTS"];
      // console.log(first);

      let results = {
        fullname: first,
        username: second,
        email: third,
        points: fourth,
      };
      data.push(results);
    }
    updateDOM(data);
  };
  reader.readAsText(filejson.files[0]);
};

// Function to load CSV File
const getCSV = (e) => {
  let input = e.target;
  let reader = new FileReader();
  reader.onload = () => {
    let lines = reader.result
      .trim()
      .split("\n")
      .map((line) => {
        return line.split(",");
      });
    // console.log(lines[1][0]);
    // console.log(lines);
    for (let i = 1; i < lines.length - 1; i++) {
      let firstrow = lines[i][0];
      let secondrow = lines[i][1];
      let thirdrow = lines[i][2];
      let fourthrow = lines[i][3];
      let fifthrow = lines[i][4];
      let sixthrow = lines[i][5];
      let seventhrow = lines[i][6];
      let eightrow = lines[i][7];

      // data.push(fullname);

      let result1 = {
        fullname: firstrow,
        username: secondrow,
        email: thirdrow,
        points: fourthrow,
      };
      let result2 = {
        fullname: fifthrow,
        username: sixthrow,
        email: seventhrow,
        points: eightrow,
      };

      //   return result;
      data.push(result1, result2);
    }
    updateDOM(data);

    // console.log(data);
    // console.log(result.fullname);
  };
  // start reading the file. When it is done, calls the onload event defined above.
  reader.readAsBinaryString(filecsv.files[0]);
  //   reader.readAsText(filecsv.files[0]);
};

//Events
// filejson.addEventListener("click", getJSON);
filecsv.addEventListener("change", getCSV);
button.addEventListener("click", sortUsers);
filejson.addEventListener("change", getJSON);
