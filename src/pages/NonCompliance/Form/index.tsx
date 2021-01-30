import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';

import Layout from '../../../components/Layout';
import Field from '../../../components/Field';
import { Formik, Form } from 'formik';

import { create, find, update, NonComplianceInterface as NonCompliance } from '../../../services/nonCompliance';
import { list as listQualityControl, QualityControlInterface as QualityControl } from '../../../services/qualityControl';
import { list as listQualityStandard, QualityStandardInterface as QualityStandard } from '../../../services/qualityStandard';


const Button = styled.button`
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  background: #094684;
  color: #fff;
  cursor: pointer;
`;

const NonComplianceForm: React.FC = () => {
  const history = useHistory();
  const { idQualityControl } = useParams<{idQualityControl: string | ''}>();
  const { id } = useParams<{ id: string | undefined }>();

  const [data, setData] = useState<NonCompliance>({
    id: '',
    title: '',
    description: '',
    date: new Date(),
    origin: '',
    enabled: true,
    violatedRuleCode: '',
    violatedRuleDescription: '',
    qualityControl: {
      id: idQualityControl
    }
  });
  const [editMode, setEditMode] = useState(false);
  
  const [qualityControl, setQualityControl] = useState<QualityControl[]>()
  const [qualityStandard, setQualityStandard] = useState<QualityStandard[]>()

  useEffect(() => {
    listQualityControl()
      .then(list => setQualityControl(list))
      .catch(err => {
        console.log('error listing quality control', err)
        setQualityControl([])
      });

    listQualityStandard()
      .then(list => setQualityStandard(list))
      .catch(err => {
        console.log('error listing quality standard', err)
        setQualityStandard([])
      });

    if(id) {
      find(id)
        .then(nonCompliance => {
          setData(nonCompliance);
          setEditMode(true);
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [id])

  const handleSubmit = async (values: NonCompliance) => {
    const selectedQuality = qualityStandard?.filter(q => q.code === values.violatedRuleCode)[0];
    values.violatedRuleDescription = selectedQuality?.description ? selectedQuality.description : '';
    
    if (editMode) {
      await update(values);
    } else {
      await create(values);
    }
    history.push(`/nonCompliance`);
  };

  return (
    <>
      { 
        data && 
        <Layout>
          <h2>{editMode ? 'Alterar' : 'Criar'} - Não Confomidade</h2>
          <Formik initialValues={data} onSubmit={handleSubmit}>
            <Form>
              <Field name="id" type="hidden" />
              <Field name="date" type="hidden" />
              <Field name="enabled" type="hidden" />

              <Field name="title" label="Titulo" />
              <Field name="description" label="Descrição" />
              <Field name="origin" label="Origem" />
              <Field 
                name="violatedRuleCode" 
                label="Código Regra Qualidade Violada"
                type="select"
                options={qualityStandard?.map(item => {
                  return {
                    id: item.code,
                    description: `${item.code} - ${item.description}`
                  }
                })}
                />
              <Field 
                name="qualityControl.id" 
                label="Controle de Qualidade"
                type="select"
                options={qualityControl?.map(item => {
                  return {
                    id: item.id,
                    description: item.parametrization.description
                  }
                })}
                />
              <Button type="submit">Salvar</Button>
            </Form>
          </Formik>
        </Layout>
      }
      { 
        !data && <p>loading...</p>
      }
    </>
  );
};

export default NonComplianceForm;
