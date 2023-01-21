const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.use(express.static('public')); //静的配信のフォルダを指定
app.use(express.urlencoded({ extended: false }));

//viewsディレクトリ以下のejsファイル認識させる
app.set('views', './views');
app.set('view engine', 'ejs');

const UserInfoVm = require('./viewmodels/UserInfoViewModel');
const userVm = new UserInfoVm();

const UserInfo = require('./models/UserInfo');

// home
app.get('/home', (req, res) => {
  let results = [
    { id: 1, title: 'HTML', text: 'HyperTextMarkupLanguage' },
    { id: 1, title: 'HTML', text: 'HyperTextMarkupLanguage' },
  ];
  res.render('home.ejs', { items: results });
});

// Create
app.post('/create', (req, res) => {
  //let userInfo = new UserInfo();
  // userInfo.UserName = req.body.UserName;
  // userInfo.Password = req.body.Password;
  // userInfo.PostCode = req.body.PostCode;
  // userInfo.Address = req.body.Address;
  let rst = userVm.CreateUserInfo(req.body);
  if (rst == true) {
    res.json('Create Success!');
  } else {
    res.json('Create Failure!');
  }
});

// Read
app.get('/read', (req, res) => {
  let userInfos = userVm.ReadUserInfo();
  res.json(userInfos);
});

// Read-all
app.get('/readall', (req, res) => {
  let userInfos = userVm.ReadallUserInfo();
  res.json(userInfos);
});

// Update
app.put('/update/:userName', (req, res) => {
  let userName = req.params.userName;
  // let userInfo = new UserInfo();
  // userInfo.UserName = req.body.UserName;
  // userInfo.Password = req.body.Password;
  // userInfo.PostCode = req.body.PostCode;
  // userInfo.Address = req.body.Address;

  let rst = userVm.UpdateUserInfo(req.body);
  if (rst) {
    res.json('Update Success!');
  } else {
    res.json('Update Fail...');
  }
});

// Delete
// ②:userNameの書き方分かんなかったけど、expressの記法らしい
// ref ... https://tech.chakapoko.com/nodejs/express/params.html
app.delete('/delete/:userName', (req, res) => {
  let userName = req.params.userName;
  let rst = userVm.DeleteUserInfo(userName);
  // DeleteUserInfo関数から返ってきた結果を元にresへの結果を変える
  if (rst) {
    // ③res.jsonについて
    // ref ... https://teech-lab.com/node-express-json-webapi/1190/
    res.json('Delete Success!');
  } else {
    res.json('Delete Fail!');
  }
});

console.log('Start the node server......');
app.listen(3000, '127.0.0.1'); //3000ポートでローカルサーバーたつ
console.log('http://127.0.0.1:3000');
