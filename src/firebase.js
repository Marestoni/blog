import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

    //Configurações do seu projeto
    let firebaseConfig = {
        apiKey: "AIzaSyAvQGKeqb8OR6S5zw42FxEh5Hru-3tGod4",
        authDomain: "reactapp-1f26d.firebaseapp.com",
        databaseURL: "https://reactapp-1f26d.firebaseio.com",
        projectId: "reactapp-1f26d",
        storageBucket: "reactapp-1f26d.appspot.com",
        messagingSenderId: "1010900633320",
        appId: "1:1010900633320:web:b42ae51843d110c817eb5d"
    };

class Firebase{
  constructor(){
    app.initializeApp(firebaseConfig);

    //Referenciando a database para acessar em outros locais
    this.app = app.database();

    this.storage = app.storage();
  }

  login(email, password){
    return app.auth().signInWithEmailAndPassword(email, password)
  }

  logout(){
    return app.auth().signOut();
  }

  async register(nome, email, password){
    await app.auth().createUserWithEmailAndPassword(email, password)

    const uid = app.auth().currentUser.uid;

    return app.database().ref('usuarios').child(uid).set({
      nome: nome
    })

  }

  isInitialized(){
      return new Promise(resolve =>{
          app.auth().onAuthStateChanged(resolve);
      })
  }

  getCurrent(){
    return app.auth().currentUser && app.auth().currentUser.email
  }

  getCurrentUid(){
    return app.auth().currentUser && app.auth().currentUser.uid
  }

  async getUserName(callback){
    if(!app.auth().currentUser){
      return null;
    }

    const uid = app.auth().currentUser.uid;
    await app.database().ref('usuarios').child(uid)
    .once('value').then(callback);

  }

}

export default new Firebase();