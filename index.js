const searchBtn = document.querySelector(".search-btn");
const search = document.querySelector("#search-field");
const dogCardsContainer = document.querySelector(".app-data");
const loader = document.querySelector(".loader");

const config = {
  method: "GET",
  headers: {
    "X-Api-Key": "Srfrr/OaEg2nathyaDEQ+A==Yrr61IekJQRHTJUn",
  },
};

const createDogCard = (info) => {
  const dogAttributes = [
    { attrName: "Name", attrVal: info.name },
    { attrName: "Energy", attrVal: info.energy },
    { attrName: "Good With Children", attrVal: info.good_with_children },
    { attrName: "Good With Strangers", attrVal: info.good_with_strangers },
    { attrName: "Trainability", attrVal: info.trainability },
    { attrName: "Max Life Expectancy", attrVal: info.max_life_expectancy },
    { attrName: "Min Life Expectancy", attrVal: info.min_life_expectancy },
  ];
  const dogCard = document.createElement("div");
  const dogImage = document.createElement("img");
  const dogInfo = document.createElement("div");

  dogCard.classList.add("dog-card");
  dogImage.src = info.image_link;
  dogImage.classList.add("dog-image");

  dogAttributes.forEach((attr) => {
    const dogAttr = document.createElement("span");
    dogAttr.innerText = `${attr.attrName} : ${attr.attrVal}`;
    dogInfo.append(dogAttr);
  });
  dogInfo.classList.add("dog-info");
  dogCard.append(dogImage, dogInfo);
  dogCardsContainer.appendChild(dogCard);
};

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  loader.classList.add("show");
  let info = null;
  const param = search.value;
  const url = `https://api.api-ninjas.com/v1/dogs?name=${param}`;

  await fetch(url, config).then((response) =>
    response.json().then((output) => {
      info = output;
    })
  );
  if (info) {
    loader.classList.remove("show");
    search.value = "";
    createDogCard(info[0]);
  } else {
    loader.innerText = "No dog found!";
  }
});
