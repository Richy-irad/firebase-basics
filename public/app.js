document.addEventListener("DOMContentLoaded", (event) => {
  // connect to the app
  const app = firebase.app();

  //   connect to firestore
  const db = firebase.firestore();

  //   ------ WORKING WITH ONE DOCUMENT -------
  //   // get my post
  //   const myPost = db.collection("posts").doc("firstpost");

  //   //   retrieve the post
  //   //   use get() to just get the document
  //   // use onSnapshot() to get the realtime data changes
  //   myPost.get().then((doc) => {
  //     const data = doc.data();
  //     document.write(data.title + `<br>`);
  //     document.write(data.createdAt);
  //   });

  // ------- WORKING WITH MULTIPLE DOCUMENTS -------
  //   const productsRef = db.collection("products");

  //   //   filtering
  //   //   works with operators. First argument is the field, second is the operator, and the third the actual value to check against
  //   // use .limit() method to the query
  //   const query = productsRef.where("price", ">=", 10);

  //   query.get().then((products) => {
  //     products.forEach((doc) => {
  //       product = doc.data();
  //       document.write(`${product.name} at ${product.price} <br>`);
  //     });
  //   });
});

function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      document.write(`Hello ${user.displayName}`);
      console.log(user);
    })
    .catch((e) => {
      console.log(e);
    });
}

// function to update a post
function updatePost(e) {
  // db connection
  const db = firebase.firestore();
  const myPost = db.collection("posts").doc("firstpost");
  myPost.update({ title: e.target.value });
}

// function to upload a file to Firebase Storage
function uploadFile(files) {
  const storageRef = firebase.storage().ref();
  const horseRef = storageRef.child("horse.jpg");
  const file = files.item(0);
  const task = horseRef.put(file);

  task.then((snapshot) => {
    console.log(snapshot);
    const url = snapshot.downloadURL;
    document.querySelector("#uploadedImg").setAttribute("src", url);
  });
}
