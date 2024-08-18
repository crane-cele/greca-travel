'use client'

import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { AgeGroup, schema } from '../utils/validationSchema';
import { TextField, Button, MenuItem, CircularProgress, Typography } from '@mui/material';
import styled from '@emotion/styled';

interface IFormInput {
  firstName: string;
  email: string;
  ageGroup: AgeGroup;
  address: string;
}

const FormWrapper = styled.div`
  max-width: 500px;
  margin: auto;
  margin-top: 5rem;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormField = styled.div`
  margin-bottom: 1rem;
`;

const Form: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: yupResolver(schema),
      defaultValues: {
      firstName: '',
      email: '',
      ageGroup: AgeGroup.Adult,
      address: '',
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: IFormInput) => {
      const response = await axios.post('/api/submit', data);
      return response.data;
    },
    onSuccess: () => {
      console.log('Form submitted successfully');
    },
    onError: (error: any) => {
      console.error('Error submitting form', error);
    }
  });

  const onSubmit: SubmitHandler<IFormInput> = data => {
    mutation.mutate(data);
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Form
        </Typography>
        <FormField>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                variant="outlined"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName ? errors.firstName.message : ''}
              />
            )}
          />
        </FormField>
        <FormField>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                fullWidth
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
              />
            )}
          />
        </FormField>
        <FormField>
          <Controller
            name="ageGroup"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Age Group"
                select
                variant="outlined"
                fullWidth
                error={!!errors.ageGroup}
                helperText={errors.ageGroup ? errors.ageGroup.message : ''}
              >
                {Object.values(AgeGroup).map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </FormField>
        <FormField>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address"
                variant="outlined"
                fullWidth
                error={!!errors.address}
                helperText={errors.address ? errors.address.message : ''}
              />
            )}
          />
        </FormField>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {mutation.status === 'pending' ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
        {mutation.status === 'error' && <Typography color="error">Error: {(mutation.error as Error).message}</Typography>}
        {mutation.status === 'success' && <Typography color="primary">Form submitted successfully!</Typography>}
      </form>
    </FormWrapper>
  );
};

export default Form;