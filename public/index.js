// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDSFuWCK3w0bkM-K8atbePTZ2wezlGQ5JU",
    authDomain: "jakethoffman-7b7ab.firebaseapp.com",
    databaseURL: "https://jakethoffman-7b7ab.firebaseio.com",
    projectId: "jakethoffman-7b7ab",
    storageBucket: "jakethoffman-7b7ab.appspot.com",
    messagingSenderId: "22222103514",
    appId: "1:22222103514:web:922fceb2b84f4c6b3716e3",
    measurementId: "G-5SHY77NZ1S"
};

// // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const login = (email, password) =>{

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorMessage);
        return errorCode;
    });
}

const logout = (fn) => {
    firebase.auth().signOut().then(function() {
        console.log("Signed Out");
    }, function(error) {
        console.log(error);
    });
}

const getFormattedDate = (fn) => {
    var d = new Date();

    year = d.getFullYear();
    day = d.getDate();
    var month;
    switch(d.getMonth()) {
        case 0: month = "January";
            break;
        case 1: month = "February";
            break;
        case 2: month = "March";
            break;
        case 3: month = "April";
            break;
        case 4: month = "May";
            break;
        case 5: month = "June";
            break;
        case 6: month = "July";
            break;
        case 7: month = "August";
            break;
        case 8: month = "September";
            break;
        case 9: month = "October";
            break;
        case 10: month = "November";
            break;
        case 11: month = "December";
            break;
    }

    var date = year.toString() + " " + month + " " + day.toString();

    return date;
}

const addLink = (title, url) => {
    
    var date = getFormattedDate();

    var key = firebase.database().ref('links/').push().key;
    
    firebase.database().ref('links/' + key).set({
        title: title,
        url: url,
        date: date
    })
}
const addProject = (title, desc, url) => {

    var key = firebase.database().ref('projects/').push().key;
    
    firebase.database().ref('projects/' + key).set({
        title: title,
        desc: desc,
        url: url
    })
}
const addThought = (title, content, post) => {
    
    var date = getFormattedDate();

    var key = firebase.database().ref('thoughts/').push().key;
    
    firebase.database().ref('thoughts/' + key).set({
        title: title,
        content: content,
        date: date
    })

    firebase.database().ref('posts/' + key).set({
        post: post,
        title: title,
        date: date
    })
}

const links = (fn) => {
    document.getElementById("content").innerHTML = '';
    firebase.database().ref("links").on("child_added", function(snap){

        let title = snap.val().title;
        let date = snap.val().date;
        let url = snap.val().url;

        var html = [
            '<div class="entry">',
                '<a class="entry-link" href="' + url + '" target="_blank">' + title + ' --</a>',
                '<div class="entry-date">' + date + '</div>'
        ].join("\n");

        document.getElementById("content").innerHTML = html + document.getElementById("content").innerHTML;
    });
}
document.getElementById("links").addEventListener("click", links);

const projects = (fn) => {
    document.getElementById("content").innerHTML = '';
    firebase.database().ref("projects").on("child_added", function(snap){

        let title = snap.val().title;
        let desc = snap.val().desc;
        let url = snap.val().url;

        var html = [
            '<div class="entry">',
                '<a class="entry-link" href="' + url + '" target="_blank">' + title + ' --</a>',
                '<p class="entry-content"></br><span class="tab"></span>' + desc + '</p></div>'
        ].join("\n");

        document.getElementById("content").innerHTML = html + document.getElementById("content").innerHTML;
    });
}
document.getElementById("projects").addEventListener("click", projects);

