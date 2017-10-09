export default function ({ isServer, store, req }) {
  console.log('in mid')
  if (isServer) {
    store.state.href = req.url
  }
}
