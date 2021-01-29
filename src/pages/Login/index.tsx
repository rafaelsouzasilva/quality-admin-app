import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/img/logo.png';

import {
  Formik,
  Form as FormikForm,
  Field
} from 'formik';

import { useAuth } from '../../hooks/AuthContext';

interface SignInCredentials {
  email: string;
  password: string;
}

const Background = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  padding-top: 40px;
`;

const Form = styled(FormikForm)`
  width: 100%;
  max-width: 400px;
  margin: auto;
`;

const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const FieldGroup = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const Input = styled(Field)`
  width: 94%;
  height: 1.5rem;
  padding: 0.75rem;
  font-size: 1rem;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.3rem;
`;

const Button = styled.button`
  width: 100%;
  background: #00bdf3;
  border: 0px;
  border-radius: 0.3rem;
  font-size: 1.25rem;
  padding: 0.75rem 1rem;
  color: #fff;
`;

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const history = useHistory();

  const data = {
    email: '',
    password: '',
  };

  const handleSubmit = useCallback(
    async (data: SignInCredentials) => {
      const logged = await signIn(data);

      if(logged) {
        history.push("/");
      }
    }, [signIn, history]);

  return (
    <Background>
      <Formik initialValues={data} onSubmit={handleSubmit}>
        <Form>
          <LogoWrapper>
            <img src={logo} alt="Gestão Escolar" />
          </LogoWrapper>

          <FieldGroup>
            <Input placeholder="E-mail" name="email" />
            <span className="text-danger" />
          </FieldGroup>

          <FieldGroup>
            <Input type="password" placeholder="Senha" name="password" />
            <span className="text-danger" />
          </FieldGroup>

          <Button type="submit">Entrar</Button>
        </Form>
      </Formik>
    </Background>
  );
};

export default Login;
