export function isCNPJValid(cnpj: string): boolean {
  cnpj = cnpj.replace(/\D/g, "");

  if (cnpj.length !== 14) {
    return false;
  }

  if (/^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  let sum = 0;
  let weight = 2;
  for (let i = 11; i >= 0; i--) {
    const digit = parseInt(cnpj.charAt(i));
    sum += digit * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }

  const mod = sum % 11;
  const firstDigit = mod < 2 ? 0 : 11 - mod;

  sum = 0;
  weight = 2;
  for (let i = 12; i >= 0; i--) {
    const digit = parseInt(cnpj.charAt(i));
    sum += digit * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }

  const mod2 = sum % 11;
  const secondDigit = mod2 < 2 ? 0 : 11 - mod2;

  if (
    parseInt(cnpj.charAt(12)) !== firstDigit ||
    parseInt(cnpj.charAt(13)) !== secondDigit
  ) {
    return false;
  }
  return true;
  }