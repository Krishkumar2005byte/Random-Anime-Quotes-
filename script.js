async function munction() {
  try {
    // We use the Yurippe API because it is reliable and free
    const response = await fetch("https://yurippe.vercel.app/api/quotes?random=1");

    if (!response.ok) throw new Error("Network response was not ok");

    const dataArray = await response.json();
    const data = dataArray[0]; // This API returns an array

    document.getElementById("name").innerHTML = data.show;
    document.getElementById("quote").innerHTML = `"${data.quote}"`;
    document.getElementById("char").innerHTML = `- ${data.character}`;

  } catch (error) {
    console.error("Error fetching quote:", error);
    document.getElementById("quote").innerHTML = "Could not load quote. Try again!";
  }
}

munction();