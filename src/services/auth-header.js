export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));
  let accessToken = JSON.parse(localStorage.getItem('access-token'));
  let client = JSON.parse(localStorage.getItem('client'));
  let uid = JSON.parse(localStorage.getItem('uid'));

  if (user && accessToken && client && uid) {
    // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    return { 
      // for Node.js Express back-end
      'access-token': accessToken,
      'client': client,
      'uid': uid
    };       
  } else {
    return {
      "Access-Control-Allow-Origin": "*"
    };
  }
}
