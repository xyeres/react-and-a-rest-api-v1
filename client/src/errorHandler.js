
export default function errorHandler(err, history) {
    if (err.status === 401) {
        history.push('/forbidden')
    }
    if (err.status === 500) {
        history.push('/error')
    }
    if (err.status === 404) {
        history.push('/notfound')
    }
}
