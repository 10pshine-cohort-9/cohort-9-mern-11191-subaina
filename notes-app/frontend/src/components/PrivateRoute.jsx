// No real auth yet — always renders children. Swap in a redirect to /login
// once an auth context exists and isAuthenticated is known.
const isAuthenticated = true

function PrivateRoute({ children }) {
  if (!isAuthenticated) {
    return null
  }

  return children
}

export default PrivateRoute
