async function munction() {
  console.log("start");
  var response = await fetch("https://animechan.vercel.app/api/random");
  var data = await response.json();
  console.log(data);
  let aName = document.getElementById("name");
  let aQuote = document.getElementById("quote");
  let aChar = document.getElementById("char");

  aName.innerHTML = data.anime;
  aQuote.innerHTML = data.quote;
  aChar.innerHTML = data.character;
}
munction();
