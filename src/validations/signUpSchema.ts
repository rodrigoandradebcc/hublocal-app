import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    email: yup
      .string()
      .email('E-mail inválido')
      .required('E-mail é obrigatório'),
    password: yup
      .string()
      .min(6, 'Senha deve ter no mínimo 6 caracteres')
      .required('Senha é obrigatória'),
    confirmationPassword: yup
      .string()
      .oneOf([yup.ref('password'), ], 'As senhas devem ser iguais')
      .required('Confirmação de senha é obrigatória'),
});