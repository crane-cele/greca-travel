import * as yup from 'yup';

export enum AgeGroup {
  Adult = 'Adult',
  Child = 'Child',
  Infant = 'Infant'
}

export const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  ageGroup: yup.mixed<AgeGroup>().oneOf(Object.values(AgeGroup)).required('Age group is required'),
  address: yup.string().required('Address is required')
});