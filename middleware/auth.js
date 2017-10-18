export default function (context) {
  if (!context.store.state.isAdmin) {
    return context.redirect('/home')
  }
}
