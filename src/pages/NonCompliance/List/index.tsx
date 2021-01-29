import React, { FC, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Layout from '../../../components/Layout';

import { NonComplianceInterface as NonCompliance, list, remove } from '../../../services/nonCompliance';

const List: FC = () => {
  const history = useHistory();
  const [data, setData] = useState<NonCompliance[]>([]);

  useEffect(() => {
    list().then(response => {
      setData(response)
    }).catch(error => 
      console.log(error)
    );
  }, []);

  const removeItem = (id: string) => {
    remove(id)
      .then(res => { 
        setData(data.filter(item => item.id !== id)) 
      })
      .catch(err => { console.log('error ', err) });
  };
  const editItem = (id: string) => {
    history.push(`/nonCompliance/edit/${id}`);
  };
  const viewItem = (id: string) => {
    history.push(`/nonCompliance/${id}`);
  };

  return (
    <Layout>
      <h2>Listagem de Ano</h2>

      <Link className="create" to="/nonCompliance/create">
        Cadastrar
      </Link>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Titulo</th>
            <th colSpan={1} />
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>
                  <button type="button" onClick={() => editItem(item.id)}>
                    Editar
                  </button>
                  {` - `}
                  <button type="button" onClick={() => viewItem(item.id)}>
                    Detalhes
                  </button>
                  {` - `}
                  <button type="button" onClick={() => removeItem(item.id)}>
                    Remover
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
};

export default List;
