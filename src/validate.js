export function validateContact({ name, email, message }) {
  const errors = {}
  if (!String(name ?? '').trim()) errors.name = 'Please add your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email ?? '').trim())) {
    errors.email = 'Enter a valid email.'
  }
  if (String(message ?? '').trim().length < 8) {
    errors.message = 'Tell me a little more about the project.'
  }
  return errors
}
