import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';

import { QualityControlInterface as QualityControl, find, findAllNonCompliance } from '../../../services/qualityControl';
import { NonComplianceInterface as NonCompliance } from '../../../services/nonCompliance';
import Layout from '../../../components/Layout';

const Wrapper = styled.div`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;

  b {
    line-height: 1.5;
    font-weight: 700;
  }
`;

const Button = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: #333;
  border: 1px solid #333;
  padding: 5px;
  border-radius: 5px;

  :hover {
    color: black;
    border-color: black;
  }
`;

const Details: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{id : string}>();
  const [data, setData] = useState<QualityControl>();
  const [listNonCompliance, setListNonCompliance] = useState<NonCompliance[]>();

  useEffect(() => {
    find(id).then(qualityControl => {
      setData(qualityControl);
      findAllNonCompliance(id)
        .then(nonCompliances => setListNonCompliance(nonCompliances))
        .catch(err => {
          console.log('error when loading nonCompliances', err);    
        })
      setLoading(false);
    }).catch(err => {
      console.log('error when loading qualityControl', err);
      history.goBack();
    })
  }, [history, id]);

  return (
    <Layout>
      <h2>Detalhes - Controle de Qualidade</h2>
      <Wrapper>
        { loading && !data ? (
            <h2>loading...</h2>
          ) : (
            <>
              <p>
                <b>ID:</b> <br /> {data?.id}
              </p>
              <p>
                <b>Data Inicio Avaliação:</b> <br /> {data?.evaluationDate.toString().split('-').reverse().join("/")}
              </p>
              <p>
                <b>Descrição:</b> <br /> {data?.parametrization.description}
              </p>
              <p>
                <b>Processo:</b> <br /> {data?.parametrization.process.name}
              </p>
              <p>
                <b>Descrição do Processo:</b> <br /> {data?.parametrization.process.description}
              </p>
              <p>
                <b>Tarefas do Processo:</b> <br /> {data?.parametrization.process.tasks}
              </p>

              { 
                listNonCompliance && listNonCompliance.length > 0 && (
                  <>
                    <hr />
                    <h3>Não confomidades</h3>
                    {
                      listNonCompliance?.map(nonCompliance => (
                        <>
                          <p>
                            <b>Titulo:</b> <br /> {nonCompliance.title}
                          </p>
                          <p>
                            <b>Data:</b> <br /> {nonCompliance.date.toString().split('-').reverse().join("/")}
                          </p>
                          <p>
                            <b>Norma de qualidade violada (código):</b> <br /> {nonCompliance.violatedRuleCode}
                          </p>
                          <Link to={`/nonCompliance/${nonCompliance.id}`}>ver mais</Link>
                          <br />
                        </>
                      ))
                    }
                    <hr />
                    <br />
                  </>
                )
              }
    
              <Button to='/qualityControl'>Voltar</Button>
              {' '}
              <Button to={`/qualityControl/${data?.id}/nonCompliance`}>Registrar Não Conformidade</Button>
            </>
          )
        }
      </Wrapper>
    </Layout>
  );
}

export default Details;
