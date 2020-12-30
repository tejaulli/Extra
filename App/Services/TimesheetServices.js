import axios from 'axios';
const USER_API_BASE_URL = 'http://devtmsapi.mindwavetech.com:9002/api/';
// const USER_API_BASE_URL = 'http://testtmsapi.mindwavetech.com:9001/api/';

class TimeSheetServices {
  create_timesheet(user) {
    let axiosConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return axios.post(
      USER_API_BASE_URL + 'create-timesheet/',
      user,
      axiosConfig,
    );
    // return axios.post('https://4erwkoqhzl.execute-api.ap-south-1.amazonaws.com/testexample' , user, axiosConfig);
  }

  viewEmployeeTimeSheet(orgId, userId) {
    // return axios.get(USER_API_BASE_URL + 'view-emp-timesheet/?userId=' + userID + '&userType=' + UserType);
    return axios.get(
      USER_API_BASE_URL +
        'view-emp-timesheet/?orgId=' +
        orgId +
        '&userId=' +
        userId,
    );
  }
  get_timesheet(orgId, userId, inputdate) {
    return axios.get(
      USER_API_BASE_URL +
        'get-timesheet-details/?orgId=' +
        orgId +
        '&userId=' +
        userId +
        '&date=' +
        inputdate,
    );
  }

  //Login Api
  login_api(email, password) {
    return axios.post(
      USER_API_BASE_URL +
        'user/login/?email=' +
        email +
        '&password=' +
        password,
    );
  }

  forget_password(email) {
    return axios.get(
      USER_API_BASE_URL + 'user/forget-password/?email=' + email,
    );
  }

  change_password(email, currentPassword, newPassword) {
    return axios.get(
      USER_API_BASE_URL +
        'user/change-password/?email=' +
        email +
        '&currentPassword=' +
        currentPassword +
        '&newPassword=' +
        newPassword,
    );
  }
}

export default new TimeSheetServices();
