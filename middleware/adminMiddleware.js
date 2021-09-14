
//TODO Şuanlık Kullanılmıyor : Kullanıcılarda isAdmin Özelliği Yok...

const admin = (req, res, next) => {
    if(!req.user.isAdmin) {
        return res.status(403).json({
            message: "Erişim Engellendi."
        })
    }

    next();
}