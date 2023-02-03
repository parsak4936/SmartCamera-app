export function EqualValidator(newPassword,confirmedPassword) {
    if (newPassword.value !== confirmedPassword.value){
        return "رمز عبور با تکرار آن برابر نمی باشد"
    }

        

   return '';
}
//Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:

 