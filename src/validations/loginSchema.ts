import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email('E-mail inválido')
      .required('E-mail é obrigatório'),
    password: yup
      .string()
      .min(6, 'Senha deve ter no mínimo 6 caracteres')
      .required('Senha é obrigatória'),
});