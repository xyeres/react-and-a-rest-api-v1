
export default function errorHandler(err, history) {
    console.log(err)
    if (err.status === 401 || err.status === 403) {
        history.push('/forbidden')
    }
    if (err.status === 500) {
        history.push('/error')
    }
    if (err.status === 404) {
        history.push('/notfound')
    }
}
