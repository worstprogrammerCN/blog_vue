export default function (context) {
  if (context.isServer) {
    if (!context.req.session.isAdmin) {
      return context.redirect('/home')
    }
  }
}
