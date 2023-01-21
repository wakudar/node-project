const UserInfo = require('../models/UserInfo');

module.exports = class UserInfoViewModel {
  /* to save the users' info */
  #_userInfos = {
    wxingm: new UserInfo('wxingm', '123456', '2420015', [
      'kanagawa',
      'yamato',
      '1-2-1',
    ]),
    mcs001: new UserInfo('mcs001', '7890123', '3420015', [
      'tiba',
      'funabashi',
      '4-5-1',
    ]),
  };

  CreateUserInfo(userInfo) {
    if (!this.#_userInfos[userInfo.UserName]) {
      this.#_userInfos[userInfo.UserName] = userInfo;
      return true;
    }
    return false;
  }

  ReadUserInfo(userNames) {
    let userInfos = this.#_userInfos;

    return userInfos;
  }

  ReadallUserInfo() {
    let userInfos = this.#_userInfos;

    return userInfos;
  }

  UpdateUserInfo(userInfo) {
    // もし指定した名前のユーザがいたら更新してtrueを返す
    // いなかったら更新せずにfalseを返す
    if (this.#_userInfos[userInfo.UserName]) {
      this.#_userInfos[userInfo.UserName] = userInfo;
      return true;
    } else {
      return false;
    }
  }

  // ④ delete関数は、削除しようとしたプロパティが存在しない場合もTrueを返す
  // ref ... https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/delete
  DeleteUserInfo(userName) {
    let retval = delete this.#_userInfos[userName];
    if (retval) {
      return true;
    } else {
      return false;
    }
  }
};
