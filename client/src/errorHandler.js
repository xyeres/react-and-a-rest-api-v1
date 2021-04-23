
/**
  * Handle general HTTP status codes throughout the site 
  * and push user to corisponding routes
*/
export default function errorHandler(err, history) {
    if (err.status === 401 || err.status === 403) {
        history.push('/forbidden')
    }
    if (err.status === 500 || err.message.includes('NetworkError')) {
        history.push('/error')
    }
    if (err.status === 404) {
        history.push('/notfound')
    }
}
