import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';

import { NonComplianceInterface as NonCompliance, find } from '../../../services/nonCompliance';
import { QualityControlInterface as QualityControl, find as findQuality } from '../../../services/qualityControl';
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
  const [data, setData] = useState<NonCompliance>();
  const [quality, setQuality] = useState<QualityControl>();

  useEffect(() => {
    find(id).then(nonCompliance => {
      setData(nonCompliance);
      findQuality(nonCompliance.qualityControl.id)
        .then(q => setQuality(q))
        .catch(err => {
          console.log('error when loading quality', err);
        })
      setLoading(false);
    }).catch(err => {
      console.log('error when loading nonCompliance', err);
      history.goBack();
    })
  }, [history, id]);

  return (
    <Layout>
      <h2>Detalhes - Não conformidade</h2>
      <Wrapper>
        { loading && !data ? (
            <h3>loading...</h3>
          ) : (
            <>
              <p>
                <b>ID:</b> <br /> {data?.id}
              </p>
              <p>
                <b>Titulo:</b> <br /> {data?.title}
              </p>
              <p>
                <b>Descrição:</b> <br /> {data?.description}
              </p>
              <p>
                <b>Data:</b> <br /> {data?.date.toString().split('-').reverse().join("/")}
              </p>
              <p>
                <b>Origem:</b> <br /> {data?.origin}
              </p>
              <p>
                <b>Ativa?</b> <br /> {data?.enabled}
              </p>
              <p>
                <b>Norma de qualidade violada (código):</b> <br /> {data?.violatedRuleCode}
              </p>
              <p>
                <b>Norma de qualidade violada (descrição):</b> <br /> {data?.violatedRuleDescription}
              </p>

              <p>
                <b>Controle de Qualidade:</b> <Link to={`/qualityControl/${quality?.id}`}>ver detalhes</Link>
                <br /> {quality?.parametrization.description}
              </p>

              <Button to='/nonCompliance'>Voltar</Button>
              {` - `}
              <Button to={`/nonCompliance/edit/${id}`}>Editar</Button>
            </>
          )
        }
      </Wrapper>
    </Layout>
  );
}

export default Details;
