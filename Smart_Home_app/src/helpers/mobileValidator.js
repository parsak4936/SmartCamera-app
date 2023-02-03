export function numberValidator(mobile) {
    var pattern = new RegExp(/^[0-9\b]+$/);

      if (!pattern.test(mobile)) return "لطفا شماره تلفن  رابه  انگلیسی وارد کنید";
      if (!mobile) return "شماره تلفن نمی تواند خالی باشد"
      if (mobile.length <11) return 'شماره تلفن همراه نمی تواند کمتر از 11 رقم باشد'

   return '';
}
//Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:

//"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"