//UI Element
const filejson = document.querySelector(".filejson");
const filecsv = document.querySelector(".filecsv");
const row = document.querySelector(".row");
const slackName = document.querySelector(".slackName");
const email = document.querySelector(".email");
const point = document.querySelector(".point");
const rank = document.querySelector(".ranks");
const container = document.querySelector(".rank-list");

// const buttondesc = document.querySelector(".sortdesc");
// const buttonasc = document.querySelector(".sortasc");

// Twitter share
window.onload = setShareLinks;

function setShareLinks() {
  var pageUrl = encodeURIComponent(document.URL);
  var description = document
    .querySelector("meta[name='description']")
    .getAttribute("content");
  var description = encodeURIComponent(description);

  elements = document.querySelectorAll(".social-share");
  Array.prototype.forEach.call(elements, function (el) {
    el.addEventListener("click", function () {
      url =
        "https://twitter.com/intent/tweet?url=" +
        pageUrl +
        "&text=" +
        description;
      socialWindow(url);
    });
  });
}

function socialWindow(url) {
  var left = (screen.width - 570) / 2;
  var top = (screen.height - 570) / 2;
  var params =
    "menubar=no,toolbar=no,status=no,width=570,height=570,top=" +
    top +
    ",left=" +
    left;
  window.open(url, "NewWindow", params);
}

// Store all users
let data = [];
// let BigData;

// Remove all node contents
const clearUI = () => {
  while (container.firstChild) {
    container.removeChild(rank.firstChild);
  }
};

// Function to Update DOM
const updateDOM = (paramData = data) => {
  // const container = document.querySelector(".rank-list");
  // const row = document.querySelector(".row");
  // console.log(container);
  data.sort((a, b) => {
    return b.points - a.points;
  });
  container.innerHTML = `<div class="table-head">
  <div class="name">Name</div>
  <div class="username">Username</div>
  <div class="email-add">Email</div>
  <div class="points">Points</div>
  <div class="share">Share</div>
</div>`;

  paramData.forEach((para) => {
    const row = document.createElement("div");
    row.classList.add("row");

    row.innerHTML = `
    <div class="circle-avatar">
    <div class="circle">
      <img src="assets/user.svg" alt="" />
    </div>
  </div>
  <div class="details">
    <div class="full-name"><span>${para.fullname}</span></div>
    <div class="slack"><span>${para.username}</span></div>
    <div class="email">
      <span>${para.email}</span>
    </div>
    <div class="point"><span>${para.points}</span></div>
    <div class="socials">
      <div class="twitter social-share">
        <a href="#" target ="_blank"
          ><img src="assets/twitter.svg" alt=""
        /></a>
      </div>
    </div>
  </div>
      `;
    container.appendChild(row);
  });
};

// Function to sort users descending based on points
// const sortUsersDesc = () => {
//   data.sort((a, b) => {
//     return b.points - a.points;
//   });
//   updateDOM();
//   console.log("...sorting descending");
// };

// Function to sort users ascending based on points
// const sortUsersAsc = () => {
//   data.sort((a, b) => {
//     return a.points - b.points;
//   });
//   updateDOM();
//   console.log("...sorting ascending");
// };

// Function to load JSON File
let getJSON = (e) => {
  loadFromServer = null;
  getCSV = null;
  filejson.value = "";

  let input = e.target;
  // location.reload();
  // clearUI();
  // location.reload();
  let reader = new FileReader();
  //   console.log(reader);
  reader.onload = () => {
    let jsons = JSON.parse(reader.result);
    // console.log("jsons", jsons);
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
      //To remove duplicates from record -- causing delay in program
      // const BigData = data.reduce((acc, current) => {
      //   const x = acc.find((item) => item.id === current.id);
      //   if (!x) {
      //     return acc.concat([current]);
      //   } else {
      //     return acc;
      //   }
      // }, []);
    }
    updateDOM(data);
  };
  reader.readAsText(filejson.files[0]);
};

// Function to load CSV File
let getCSV = (e) => {
  // const row = document.querySelector(".row");

  loadFromServer = null;
  getJSON = null;
  filejson.value = "";
  console.log(filejson.value);
  // row.innerHTML = "";
  let input = e.target;
  // location.reload();
  // clearUI();
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
      //To remove duplicates from record -- causing delay in program
      // const BigData = data.reduce((acc, current) => {
      //   const x = acc.find((item) => item.username === current.username);
      //   if (!x) {
      //     return acc.concat([current]);
      //   } else {
      //     return acc;
      //   }
      // }, []);
    }
    updateDOM(data);

    // console.log(data);
    // console.log(result.fullname);
  };
  // start reading the file. When it is done, calls the onload event defined above.
  reader.readAsBinaryString(filecsv.files[0]);
  //   reader.readAsText(filecsv.files[0]);
};
// Load CSV File from server
let loadFromServer = async () => {
  const response = await fetch("HNGi7Sheet2i.csv");
  const datas = await response.text();

  let lines = datas
    .trim()
    .split("\n")
    .map((line) => {
      return line.split(",");
    });
  //   console.log(lines);
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
    //To remove duplicates from record -- causing delay in program
    // BigData = data.reduce((acc, current) => {
    //   const x = acc.find((item) => item.username === current.username);
    //   if (!x) {
    //     return acc.concat([current]);
    //   } else {
    //     return acc;
    //   }
    // }, []);
  }

  updateDOM(data);
};

//Events
// filejson.addEventListener("click", getJSON);
filecsv.addEventListener("change", getCSV);
// buttondesc.addEventListener("click", sortUsersDesc);
// buttonasc.addEventListener("click", sortUsersAsc);
filejson.addEventListener("change", getJSON);
document.addEventListener("DOMContentLoaded", loadFromServer);
