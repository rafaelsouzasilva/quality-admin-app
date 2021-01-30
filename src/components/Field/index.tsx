/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import * as Formik from 'formik';

interface LabelProps {
  focused: boolean;
}

const Label = styled.label<LabelProps>`
  padding-top: calc(0.375rem + 1px);
  padding-bottom: calc(0.375rem + 1px);
  margin-bottom: 0;
  font-size: inherit;
  line-height: 1.5;
  color: #76838f;
  display: block;

  ${props =>
    props.focused &&
    css`
      color: #094684;
    `}
`;

const FieldStyled = styled(Formik.Field)`
  display: block;
  padding: 0.375rem 0.75rem;
  margin-bottom: calc(0.375rem + 1px);
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  outline: none;

  &:focus {
    border: 1px solid #094684;
    color: #094684;
  }
`;

interface FieldInterface {
  name: string;
  label?: string;
  type?: string;
  options?:
    | {
        id: string;
        description: string;
      }[]
    | null;
}

const Field: React.FC<FieldInterface> = ({
  label = '',
  name,
  type = 'text',
  options = null
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      {type !== 'hidden' && (
        <Label htmlFor={name} focused={focused}>
          {label}
        </Label>
      )}

      {type === 'select' ? (
        <Formik.Field
          as="select"
          id={name}
          name={name}
          style={{
            maxWidth: '400px',
            display: 'block',
            padding: '0.375rem 0.75rem',
            marginBottom: 'calc(0.375rem + 1px)',
            fontSize: '1rem',
            lineHeight: '1.5',
            color: '#495057',
            border: '1px solid #ced4da',
            borderRadius: '0.25rem',
            outline: 'none',
          }}
        >
          <option value="select-one">Selecione...</option>
          {options !== null
            ? options.map(opt => {
                return <option value={opt.id}>{opt.description}</option>;
              })
            : ''}
        </Formik.Field>
      ) : (
        <FieldStyled
          id={name}
          name={name}
          type={type}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
      <Formik.ErrorMessage name={name} />
    </div>
  );
};

export default Field;
