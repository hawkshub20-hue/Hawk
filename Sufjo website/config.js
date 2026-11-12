// Shift Board settings.
//
// While SHIFTBOARD_FIREBASE is null, the site runs in demo mode: everything is saved
// in the browser of the device you're using, and other phones can't see it.
//
// To share one schedule with everyone, follow SETUP.md and paste your Firebase
// web app settings below, replacing null. It should look like this:
//
// window.SHIFTBOARD_FIREBASE = {
//   apiKey: "AIza...",
//   authDomain: "your-project.firebaseapp.com",
//   projectId: "your-project",
//   storageBucket: "your-project.appspot.com",
//   messagingSenderId: "1234567890",
//   appId: "1:1234567890:web:abc123"
// };
```js
window.SHIFTBOARD_FIREBASE = { 
apiKey: "AIzaSyBcyVQAfuCXmxHycvYHZr1FUf_WgTbPb5w",
authDomain: "hawk-s-hub.firebaseapp.com",
databaseURL: "https://hawk-s-hub-default-rtdb.firebaseio.com",
projectId: "hawk-s-hub",
storageBucket: "hawk-s-hub.firebasestorage.app",
messagingSenderId: "317093177573",
appId: "1:317093177573:web:556c558a1707cc30f84c0c",
measurementId: "G-2KT2LCMSPR" 
};

// Name of this schedule inside Firebase. Change it only if you run two separate
// boards (for example two locations) from the same Firebase project.
window.SHIFTBOARD_ID = "main";
