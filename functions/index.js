'use strict';

const LANGUAGES = ['pt','en','es','de','fr','it'];

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request-promise');

admin.initializeApp(functions.config().firebase);

exports.translate = functions.database.ref('/todos/{messageID}').onWrite(event => {
  const snapshot = event.data;
  const promises = [];

  for (let i = 0; i < LANGUAGES.length; i++) {
    if (snapshot.val() && (!snapshot.val().translate || !snapshot.val().translate[LANGUAGES[i]])) {
      if (LANGUAGES[i] == snapshot.val().lang) {
        return admin
          .database()
          .ref(`/todos/${snapshot.key}/translate/${snapshot.val().lang}`)
          .set(snapshot.val().title);
      } else {
        promises.push(createTranslationPromise(snapshot.val().lang, LANGUAGES[i], snapshot));
      }
    }
  }

  return Promise.all(promises);
});

function createTranslationPromise(source, target, snapshot) {
  const key = snapshot.key;
  const title = snapshot.val().title;

  return request(createTranslateUrl(source, target, title), {
    resolveWithFullResponse: true
  }).then(
    response => {
      if (response.statusCode === 200) {
        const data = JSON.parse(response.body).data;

        return admin
          .database()
          .ref(`/todos/${key}/translate/${target}`)
          .set(data.translations[0].translatedText);
      }
      throw response.body;
    });
}

function createTranslateUrl(source, target, payload) {
  return `https://www.googleapis.com/language/translate/v2?key=${functions.config().firebase.apiKey}&source=${source}&target=${target}&q=${payload}`;
}
