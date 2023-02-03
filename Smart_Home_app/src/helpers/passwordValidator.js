export function passwordValidator(password) {
  if (!password) return "رمز ورود نمی تواند خالی باشد"
  if (password.length < 5) return 'رمز ورود باید بیشتر از 5 حرف باشد.'
  return ''
}
