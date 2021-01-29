import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Layout from '../../../components/Layout';
//import Field from '../../../components/Field';
//import { Button } from '../../../components/Form/Button';
import { Formik, Form } from 'formik';

import { create, find, update, NonComplianceInterface as NonCompliance } from '../../../services/nonCompliance';

const YearForm: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string | undefined }>();

  const [data, setData] = useState<NonCompliance | undefined>();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if(id) {
      find(id)
        .then(year => {
          setData(year);
          setEditMode(true);
        })
        .catch(err => {
          console.log(err);
          setData({} as NonCompliance);
        })
    } else {
      setData({} as NonCompliance);
    }
  }, [id])

  const handleSubmit = async (values: NonCompliance) => {
    if (editMode) {
      await update(values);
    } else {
      await create(values);
    }
    history.push(`/year`);
  };

  return (
    <>
      { 
        data && 
        <Layout>
          <Formik initialValues={data} onSubmit={handleSubmit}>
            <Form>
              
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

export default YearForm;
