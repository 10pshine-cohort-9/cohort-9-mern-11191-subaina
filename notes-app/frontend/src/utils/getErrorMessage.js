export function getErrorMessage(err, fallback) {
  const data = err.response?.data

  if (data?.errors?.length) {
    return data.errors.map((fieldError) => fieldError.message).join(' ')
  }

  return data?.message || fallback
}
