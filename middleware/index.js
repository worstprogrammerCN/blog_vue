export default function ({ isServer, store, req }) {
  if (isServer) {
    store.state.href = req.url
  }
}
