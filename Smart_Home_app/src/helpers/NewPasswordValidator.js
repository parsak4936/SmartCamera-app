export function NewPAsswordValidator(password) {
    var pattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
    if (password.length <8) return 'رمز عبور  نمی تواند کمتر از 8 رقم باشد'

      if (!pattern.test(password)) return " رمز عبور باید شامل یک عدد و حداقل یک حرف بزرگ و یک حرف کوچک باشد";
      if (!password) return "رمز عبور  نمی تواند خالی باشد"
      
   return '';
}
//Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:

 