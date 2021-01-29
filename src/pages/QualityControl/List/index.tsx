import React, { FC, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Layout from '../../../components/Layout';

import { QualityControlInterface as QualityControl, list } from '../../../services/qualityControl';

const List: FC = () => {
  const history = useHistory();
  const [data, setData] = useState<QualityControl[]>([]);

  useEffect(() => {
    list().then(response => {
      setData(response)
    }).catch(error => 
      console.log(error)
    );
  }, []);

  const viewItem = (id: string) => {
    history.push(`/qualityControl/${id}`);
  };

  return (
    <Layout>
      <h2>Listagem - Controle de Qualidade</h2>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Descrição</th>
            <th colSpan={1} />
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.parametrization.description}</td>
                <td>
                  <button type="button" onClick={() => viewItem(item.id)}>
                    Detalhes
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
