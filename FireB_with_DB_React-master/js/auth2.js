// console.log(db);
// console.log(db.collection('guides'));
// console.log('asdasdasdasdas',db.collection('guides'));

const log = document.querySelector('.log');
const reg = document.querySelector('.reg'); //sign up
const create = document.querySelector('.create');
const createWish = document.querySelector('.createWish');
// const create = document.querySelector('.create');
console.log(create);
// createCardFunc()
// listen fot Auth status changes
// auth.onAuthStateChanged(user => {
//     if (user) {
//         //         db.collection('guides').onSnapshot(takeDocs => {
//         //             setupGuide(takeDocs.docs);
//         setupIU(user);
//         //         })
//     } else {
//         setupGuide([]);
//         setupIU(user);
//     }
// })
// let user = "";
// if(user) {
// } 
// let currentUser = (e) => {
//     if (signupForm !== null) {
//         setupIU(e);
//         console.log();
//     }
// }

//SIGN UP
// const signupForm = document.querySelector('#signup-form');
const signupForm = document.querySelector('#signup-form');
let loginForm = document.querySelector('#login-form');
let wishForm = document.querySelector('#wish-form');
let delBtn = document.querySelectorAll('.delBtn');



// console.log(signupForm);
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get user info
    // const email = signupForm['signup_email'].value;        //оба варианта формы работают верно=)
    // const password = signupForm['signup_password'].value;
    const data = {
        // email: signupForm['signup-email'].value,
        email: e.target.elements.signup_email.value,
        password: e.target.elements.signup_password.value,
        returnSecureToken: true
    };
    console.log(data.email);
    console.log(data);
    
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxQzumZ_qU5xkViTyHFFnS99vcYIgKHIQ", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        .then(result => result.json())
        .then(result => localStorage.setItem('localId', result.localId));

    //sign up user 
    // auth.createUserWithEmailAndPassword(email, password).then(credentialCard => {
    //  .log(credentialCard.user);
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    // });
});
// console.log(data);

//LOGIN
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // popUp();
    const data = {
        // email: signupForm['signup-email'].value,
        email: loginForm['login_email'].value,
        password: loginForm['login_password'].value,
        returnSecureToken: true
    }
    // const email = loginForm['login-email'].value;
    // const password = loginForm['login-password'].value;
    // console.log(email, password);
    console.log(data.email);
    // accountDetails(cardNew)
    accountDetails([data]);

    if (data) {
        // alert('111');
        // accountDetails(data);
        // popUp();
    }

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxQzumZ_qU5xkViTyHFFnS99vcYIgKHIQ", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        .then(result => result.json())
        .then(result => {
            localStorage.setItem('localId', result.localId);
            return result;
        })
        .then(result => {
            // fetch(`https://rest-api20.firebaseio.com/user_list/wishes.json?orderBy="user"&startAt="${localStorage.getItem('localId')}"`, {
            //         method: 'GET'
            //     })
            //     .then(result => result.json())
            //     .then(result => {
            //         accountDetails([data]);
            //         let cardNew = Object.values(result);
            //         createCard(cardNew);
            //         popUp();
            //         // let cardNew;
            //         // if (cardNew == undefined || cardNew == null) {
            //         //     alert("you h no cards!")
            //         //     createCard(cardNew)
            //         // } else {
            //         //     Object.values(result)
            //         //     createCard(cardNew)
            //         // }
            //         if (cardNew !== undefined && cardNew !== null) {
            //             // alert("you h no cards!");
            //         } else {
            //             Object.values(result);
            //             createCard(cardNew);


            //         }
            //     })
            fetch(`https://rest-api20.firebaseio.com/wishes.json?orderBy="user"&equalTo="${localStorage.getItem('localId')}"`, {
                    method: 'GET'
                })
                .then(result => result.json())
                .then(result => {
                    setupWishes(result);
                });
       
        })
        .catch(result => console.error("ERRORRRRRR"));
    // auth.signInWithEmailAndPassword(email, password).then((credentialCard) => {
    //     // console.log(credentialCard.user);
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    // })
    // .catch(e=>document.write(e)
    // )
});
//END LOGIN
console.log(loginForm);


//LOGOUT
let logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    // auth.signOut().then(() => {
    //     // console.log("User log out");
    // });
    document.querySelector('.guides').innerHTML = '';
    document.querySelector('.guideWishesRow').innerHTML = '';
    localStorage.clear();
})
//END LOGOUT

// function createCardFunc(params) {


