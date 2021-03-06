import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("postApp.db");

export class DB {
  static init() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS postsApp (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, img TEXT, date TEXT,booked INT)",
          [],
          resolve,
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }
  static getPosts() {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM postsApp",
          [],
          (_, result) => {
            resolve(result.rows._array);
          },
          (_, error) => reject(error)
        );
      });
    });
  }
  static createPost({ text, date, img }) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `INSERT INTO postsApp (text,date,booked, img) VALUES (?,?,?,?)`,
          [text, date, 0, img],
          (_, result) => {
            resolve(result.insertId);
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });
  }
  static updatePost(post) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE postsApp SET booked = ? WHERE id = ?",
          [post.booked ? 0 : 1, post.id],
          resolve,
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }
  static removePost(id) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE postsApp WHERE id = ?",
          [id],
          resolve,
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  }

}
