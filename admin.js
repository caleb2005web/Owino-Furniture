function login() {
  const pass = document.getElementById("password").value;
  if (pass === "1234") {
    // Password should be a string
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("admin-screen").style.display = "block";
    loadProducts();
  } else {
    alert("wrong password!");
  }
}

function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const image = document.getElementById("image").files[0];

  if (!image) {
    alert("Please select an image");
    return;
  }

  const ref = storage.ref("products/" + Date.now() + "_" + image.name);
  ref
    .put(image)
    .then(() => {
      ref.getDownloadURL().then((url) => {
        db.collection("products").add({
          name,
          price,
          description,
          category,
          image: url,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      });
    })
    .catch((error) => {
      console.error("Error uploading image: ", error);
      alert("There was an error adding the product. Please try again.");
    });
}

function loadProducts() {
  db.collection("products")
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) => {
      const area = document.getElementById("admin-list");
      area.innerHTML = "";

      snapshot.forEach((doc) => {
        const item = doc.data();
        area.innerHTML += `
                <div class="card">
                    <img src="${item.image}" alt="${item.name}"/>
                    <h3>${item.name}</h3>
                    <p>Ksh ${item.price}</p>
                    <p>${item.category}</p>
                    <button onclick="deleteProduct('${doc.id}')">Delete</button>
                </div>
                `;
      });
    });
}

function deleteProduct(id) {
  db.collection("products")
    .doc(id)
    .delete()
    .then(() => {
      alert("Deleted");
    })
    .catch((error) => {
      console.error("Error deleting document: ", error);
    });
}
