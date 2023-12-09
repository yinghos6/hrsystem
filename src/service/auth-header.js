export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    console.log(user);

    console.log(user.jwt_token);

  
    if (user && user.jwt_token) {
      return { Authorization: 'Bearer '+ user.jwt_token };
    } else {
      return {};
    }
  }