const aipEP = "https://randomuser.me/api?results=10"; //?results=2
let userList = [];
// making slider work to go to next page/ slide to unlock
const slider = document.getElementById("mySlider");

slider.addEventListener("change", (e) => {
  const { value } = e.target; //destructuring const value= e.target.value
  const label = document.getElementById("label");

  if (value > 70) {
    label.textContent = "";
    dispAppScreen();
  } else {
    label.textContent = "Slide To Unlock";
  }
});

const dispAppScreen = () => {
  // hide home screen
  document.querySelector(".homeScreen").remove();

  // show app screen
  document.querySelector(".appScreen").style.display = "block";
};

const dispcontactScreen = () => {
  // hide app screen
  document.querySelector(".appScreen").remove();

  // show app screen
  document.querySelector(".contactListScreen").style.display = "block";
  fetchUsers(aipEP);
};

const fetchUsers = async (url) => {
  // fetch the users
  //   1. Promise Method
  /*fetch(url)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });*/
  // 2. async/await
  const response = await fetch(url);
  const data = await response.json();
  userList = data.results;

  //   hide the spinner
  document.querySelector(".showSpinner").style.display = "none";

  //   show the spinner
  displayContactList(userList);
};
fetchUsers(aipEP);

// display contact list
const displayContactList = (userList) => {
  document.getElementById("list").style.display = "block";

  let str = "";

  userList.map((item, index) => {
    str += `
  <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse${index}"
                      aria-expanded="false"
                      aria-controls="collapse${index}"
                    >
                      <img
                        src="${item.picture.large}"
                        alt=""
                        width="50px"
                        class="rounded-circle"
                      />
                      <div class="ms-2">
                        <div class="fw-bolder">${item.name.title} ${item.name.first} ${item.name.last}</div>
                        <small>${item.location.country}, ${item.location.postcode}</small>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="collapse${index}"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div
                      class="accordion-body d-flex flex-column align-items-center"
                    >
                      <img
                        src="${item.picture.large}"
                        alt=""
                        width="150px"
                        class="rounded-circle"
                      />
                      <div>
                        <div class="fw-bolder">
                          <i class="bi bi-person-circle"></i>
                          ${item.name.title} ${item.name.first} ${item.name.last}
                        </div>
                        
                      </div>
                      <div>
                        <a href="tel:${item.phone}">
                          <i class="bi bi-phone-fill"></i>
                          ${item.phone}
                        </a>
                      </div>

                      <div>
                        <a href="mailto:${item.email}">
                          <i class="bi bi-envelope-at-fill"></i><small>${item.email}</small>
                        </a>
                      </div>
                      <div >
                        <a href="https://www.google.com/maps/place/${item.location.street.number}+${item.location.street.name}+${item.location.city}+${item.location.country}+${item.location.postcode}" target="_blank">
                          <i class="bi bi-globe-asia-australia"></i>
                          <small > ${item.location.street.number}, ${item.location.street.name}, ${item.location.city}</small>
                         
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                `;
  });
  document.getElementById("userAccordion").innerHTML = str;
  const userCount = document.getElementById("userCount");
  let userCountLength = userList.length;
  userCount.innerText = userCountLength;
  let contactAmount = document.getElementById("contactAmount");
  if (userCountLength > 1) {
    contactAmount.innerText = "Contacts";
  } else {
    contactAmount.innerText = "Contact";
  }
};

// search contact
document.getElementById("search").addEventListener("keyup", (e) => {
  const { value } = e.target;
  const filteredUsers = userList.filter((item) => {
    const name = (item.name.first + "" + item.name.last).toLowerCase();
    return name.includes(value.toLowerCase());
  });

  displayContactList(filteredUsers);
});