create.addEventListener('submit', function (e) {
    // console.log(create);
    e.preventDefault();
    const data = {
        title: e.target.elements.title.value,
        content: e.target.elements.content.value,
        user:localStorage.getItem('localId')
    };
    console.log(data);
    fetch(`https://rest-api20.firebaseio.com/${localStorage.getItem('localId')}/user.json`, {
            method: 'POST',
            // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        .then(result => result.json())
        .then(result => {

            fetch(`https://rest-api20.firebaseio.com/${localStorage.getItem('localId')}/user.json`, {
                    method: 'GET'
                })
                .then(result => result.json())
                .then(result => {
                    let cardNew = Object.values(result);
                    let keys = Object.keys(result)
                    console.log(keys);
                    
                    createCard(cardNew);
                });
            console.log(result);
        });
    // const create = document.querySelector('.create');
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    create.reset();
    // const modal = document.querySelector('#modal-signup');
    // M.Modal.getInstance(modal).close();
    // signupForm.reset();
}); //END of CREATE






wishForm.addEventListener('submit', function (e) {
    // document.querySelector(".addBtn").onclick = function (e) {
    console.log(555);
    // console.log(create);
    console.log(e);
    console.log(delBtn);
    e.preventDefault();
    // console.log(wishForm['wishTitle']);

    // console.log(e.target.elements.wishTitle.value);
    console.log(666);
    // console.log(e.target.elements.wishTitle.value);

    const data = {
        titleAdds: wishForm['wishTitle'].value,
        // titleAdds: e.target.elements.wishTitle.value,
        content: wishForm['problem_content'].value,
        user:localStorage.getItem('localId')
    };
    console.log(data);
    fetch(`https://rest-api20.firebaseio.com/wishes.json`, {
            method: 'POST',
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
        .then(result => result.json())
        .then(result => {
            fetch(`https://rest-api20.firebaseio.com/wishes.json?orderBy="user"&equalTo="${localStorage.getItem('localId')}"`, {
                    method: 'GET'
                })
                .then(result => result.json())
                .then(result => {
             
                    setupWishes(result);
                });
            console.log(result);
        });


    // fetch(`https://rest-api20.firebaseio.com/user_list/${localStorage.getItem('localId')}/wishes.json`, {
    //     method: 'POST',
    //     // *GET, POST, PUT, DELETE, etc.
    //     body: JSON.stringify(data) // body data type must match "Content-Type" header
    // })
    // .then(result => result.json())
    // .then(result => {
    //     fetch(``, {
    //         method: 'GET'
    //     })
    // })




    //     })
}); //END of CREATE

console.log(delBtn);

   delBtn.forEach(e => {
            e.addEventListener('click', (e) => {
                fetch(`https://rest-api20.firebaseio.com/user_list/${localStorage.getItem('localId')}/wishes.json`, {
                        method: 'DELETE'
                    });
                    console.log(777);
                    
                });
            });

if (localStorage.getItem('localId')) {
    // fetch(`https://rest-api20.firebaseio.com/0.json`, {
    fetch(`https://rest-api20.firebaseio.com/user_list/${localStorage.getItem('localId')}/user.json`, {
            method: 'GET'
        })
        .then(result => result.json())
        .then(result => {
            console.log(result);
            let cardNew = Object.values(result);
            createCard(cardNew);
            // let cardNew = Object.values(result)
            //     let cardNew;
            //     if (cardNew !== undefined && cardNew !== null) {
            //         Object.values(result)
            // createCard(cardNew)
            //     } else {
            //         // alert("you h no cards!")
            //     }
        })
    fetch(`https://rest-api20.firebaseio.com/wishes.json`, {
            method: 'GET'
        })
        .then(result => result.json())
        .then(result => {
            // let cardNew = Object.values(result);
            if(Object.keys(result).length ){
                setupWishes(result);
                return
            }
            document.querySelector('.guideWishesRow').innerHTML = "<div>no results</div>  "
            

        
        });
}
// fetch(`https://rest-api20.firebaseio.com/user_list/${localStorage.getItem('localId')}.json`, {



// fetch(`/JSON/rest-api20-export/${localStorage.getItem('localId')}/user`, {
//         method: 'GET'
//     })
//     .then(result => result.json())
//     .then(result =>
//         console.log(result)

//     )
// console.log(result[0])
// .then(result => {
//     console.log(result);
//     let card = []
//     let cardNew = [...card, result]
//     console.log(cardNew);
//     createCard(cardNew)
// })