export default function authHeaders() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.Token) {
        return { 'x-access-token': user.Token};
    } else {
        return {};
    }
}