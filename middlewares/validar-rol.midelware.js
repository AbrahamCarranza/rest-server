esAdministrador = (req, res, next) => {

    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Aún no se ha verificado el token'
        });
    }

    const { strRol, strNombre } = req.usuario;

    if (strRol !== 'ROL_ADMINISTRADOR') {
        return res.status(401).json({
            msg: `El usuario '${strNombre}' no tiene permisos de administrador.`
        });
    }

    next();
};

tieneRol = (...roles) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Aún no se ha verificado el token'
            });
        }

        if (!roles.includes(req.usuario.strRol)) {
            return res.status(401).json({
                msg: 'Usted no cuenta con los permisos necesarios para realizar esta acción'
            });
        }
        next();
    };
};

module.exports = {
    esAdministrador,
    tieneRol
};