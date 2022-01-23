//guides add into HTML to DOM
let guidesList = document.querySelector('.guides');
let logOutLinks = document.querySelectorAll('.logged-out');
let logInLinks = document.querySelectorAll('.logged-in');


// let setupIU = function (user) {
//     if (user) {
//         logInLinks.forEach(element => {
//             element.style.display = "block";
//         });
//         logOutLinks.forEach(element => {
//             element.style.display = "none";
//         });
//     } else {
//         // logInLinks.style.display = "none";
//         logInLinks.forEach(element => {
//             element.style.display = "none";
//         });
//         logOutLinks.forEach(element => {
//             element.style.display = "block";
//         });
//     }
// }
// function createCard(cardNew) {
//     cardNew.forEach(elementDoc => {
//         let guide = document.createElement('ul');
//         console.log(guide);
//         guide.classList.add('collapsible', 'z\-depth\-0', 'guides');
//         console.log(`${elementDoc.title}`);
//         console.log(elementDoc.user.title);
//         guide.setAttribute("data-collapsible", "accordion")
//         // guide.classList.add('collapsible z-depth-0 guides');
//         guide.innerHTML = `
//             <li>
//                 <div class="collapsible-header grey"><i class="material-icons">filter_drama</i>${elementDoc.title}</div>
//                 <div class="collapsible-body white"><span>${elementDoc.content}</span></div>
//             </li>
//                 `;
//         document.querySelector('.container_create').appendChild(guide);
//     });
// }

let filter = document.querySelector(".filter");
// filter.keyup(function (e) {
//   var fill = Array.filter(function (item, index) {
//    return item.title.toUpperCase().indexOf(e.target.value. toUpperCase()) !==-1
//   });
//   createCard(cardNew);
// });


function createCard(cardNew) {
  document.querySelector('.collapsible.guides').innerHTML = null;
  console.log(cardNew);
  let guide = "";
  cardNew.forEach(elementDoc => {
    // console.log(guide);
    // console.log(elementDoc.user.title);
    let liUl = document.createElement('li');
    liUl.setAttribute('class', 'card_li');
    let li = `
          <!--  <li> -->
                <div class="collapsible-header grey"><i class="material-icons">filter_drama</i>${elementDoc.title}</div>
                <div class="collapsible-body white"><span>${elementDoc.content}</span></div>
          <!--  </li> -->
                `;
    // guide += li;
liUl.innerHTML = li;
document.querySelector('.collapsible.guides').appendChild(liUl);
  });

  // document.querySelector('.guides').innerHTML = guide;
}

// let setupWishes = function (data) {
function setupWishes(data) {
  // const dataKeys = Object.keys(data);
  const collectionArr = Object.entries(data).map(([id, attrs]) => ({
    id,
    ...attrs
  }));
  let html = "";
  // https://materializecss.com/images/office.jpg   - STANDART MATERIALIZE IMG
  collectionArr.forEach(elementWish => {
    let div = `
        <div class="card col s12 l4 xl3">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="./img/card.jpg">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">${elementWish.titleAdds}<i class="material-icons right">more_vert</i></span>
            <p><a href="#">${elementWish.content}</a></p>
            ${elementWish.user == localStorage.getItem('localId') ? ' <button>edit</button> ': '' }
              
            <button class="delBtn" data-name="${elementWish.id}">Delete</button>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
            <p>Here is some more information about this product that is only revealed once clicked on.</p>

          </div>
      </div>
        `;
    html += div;
  });
  document.querySelector('.guideWishesRow').innerHTML = html;
}

function accountDetails(data) {
  let html = '';
  data.forEach(userDatas => {
    let div =
      `
        <h2>Info about user ${userDatas.email}</h2>
    `;
    html += div;
  });
  document.querySelector('.account-details').innerHTML = html;
}
// accountDetails()


function popUp() {
  let popup = document.getElementById('Popup');
  popup.classList.toggle('show');
  setTimeout(() => {
    console.log(123);
    popup.classList.remove('show');

  }, 6000);
  //   <div class="popupdiv" id="Popup">
  //   <div class="popupdiv_p">
  //     Hello user! You are Log in!
  //   </div>
  // </div>
}

function del(event){
  console.log(event);
  // const id = this.getAttribute('data-name');
  //  const store = JSON.parse(localStorage.getItem('localId'));

  //  const newStore = store.filter(function(item){
  //      if(item.id === id){
  //      return false /* происходит игнор*/
  //     }
  //     else{
  //         return true /* происходит возврат в массив*/
  //     }
  // })
   document.querySelector('.container').innerHTML = null;
  //  newStore.forEach((item)=> appearCard(item))
  //  localStorage.setItem('localId', JSON.stringify(newStore))

  }



// {/* <li>
// <div class="collapsible-header grey"><i class="material-icons">filter_drama</i>${guide.title}</div>
// <div class="collapsible-body white"><span>${guide.content}</span></div>
// </li> */}


// setupGuide(result)

// let setupGuide = function (data) {

//     if (data.length) {
//         let html = "";
//         data.forEach(elementDoc => {
//             let guide = elementDoc.data();
//             // console.log(guide);
//             let li = `
//             <li>
//                 <div class="collapsible-header grey"><i class="material-icons">filter_drama</i>${guide.title}</div>
//                 <div class="collapsible-body white"><span>${guide.content}</span></div>
//             </li>
//             `;
//             html += li;
//         });
//         guidesList.innerHTML = html;
//     } else {
//         guidesList.innerHTML = "<h3>Load Guide after user log in</h3>";
//     }
// }

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
document.addEventListener('DOMContentLoaded', function () {
  let elems = document.querySelectorAll('.sidenav');
  let instances = M.Sidenav.init(elems);
  let modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
  let collapsible = document.querySelectorAll('.collapsible');
  M.Collapsible.init(collapsible);
});
document.addEventListener('DOMContentLoaded', function () {});

// fetch('https://rest-apiwdb.firebaseio.com/')
//   .then(response => response.json(console.log(response)))
//   .then(commits => alert(commits[0].author.login));