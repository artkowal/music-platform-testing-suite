const protect = async (req, res, next) => {
  
  req.user = {
    user_id: 1, 
    email: 'nauczyciel@test.pl',
    role: 'teacher',
    first_name: 'Jan',
    last_name: 'Nauczyciel'
  };
  
  /*
  req.user = {
    user_id: 2, 
    email: 'uczen@test.pl',
    role: 'student',
    first_name: 'Adam',
    last_name: 'Uczeń'
  };
  */

  next();
};

module.exports = {
  protect,
};