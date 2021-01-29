import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';

import { QualityControlInterface as QualityControl, find } from '../../../services/qualityControl';
import Layout from '../../../components/Layout';

const Wrapper = styled.div`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;

  b {
    line-height: 1.5;
    font-weight: 500;
  }
`;

const Button = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  color: #999;

  :hover {
    color: #333;
  }
`;

const Details: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{id : string}>();
  const [data, setData] = useState<QualityControl>();

  useEffect(() => {
    find(id).then(qualityControl => {
      setData(qualityControl);
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
                <b>Descrição:</b> <br /> {data?.parametrization.description}
              </p>
    
              <Button to='/qualityControl'>Voltar</Button>
            </>
          )
        }
      </Wrapper>
    </Layout>
  );
}

export default Details;
