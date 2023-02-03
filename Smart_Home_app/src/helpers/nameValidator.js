export function nameValidator(name,props) {
  if (!name) return "نام نمی تواند خالی باشد"
  if (name.length < 5) return 'رمز ورود باید بیشتر از 5 حرف باشد.'
  // console.log(props.message)
  return ''
}
 