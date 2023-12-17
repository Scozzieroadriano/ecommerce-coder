function validateUser(req, res, next) {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    const { email, password } = req.body;
  
    if (!emailRegex.test(email)) {
      return res.status(400).send('Formato de correo electrónico no válido');
    }
  
    if (!passwordRegex.test(password)) {
      return res.status(400).send('La contraseña debe tener entre 6 y 20 caracteres, y contener al menos un número, una letra minúscula y una letra mayúscula');
    }
  
    next();
  }
  
  export default validateUser;