export function validateContact({ name, email, message, phone }) {
  const errors = {}
  if (!String(name ?? '').trim()) errors.name = 'Please add your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email ?? '').trim())) {
    errors.email = 'Enter a valid email.'
  }
  const phoneValue = String(phone ?? '').trim()
  if (phoneValue && phoneValue.replace(/[\s().+-]/g, '').length < 7) {
    errors.phone = 'Enter a valid phone number, or leave it blank.'
  }
  if (String(message ?? '').trim().length < 8) {
    errors.message = 'Tell me a little more about the project.'
  }
  return errors
}
