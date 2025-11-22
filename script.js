document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("product-list");
  db.collection("products")
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => {
      list.innerHTML = "";
      snapshot.forEach((doc) => {
        const item = doc.data();
        if (
          typeof categoryPage !== "undefined" &&
          item.category !== categoryPage
        ) {
          return;
        }
        list.innerHTML += `
         <div class="card">
         <img src="${item.image}" alt=""/>
         <h3>${item.name}</h3>
         <p>Ksh ${item.price}</p>
         <p>${item.description}</p>
         <a class="button"
         href="https://wa.me/254740106820?text=Hi, I'm interested in
         ${item.name} at Ksh ${item.price}">Order on WhatsApp</a>
         </div>
         `;
      });
    });
});
