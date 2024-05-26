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