const thoughts = (fn) => {
    document.getElementById("content").innerHTML = '';
    firebase.database().ref("thoughts").on("child_added", function(snap){

        let title = snap.val().title;
        let content = snap.val().content;
        let date = snap.val().date;

        let key = snap.key;

        var html = [
            '<div class="entry">',
                '<span class="entry-link" onclick="setPost(' + "'" + key + "'" + ')">' + title + ' --</span>',
                '<p class="entry-content"></br><span class="tab"></span>' + content + '</p></div>',
                '<div class="entry-date">' + date + '</div>'
        ].join("\n");

        document.getElementById("content").innerHTML = html + document.getElementById("content").innerHTML;
    });
}
document.getElementById("thoughts").addEventListener("click", thoughts);

function setPost(key) {
    document.getElementById("content").innerHTML = '';

    firebase.database().ref("posts/" + key).on("value", function(snap){
        let post = snap.val().post;
        let title = snap.val().title;
        let date = snap.val().date;

        var html = [
            '<div class="entry">',
                '<span class="entry-link" onclick="thoughts()">' + title + ' --</span>',
                '<div class="entry-date">' + date + '</div>',
                '<p class="entry-content"><span class="tab"></span>' + post + '</p></div>',
                '<div class="after-page-space"></div>'
                
        ].join("\n");

        document.getElementById("content").innerHTML = html + document.getElementById("content").innerHTML;
    });
}

