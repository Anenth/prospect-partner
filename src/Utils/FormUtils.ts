export function getFormValues(e: Event): Record<string, string> {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const values: Record<string, string> = {};

  for (const [name, value] of formData.entries()) {
    values[name] = value.toString();
  }

  return values;
}
