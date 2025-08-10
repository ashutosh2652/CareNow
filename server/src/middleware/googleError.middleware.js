export default function (err, _, res, next) {
    if (err) return res.redirect("http://localhost:5173/auth/login");
    next();
}
