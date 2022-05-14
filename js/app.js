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
  }
}

async function getUser(query) {
  const rep = await fetch(`${URL}${query}`);
  const res = await rep.json();
  console.log(res);
  sendDisplay(res.items);
}

function sendDisplay(user) {
  cardWrap.innerHTML = "";

  user.map((item) => {
    const card = document.createElement("div");
    card.classList.add("user-item");

    card.dataset.id = item.login;

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

    cardWrap.prepend(card);
  });

  setProfile();
}

async function setProfile(user) {
  console.log(user);

  const userItem = cardWrap.querySelectorAll(".user-item");

  userItem.forEach((item) => {
    item.addEventListener("click", async () => {
      console.log(item.dataset.id);



      const data = await fetch(
        `https://api.github.com/users/${item.dataset.id}`
      );

      const res = await data.json();
      console.log(res);
      sendProfile(res);
     item.classList.add('sp');
    });
  });
}

function sendProfile(sms) {
  const {
    avatar_url,
    bio,
    blog,
    company,
    created_at,
    followers,
    following,
    location,
    login,
    name,
    public_repos,
    public_gists,
    type,
    twitter_username,
    subscriptions_url,
    updated_at,
    email,
  } = sms;

  const personCard = document.createElement("div");
  personCard.classList.add("person");

  personCard.innerHTML = `


  <div class="row">
  <div
    class="col-4 d-flex flex-column justify-content-center align-items-center mb-3 card"
  >
    <img class="img" src="${avatar_url}" alt="" />
    <h4 class="mt-5">${name}</h4>
    <p class="mb-3">Web developer</p>

    <p>
      ${bio}
    </p>

    <div class="row w-100">
      <div class="col-6">
        <i class="bi bi-people"></i>
        <span class="fw-bold">${followers}</span> Followers
      </div>
      <div class="col-6 mb-4">
        <span class="fw-bold">${following}</span> Following
      </div>

      <div class="col-12">
        <ul class="list-unstyled">
          <li><i class="bi bi-building"></i> ${company}</li>
          <li><i class="bi bi-geo-alt"></i> ${location}</li>
          <li><i class="bi bi-envelope"></i> ${email ? email : " "}</li>
          <li><i class="bi bi-link"></i> ${blog}</li>
          <li><i class="bi bi-twitter"></i> ${twitter_username}</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="col-8 p-3">
    <ul class="p-2 d-flex list-unstyled">
      <li class="p-2 text-light m-1 rounded"><i class="bi bi-book"></i> Owerview</li>
      <li class="p-2 text-light m-1 rounded"><i class="bi bi-journal-bookmark"></i> Repositories <span>${public_repos}</span></li>
      <li class="p-2 text-light m-1 rounded"><i class="bi bi-kanban"></i> Projects <span>${public_gists}</span></li>
      <li class="p-2 text-light m-1 rounded"><i class="bi bi-box"></i>  Package <span></span></li>
      <li class="p-2 text-light m-1 rounded"><i class="bi bi-star"></i> Stars <span></span></li>
    </ul>
  </div>
</div>





  `;

  cardWrap.prepend(personCard);
}
