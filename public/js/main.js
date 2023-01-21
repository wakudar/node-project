// const { application } = require('express');
function EncodeHTMLForm(data) {
  var params = [];

  for (var name in data) {
    var value = data[name];
    var param = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    params.push(param);
  }

  return params.join('&').replace(/%20/g, '+');
}

let appCrud = new Vue({
  el: '#crudUser',
  data: {
    username: '',
    password: '',
    postcode: '',
    address1: '',
    address2: '',
    address3: '',
    errors: [],
    isValid1: false, //入力チェック結果
    isValid2: false,
    isValid3: false,
    isValid4: false,
    isValid5: false,
  },
  watch: {
    username: function () {
      this.errors = [];
      this.isValid1 = true;
      if (
        !this.checkLength(this.username) ||
        !this.checkFormatUsername(this.username)
      ) {
        this.isValid1 = false;
      }
    },
    password: function () {
      this.errors = [];
      this.isValid2 = true;
      if (!this.checkFormatPassword(this.password)) {
        this.isValid2 = false;
      }
    },
    postcode: function () {
      this.errors = [];
      this.isValid3 = true;
      if (!this.checkFormatPostcode(this.postcode)) {
        this.isValid3 = false;
      }
    },
    address1: function () {
      this.errors = [];
      this.isValid4 = true;
      if (!this.checkNotFull(this.address1)) {
        this.isValid4 = false;
      }
    },
    address2: function () {
      this.errors = [];
      this.isValid5 = true;
      if (!this.checkNotFull(this.address2)) {
        this.isValid5 = false;
      }
    },
  },
  methods: {
    // ref: https://qiita.com/KWS_0901/items/c84e04e84383070c6257
    checkLength: function (inputdata) {
      var result = true;
      if (inputdata.length < 1 || inputdata.length > 10) {
        this.errors.push({
          UserName: 'ユーザ名の長さは1文字以上10文字未満です',
        });
        result = false;
      }
      return result;
    },
    checkFormatUsername: function (inputdata) {
      var result = true;
      var re = /^[0-9a-zA-Z]*$/;
      result = re.test(inputdata);
      if (!result) {
        this.errors.push({ UserName: '半角英数字のみです' });
      }
      return result;
    },
    checkFormatPassword: function (inputdata) {
      var result = true;
      var re = /^(?=.*[A-Z])(?=.*[.?/-])[a-zA-Z0-9.?/-]{8,12}$/;
      result = re.test(inputdata);
      if (!result) {
        this.errors.push({
          Password:
            'パスワードは大文字、小文字、数字がそれぞれ1つずつ含まれている必要があります',
        });
        this.errors.push({ Password: 'パスワードは8文字以上12文字以下です' });
        result = false;
      }
      return result;
    },
    checkFormatPostcode: function (inputdata) {
      var result = true;
      var re = /^[0-9]{3}[-][0-9]{4}$/;
      result = re.test(inputdata);
      if (!result) {
        this.errors.push({
          PostCode: '郵便番号の形式ではありません（半角数字、ハイフンあり）',
        });
        result = false;
      }
      return result;
    },
    checkNotFull: function (inputdata) {
      var result = true;
      if (!inputdata) {
        this.errors.push({
          Address: '必ず入力してください！',
        });
        result = false;
      }
      return result;
    },
    createUser: function () {
      console.log('Create the user.');

      // POSTメソッドで送信するデータ
      let userInfo = {
        UserName: this.username,
        Password: this.password,
        PostCode: this.postcode,
        Address: [this.address1, this.address2, this.address3],
      };

      let url = new URL('http://127.0.0.1:3000/create');
      // (4) POSTメソッドでデータを送信
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: EncodeHTMLForm(userInfo),
      })
        .then((response) => {
          // (1) 通信が成功したか確認する
          if (!response.ok) {
            // (2) 通信に失敗したときはエラーを発生させる
            throw new Error('Not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(JSON.stringify(data));
          alert(JSON.stringify(data));
        })
        .catch((error) => {
          // (5) エラーを受け取ったらコンソール出力
          console.error(error);
        });
    },
    updateUser: function () {
      // POSTメソッドで送信するデータ
      let userInfo = {
        UserName: this.username,
        Password: this.password,
        PostCode: this.postcode,
        Address: [this.address1, this.address2, this.address3],
      };

      console.log('Update the user.');
      let url = new URL('http://127.0.0.1:3000/update');
      url = url + '/' + this.username;
      // (4) POSTメソッドでデータを送信
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: EncodeHTMLForm(userInfo),
      })
        .then((response) => {
          // (1) 通信が成功したか確認する
          if (!response.ok) {
            // (2) 通信に失敗したときはエラーを発生させる
            throw new Error('Not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(JSON.stringify(data));
          alert(JSON.stringify(data));
        })
        .catch((error) => {
          // (5) エラーを受け取ったらコンソール出力
          console.error(error);
        });
    },
    readUser: function () {
      console.log('Read the user.');

      let url = new URL('http://127.0.0.1:3000/read');
      fetch(url)
        .then((response) => {
          // (1) 通信が成功したか確認する
          if (!response.ok) {
            // (2) 通信に失敗したときはエラーを発生させる
            throw new Error('Not ok');
          }
          // (3) レスポンスデータからJSONデータを取得
          return response.json();
        })
        .then((data) => {
          // (4) 受け取ったデータをコンソール出力
          // false: 判定結果が見つからなかった状態
          let flag = false;
          Object.keys(data).forEach((key) => {
            if (key === this.username) {
              console.log(JSON.stringify(data[key]));
              alert(JSON.stringify(data[key], null, 2));
              // true: 判定結果が見つかった状態
              flag = true;
            }
          });
          // 見つからなかったか、見つかったか
          if (flag === false) {
            alert('Not found');
          }
        })
        .catch((error) => {
          // (5) エラーを受け取ったらコンソール出力
          console.error(error);
        });
    },
    readallUser: function () {
      console.log('Read all user.');

      let url = new URL('http://127.0.0.1:3000/readall');
      fetch(url)
        .then((response) => {
          // (1) 通信が成功したか確認する
          if (!response.ok) {
            // (2) 通信に失敗したときはエラーを発生させる
            throw new Error('Not ok');
          }
          // (3) レスポンスデータからJSONデータを取得
          return response.json();
        })
        .then((data) => {
          // (4) 受け取ったデータをコンソール出力
          console.log(JSON.stringify(data));
          alert(JSON.stringify(data, null, 2));
        })
        .catch((error) => {
          // (5) エラーを受け取ったらコンソール出力
          console.error(error);
        });
    },
    deleteUser: function () {
      console.log('Delete the user.');
      let url = new URL('http://127.0.0.1:3000/delete');
      // ①URLにユーザーの名前を付ける
      // ref: https://www.i-ryo.com/entry/2020/08/13/205750#Delete%E3%83%87%E3%83%BC%E3%82%BF%E3%81%AE%E5%89%8A%E9%99%A4
      url = url + '/' + this.username;
      // fetch
      fetch(url, {
        method: 'DELETE',
      })
        .then((response) => {
          // (1) 通信が成功したか確認する
          if (!response.ok) {
            // (2) 通信に失敗したときはエラーを発生させる
            throw new Error('Not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(JSON.stringify(data));
          alert(JSON.stringify(data));
        })
        .catch((error) => {
          // (5) エラーを受け取ったらコンソール出力
          console.error(error);
        });
    },
    searchAddress: function () {
      let _this = this;
      new YubinBango.Core(this.postcode, function (addr) {
        if (addr.region === '') {
          console.log('not found');
          alert('郵便番号が見つかりません');
        } else {
          _this.address1 = addr.region; // 都道府県ID
          _this.address2 = addr.locality + addr.street; // 市区町村
          console.log(_this.address1, _this.address2);
        }
      });
    },
  },
});
