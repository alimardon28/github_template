"use strict";

const searchBox = document.querySelector("#searchBox");
const btns = document.querySelector("#btns");
const cardWrap = document.querySelector(".card_wrapper");

const URL = "https://api.github.com/search/users?q=";

searchBox.addEventListener("keypress", setUser);
const sp = document.querySelector(".spennerS");

function setUser(e) {
  if (e.keyCode === 13) {
    getUser(searchBox.value);
    searchBox.value = "";
    const not = document.querySelector(".notFount");
    not.style.display = "none";
    sp.style.display = "block";
  }
}

async function getUser(query) {
  const rep = await fetch(`${URL}${query}`);
  const res = await rep.json();
  console.log(res);
  sp.style.display = "none";
  sendDisplay(res.items);
}

function sendDisplay(user) {
  user.map((item) => {
    const card = document.createElement("div");

    card.innerHTML = `

   <div
   class="box bg-darck text-light p-3 d-flex flex-row align-items-center w-100 mt-3 justify-content-between"
 >
   <div class="d-flex align-items-center">
     <img src=${item.avatar_url} alt="" class="user d-block" />

     <div class="info mx-1 px-2">
       <h4>${item.login}</h4>
       <p>Web development school</p>
     </div>
   </div>
   <a target='_blank' href="${item.html_url}" class="text-white">
     <button class="btn btn-darck text-light fw-bold border">view</button>
   </a>
 </div>


   `;

    cardWrap.append(card);
  });
}