function setTheme(num) {

    localStorage.setItem('theme', num);
    var jakeContainer = document.getElementById("left-top");
    var specialJake;

    let root = document.documentElement;

    num = parseInt(num);

    switch (num) {
        //Good water-level
        case 2:
            root.style.setProperty('--color-left', "#2700ff");
            root.style.setProperty('--color-header', "#00a78e");
            root.style.setProperty('--color-content', "#36b19e");
            root.style.setProperty('--color-title', "#d85557");
            root.style.setProperty('--color-jake-emph', "#d85557");
            root.style.setProperty('--color-jake', '#94c598');
            root.style.setProperty('--color-title-link-hover', "#ffffff");
            root.style.setProperty('--color-desc', "#ceb894");
            root.style.setProperty('--color-date', "#94c598");
            root.style.setProperty('--color-header-link', "#ceb894");
            root.style.setProperty('--color-header-link-hover', "#f0b1d0");
            root.style.setProperty('--color-left-link', "#ceb894");
            root.style.setProperty('--color-left-link-hover', "#f0b1d0");
            root.style.setProperty('--color-photo-filter', '#bb18af24');
            specialJake = 2;
        break;
        //Oceanic
        case 4:
            root.style.setProperty('--color-left', "#00a78e");
            root.style.setProperty('--color-header', "#00a78e");
            root.style.setProperty('--color-content', "#00a78e");
            root.style.setProperty('--color-title', "#413e94");
            root.style.setProperty('--color-jake-emph', "#413e94");
            root.style.setProperty('--color-jake', '#94c598');
            root.style.setProperty('--color-title-link-hover', "#ffffff");
            root.style.setProperty('--color-desc', "#ffffff");
            root.style.setProperty('--color-date', "#94c598");
            root.style.setProperty('--color-header-link', "#ffffff");
            root.style.setProperty('--color-header-link-hover', "#f0b1d0");
            root.style.setProperty('--color-left-link', "#ffffff");
            root.style.setProperty('--color-left-link-hover', "#f0b1d0");
            root.style.setProperty('--color-photo-filter', '#bb18af24');
            specialJake = 4;
        break;
        //Twitch
        case 5:
            root.style.setProperty('--color-left', "#0e0e10");
            root.style.setProperty('--color-header', "#0e0e10");
            root.style.setProperty('--color-content', "#0e0e10");
            root.style.setProperty('--color-title', "#9147ff");
            root.style.setProperty('--color-jake-emph', "#9147ff");
            root.style.setProperty('--color-jake', '#efeff1');
            root.style.setProperty('--color-title-link-hover', "#18181b");
            root.style.setProperty('--color-desc', "#efeff1");
            root.style.setProperty('--color-date', "#46464e");
            root.style.setProperty('--color-header-link', "#ffffff");
            root.style.setProperty('--color-header-link-hover', "#18181b");
            root.style.setProperty('--color-left-link', "#ffffff");
            root.style.setProperty('--color-left-link-hover', "#18181b");
            root.style.setProperty('--color-photo-filter', '#18181b61');
            specialJake = 5;
        break;
        //Creamscickle
        case 6:
            root.style.setProperty('--color-left', "#ffc46f");
            root.style.setProperty('--color-header', "#f7b453");
            root.style.setProperty('--color-content', "#f7b453");
            root.style.setProperty('--color-title', "#f14137");
            root.style.setProperty('--color-jake-emph', "#ffffff");
            root.style.setProperty('--color-jake', '#d4aa6c');
            root.style.setProperty('--color-title-link-hover', "#ffffff");
            root.style.setProperty('--color-desc', "#000000");
            root.style.setProperty('--color-date', "#ffffff");
            root.style.setProperty('--color-header-link', "#ffffff");
            root.style.setProperty('--color-header-link-hover', "#bbbbbb");
            root.style.setProperty('--color-left-link', "#ffffff");
            root.style.setProperty('--color-left-link-hover', "#bbbbbb");
            root.style.setProperty('--color-photo-filter', '#ffffff22');
            specialJake = 6;
        break;
        //Merko
        case 7:
            root.style.setProperty('--color-left', "#0b0f0b");
            root.style.setProperty('--color-header', "#0b0f0b");
            root.style.setProperty('--color-content', "#0b0f0b");
            root.style.setProperty('--color-title', "#abd200");
            root.style.setProperty('--color-jake-emph', "#abd200");
            root.style.setProperty('--color-jake', '#222623');
            root.style.setProperty('--color-title-link-hover', "#3b4808");
            root.style.setProperty('--color-desc', "#94b2a7");
            root.style.setProperty('--color-date', "#5d5a61");
            root.style.setProperty('--color-header-link', "#6abb8a");
            root.style.setProperty('--color-header-link-hover', "#94b2a7");
            root.style.setProperty('--color-left-link', "#6abb8a");
            root.style.setProperty('--color-left-link-hover', "#94b2a7");
            root.style.setProperty('--color-photo-filter', '#142f0f33');
            specialJake = 7;
        break;
        //Mustard
        case 10:
            root.style.setProperty('--color-left', "#505024");
            root.style.setProperty('--color-header', "#505024");
            root.style.setProperty('--color-content', "#505024");
            root.style.setProperty('--color-title', "#bc92f3");
            root.style.setProperty('--color-jake-emph', "#bc92f3");
            root.style.setProperty('--color-jake', '#ceceb7');
            root.style.setProperty('--color-title-link-hover', "#ceceb7");
            root.style.setProperty('--color-desc', "#ceceb7");
            root.style.setProperty('--color-date', "#e279aa");
            root.style.setProperty('--color-header-link', "#ceceb7");
            root.style.setProperty('--color-header-link-hover', "#86867a");
            root.style.setProperty('--color-left-link', "#ceceb7");
            root.style.setProperty('--color-left-link-hover', "#86867a");
            root.style.setProperty('--color-photo-filter', '#ceceb744');
            specialJake = 10;
        break;
        //dracula
        case 12:
            root.style.setProperty('--color-left', "#282a36");
            root.style.setProperty('--color-header', "#282a36");
            root.style.setProperty('--color-content', "#282a36");
            root.style.setProperty('--color-title', "#ff5555");
            root.style.setProperty('--color-jake-emph', "#f1fa8c");
            root.style.setProperty('--color-jake', '#6272a4');
            root.style.setProperty('--color-title-link-hover', "#bd93f9");
            root.style.setProperty('--color-desc', "#f8f8f2");
            root.style.setProperty('--color-date', "#8be9fd");
            root.style.setProperty('--color-header-link', "#f8f8f2");
            root.style.setProperty('--color-header-link-hover', "#bd93f9");
            root.style.setProperty('--color-left-link', "#f8f8f2");
            root.style.setProperty('--color-left-link-hover', "#bd93f9");
            root.style.setProperty('--color-photo-filter', '#464e6b33');
            specialJake = 12;
        break;
        //Gruvbox-material
        case 14:
            root.style.setProperty('--color-left', "#292828");
            root.style.setProperty('--color-header', "#292828");
            root.style.setProperty('--color-content', "#292828");
            root.style.setProperty('--color-title', "#ea6962");
            root.style.setProperty('--color-jake-emph', "#ea6962");
            root.style.setProperty('--color-jake', '#d4be98');
            root.style.setProperty('--color-title-link-hover', "#b85651a0");
            root.style.setProperty('--color-desc', "#d4be98");
            root.style.setProperty('--color-date', "#d8a657");
            root.style.setProperty('--color-header-link', "#d4be98");
            root.style.setProperty('--color-header-link-hover', "#928374");
            root.style.setProperty('--color-left-link', "#d4be98");
            root.style.setProperty('--color-left-link-hover', "#928374");
            root.style.setProperty('--color-photo-filter', '#6b5d4633');
            specialJake = 14;
        break;
        //SomeWave
        case 15:
            root.style.setProperty('--color-left', "#131222");
            root.style.setProperty('--color-header', "#131222");
            root.style.setProperty('--color-content', "#131222");
            root.style.setProperty('--color-title', "#9b1769");
            root.style.setProperty('--color-jake-emph', "#9b1769");
            root.style.setProperty('--color-jake', '#241530');
            root.style.setProperty('--color-title-link-hover', "#aa5578");
            root.style.setProperty('--color-desc', "#5fa19e");
            root.style.setProperty('--color-date', "#91a526");
            root.style.setProperty('--color-header-link', "#9b1769");
            root.style.setProperty('--color-header-link-hover', "#5fa19e");
            root.style.setProperty('--color-left-link', "#9b1769");
            root.style.setProperty('--color-left-link-hover', "#5fa19e");
            root.style.setProperty('--color-photo-filter', '#28233561');
            specialJake = 15;
        break;
        //High-visibility mode
        case 18:
            root.style.setProperty('--color-left', "#ffffff");
            root.style.setProperty('--color-header', "#ffffff");
            root.style.setProperty('--color-content', "#ffffff");
            root.style.setProperty('--color-title', "#e6e6e6");
            root.style.setProperty('--color-jake-emph', "#b7b7b7");
            root.style.setProperty('--color-jake', '#e6e6e6');
            root.style.setProperty('--color-title-link-hover', "#b7b7b7");
            root.style.setProperty('--color-desc', "#e6e6e6");
            root.style.setProperty('--color-date', "#e6e6e6");
            root.style.setProperty('--color-header-link', "#e6e6e6");
            root.style.setProperty('--color-header-link-hover', "#b7b7b7");
            root.style.setProperty('--color-left-link', "#e6e6e6");
            root.style.setProperty('--color-left-link-hover', "#b7b7b7");
            root.style.setProperty('--color-photo-filter', '#ffffff40');
            specialJake = 18;
        break;
        //Bits
        case 20:
            root.style.setProperty('--color-left', "#0f360e");
            root.style.setProperty('--color-header', "#0f360e");
            root.style.setProperty('--color-content', "#0f360e");
            root.style.setProperty('--color-title', "#96b70f");
            root.style.setProperty('--color-jake-emph', "#96b70f");
            root.style.setProperty('--color-jake', '#2f5f2f');
            root.style.setProperty('--color-title-link-hover', "#87a70f");
            root.style.setProperty('--color-desc', "#a5a5a5");
            root.style.setProperty('--color-date', "#2f5f2f");
            root.style.setProperty('--color-header-link', "#96b70f");
            root.style.setProperty('--color-header-link-hover', "#a5a5a5");
            root.style.setProperty('--color-left-link', "#96b70f");
            root.style.setProperty('--color-left-link-hover', "#a5a5a5");
            root.style.setProperty('--color-photo-filter', '#0f360e40');
            specialJake = 20;
        break;
        //Miami Retro
        case 22:
            root.style.setProperty('--color-left', "#7dabcf");
            root.style.setProperty('--color-header', "#7dabcf");
            root.style.setProperty('--color-content', "#7dabcf");
            root.style.setProperty('--color-title', "#d82892");
            root.style.setProperty('--color-jake-emph', "#d82892");
            root.style.setProperty('--color-jake', '#806599');
            root.style.setProperty('--color-title-link-hover', "#287675");
            root.style.setProperty('--color-desc', "#000000");
            root.style.setProperty('--color-date', "#806599");
            root.style.setProperty('--color-header-link', "#000000");
            root.style.setProperty('--color-header-link-hover', "#287675");
            root.style.setProperty('--color-left-link', "#000000");
            root.style.setProperty('--color-left-link-hover', "#287675");
            root.style.setProperty('--color-photo-filter', '#7dabcf11');
            specialJake = 22;
        break;
        //Atlantic Night
        case 23:
            root.style.setProperty('--color-left', "#020323");
            root.style.setProperty('--color-header', "#020323");
            root.style.setProperty('--color-content', "#020323");
            root.style.setProperty('--color-title', "#77bc81");
            root.style.setProperty('--color-jake-emph', "#a56360");
            root.style.setProperty('--color-jake', '#3e4b64');
            root.style.setProperty('--color-title-link-hover', "#287675");
            root.style.setProperty('--color-desc', "#959baa");
            root.style.setProperty('--color-date', "#806599");
            root.style.setProperty('--color-header-link', "#b8a663");
            root.style.setProperty('--color-header-link-hover', "#405b80");
            root.style.setProperty('--color-left-link', "#379b91");
            root.style.setProperty('--color-left-link-hover', "#405b80");
            root.style.setProperty('--color-photo-filter', '#02032359');
            specialJake = 23;
        break;
        //Blue screen of death
        case 26:
            root.style.setProperty('--color-left', "#0000FF");
            root.style.setProperty('--color-header', "#0000FF");
            root.style.setProperty('--color-content', "#0000FF");
            root.style.setProperty('--color-title', "#FFFFFF");
            root.style.setProperty('--color-jake-emph', "#00005a");
            root.style.setProperty('--color-jake', '#FFFFFF');
            root.style.setProperty('--color-title-link-hover', "#00005a");
            root.style.setProperty('--color-desc', "#ffffff");
            root.style.setProperty('--color-date', "#FFFFFF");
            root.style.setProperty('--color-header-link', "#ffffff");
            root.style.setProperty('--color-header-link-hover', "#00005a");
            root.style.setProperty('--color-left-link', "#ffffff");
            root.style.setProperty('--color-left-link-hover', "#00005a");
            root.style.setProperty('--color-photo-filter', '#FFFFFF24');
            specialJake = 26;
        break;
        //Grape LipStick
        case 27:
            root.style.setProperty('--color-left', "#290817");
            root.style.setProperty('--color-header', "#290817");
            root.style.setProperty('--color-content', "#290817");
            root.style.setProperty('--color-title', "#413e94");
            root.style.setProperty('--color-jake-emph', "#413e94");
            root.style.setProperty('--color-jake', '#94c598');
            root.style.setProperty('--color-title-link-hover', "#bd90a4");
            root.style.setProperty('--color-desc', "#bd90a4");
            root.style.setProperty('--color-date', "#94c598");
            root.style.setProperty('--color-header-link', "#bd90a4");
            root.style.setProperty('--color-header-link-hover', "#f0b1d0");
            root.style.setProperty('--color-left-link', "#bd90a4");
            root.style.setProperty('--color-left-link-hover', "#f0b1d0");
            root.style.setProperty('--color-photo-filter', '#bb18af24');
            specialJake = 27;
        break;
        //kimbie dark
        case 28:
            root.style.setProperty('--color-left', "#221a0e");
            root.style.setProperty('--color-header', "#221a0e");
            root.style.setProperty('--color-content', "#221a0e");
            root.style.setProperty('--color-title', "#bf2d47");
            root.style.setProperty('--color-jake-emph', "#bf2d47");
            root.style.setProperty('--color-jake', '#8f5e30');
            root.style.setProperty('--color-title-link-hover', "#855b60");
            root.style.setProperty('--color-desc', "#af8c66");
            root.style.setProperty('--color-date', "#829440");
            root.style.setProperty('--color-header-link', "#af8c66");
            root.style.setProperty('--color-header-link-hover', "#855b60");
            root.style.setProperty('--color-left-link', "#af8c66");
            root.style.setProperty('--color-left-link-hover', "#855b60");
            root.style.setProperty('--color-photo-filter', '#7557351c');
            specialJake = 28;
        break;
        //monokai
        case 29:
            root.style.setProperty('--color-left', "#171812");
            root.style.setProperty('--color-header', "#171812");
            root.style.setProperty('--color-content', "#171812");
            root.style.setProperty('--color-title', "#A6E22E");
            root.style.setProperty('--color-jake-emph', "#F92672");
            root.style.setProperty('--color-jake', '#F8F8F2');
            root.style.setProperty('--color-title-link-hover', "#6e961c");
            root.style.setProperty('--color-desc', "#F8F8F2");
            root.style.setProperty('--color-date', "#F92672");
            root.style.setProperty('--color-header-link', "#F8F8F2");
            root.style.setProperty('--color-header-link-hover', "#6e961c");
            root.style.setProperty('--color-left-link', "#F8F8F2");
            root.style.setProperty('--color-left-link-hover', "#6e961c");
            root.style.setProperty('--color-photo-filter', '#4c2a3833');
            specialJake = 29;
        break;
        //cookies and creme
        case 30:
            root.style.setProperty('--color-left', "#cec090");
            root.style.setProperty('--color-header', "#c3b688");
            root.style.setProperty('--color-content', "#c3b688");
            root.style.setProperty('--color-title', "#351607");
            root.style.setProperty('--color-jake-emph', "#351607");
            root.style.setProperty('--color-jake', '#F8F8F2');
            root.style.setProperty('--color-title-link-hover', "#F8F8F2");
            root.style.setProperty('--color-desc', "#F8F8F2");
            root.style.setProperty('--color-date', "#351607");
            root.style.setProperty('--color-header-link', "#F8F8F2");
            root.style.setProperty('--color-header-link-hover', "#351607");
            root.style.setProperty('--color-left-link', "#F8F8F2");
            root.style.setProperty('--color-left-link-hover', "#351607");
            root.style.setProperty('--color-photo-filter', '#3516073d');
            specialJake = 30;
        break;
        //cookies and creme
        case 31:
            root.style.setProperty('--color-left', "#f22580");
            root.style.setProperty('--color-header', "#ffffff");
            root.style.setProperty('--color-content', "#ffffff");
            root.style.setProperty('--color-title', "#f22580");
            root.style.setProperty('--color-jake-emph', "#351607");
            root.style.setProperty('--color-jake', '#ffffff');
            root.style.setProperty('--color-title-link-hover', "#351607");
            root.style.setProperty('--color-desc', "#351607");
            root.style.setProperty('--color-date', "#b294ff");
            root.style.setProperty('--color-header-link', "#f22580");
            root.style.setProperty('--color-header-link-hover', "#351607");
            root.style.setProperty('--color-left-link', "#ffffff");
            root.style.setProperty('--color-left-link-hover', "#351607");
            root.style.setProperty('--color-photo-filter', '#ffffff26');
            specialJake = 31;
        break;
        //hotdog stand
        case 34:
            root.style.setProperty('--color-left', "#f00");
            root.style.setProperty('--color-header', "#f00");
            root.style.setProperty('--color-content', "#f00");
            root.style.setProperty('--color-title', "#ffed00");
            root.style.setProperty('--color-jake-emph', "#351607");
            root.style.setProperty('--color-jake', '#F8F8F2');
            root.style.setProperty('--color-title-link-hover', "#351607");
            root.style.setProperty('--color-desc', "#F8F8F2");
            root.style.setProperty('--color-date', "#351607");
            root.style.setProperty('--color-header-link', "#F8F8F2");
            root.style.setProperty('--color-header-link-hover', "#351607");
            root.style.setProperty('--color-left-link', "#F8F8F2");
            root.style.setProperty('--color-left-link-hover', "#351607");
            root.style.setProperty('--color-photo-filter', '#ff000045');
            specialJake = 34;
        break;
        //white
        case 35:
            root.style.setProperty('--color-left', "#ffffff");
            root.style.setProperty('--color-header', "#ffffff");
            root.style.setProperty('--color-content', "#ffffff");
            root.style.setProperty('--color-title', "#000000");
            root.style.setProperty('--color-jake-emph', "#000000");
            root.style.setProperty('--color-jake', '#bdbdbd');
            root.style.setProperty('--color-title-link-hover', "#000000");
            root.style.setProperty('--color-desc', "#000000");
            root.style.setProperty('--color-date', "#bdbdbd");
            root.style.setProperty('--color-header-link', "#000000");
            root.style.setProperty('--color-header-link-hover', "#000000");
            root.style.setProperty('--color-left-link', "#000000");
            root.style.setProperty('--color-left-link-hover', "#000000");
            root.style.setProperty('--color-photo-filter', '#0000002b');
            specialJake = 35;
        break;
        //black
        case 36:
            root.style.setProperty('--color-left', "#000000");
            root.style.setProperty('--color-header', "#000000");
            root.style.setProperty('--color-content', "#000000");
            root.style.setProperty('--color-title', "#ffffff");
            root.style.setProperty('--color-jake-emph', "#ffffff");
            root.style.setProperty('--color-jake', '#232323');
            root.style.setProperty('--color-title-link-hover', "#ffffff");
            root.style.setProperty('--color-desc', "#ffffff");
            root.style.setProperty('--color-date', "#232323");
            root.style.setProperty('--color-header-link', "#ffffff");
            root.style.setProperty('--color-header-link-hover', "#ffffff");
            root.style.setProperty('--color-left-link', "#ffffff");
            root.style.setProperty('--color-left-link-hover', "#ffffff");
            root.style.setProperty('--color-photo-filter', '#0000006b');
            specialJake = 36;
        break;
        //off-white
        case 37:
            root.style.setProperty('--color-left', "#d6d5c6");
            root.style.setProperty('--color-header', "#d6d5c6");
            root.style.setProperty('--color-content', "#d6d5c6");
            root.style.setProperty('--color-title', "#232323");
            root.style.setProperty('--color-jake-emph', "#ffffff");
            root.style.setProperty('--color-jake', '#232323');
            root.style.setProperty('--color-title-link-hover', "#ffffff");
            root.style.setProperty('--color-desc', "#232323");
            root.style.setProperty('--color-date', "#ffffff");
            root.style.setProperty('--color-header-link', "#232323");
            root.style.setProperty('--color-header-link-hover', "#ffffff");
            root.style.setProperty('--color-left-link', "#232323");
            root.style.setProperty('--color-left-link-hover', "#ffffff");
            root.style.setProperty('--color-photo-filter', '#0000006b');
            specialJake = 37;
        break;
        //hulu
        case 38:
            root.style.setProperty('--color-left', "#151414");
            root.style.setProperty('--color-header', "#151414");
            root.style.setProperty('--color-content', "#151414");
            root.style.setProperty('--color-title', "#4fe783");
            root.style.setProperty('--color-jake-emph', "#4fe783");
            root.style.setProperty('--color-jake', '#232323');
            root.style.setProperty('--color-title-link-hover', "#ffffff");
            root.style.setProperty('--color-desc', "#ffffff");
            root.style.setProperty('--color-date', "#464646");
            root.style.setProperty('--color-header-link', "#4fe783");
            root.style.setProperty('--color-header-link-hover', "#ffffff");
            root.style.setProperty('--color-left-link', "#4fe783");
            root.style.setProperty('--color-left-link-hover', "#ffffff");
            root.style.setProperty('--color-photo-filter', '#0000006b');
            specialJake = 38;
        break;
        //GitHub
        case 39:
            root.style.setProperty('--color-left', "#ffffff");
            root.style.setProperty('--color-header', "#24292e");
            root.style.setProperty('--color-content', "#f6f8fa");
            root.style.setProperty('--color-title', "#24292e");
            root.style.setProperty('--color-jake-emph', "#3166d5");
            root.style.setProperty('--color-jake', '#232323');
            root.style.setProperty('--color-title-link-hover', "#69727c");
            root.style.setProperty('--color-desc', "#24292e");
            root.style.setProperty('--color-date', "#69727c");
            root.style.setProperty('--color-header-link', "#f6f8fa");
            root.style.setProperty('--color-header-link-hover', "#69727c");
            root.style.setProperty('--color-left-link', "#24292e");
            root.style.setProperty('--color-left-link-hover', "#69727c");
            root.style.setProperty('--color-photo-filter', '#0000006b');
            specialJake = 39;
        break;
        default:
            //Gruvbox-material
            root.style.setProperty('--color-left', "#292828");
            root.style.setProperty('--color-header', "#292828");
            root.style.setProperty('--color-content', "#292828");
            root.style.setProperty('--color-title', "#ea6962");
            root.style.setProperty('--color-jake-emph', "#ea6962");
            root.style.setProperty('--color-jake', '#d4be98');
            root.style.setProperty('--color-title-link-hover', "#b85651a0");
            root.style.setProperty('--color-desc', "#d4be98");
            root.style.setProperty('--color-date', "#d8a657");
            root.style.setProperty('--color-header-link', "#d4be98");
            root.style.setProperty('--color-header-link-hover', "#928374");
            root.style.setProperty('--color-left-link', "#d4be98");
            root.style.setProperty('--color-left-link-hover', "#928374");
            root.style.setProperty('--color-photo-filter', '#6b5d4633');
            specialJake = 14;
        break;
    }

    jakeContainer.innerHTML = '';

    for (i = 0; i < 40; i++) {
        if (i % 8 == 0) {
            jakeContainer.innerHTML += '</br>';
        }
        if (i == specialJake) {
            jakeContainer.innerHTML += '<span id="emph-jake" class="jake">&nbsp;Jake&nbsp;Hoffman</span>';
        } else {
            jakeContainer.innerHTML += '<span onclick="setTheme(' + i + ')" class="jake">&nbsp;Jake&nbsp;Hoffman</span>';
        }
        
    }
}

window.onload = function() {
    document.getElementById("content").innerHTML = '';
    thoughts();
    setTheme(localStorage.getItem('theme'));
};

const debounce = (fn) => {
    let frame;

    return (...params) => {
    
        if (frame) { 
            cancelAnimationFrame(frame);
        }

        frame = requestAnimationFrame(() => {
            fn(...params);
        });
    } 
};

// Reads out the scroll position and stores it in the data attribute
// so we can use it in our stylesheets
const storeScroll = () => {
    document.documentElement.dataset.scroll = window.scrollY;
}

// Listen for new scroll events, here we debounce our `storeScroll` function
document.addEventListener('scroll', debounce(storeScroll), { passive: true });

storeScroll();