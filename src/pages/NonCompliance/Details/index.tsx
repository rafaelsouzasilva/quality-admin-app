import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';

import { NonComplianceInterface as NonCompliance, find } from '../../../services/nonCompliance';
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
  const [data, setData] = useState<NonCompliance>();

  useEffect(() => {
    find(id).then(nonCompliance => {
      setData(nonCompliance);
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
