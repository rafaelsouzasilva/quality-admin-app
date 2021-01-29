import { api, headers } from '../api';

interface ProcessInterface {
  id: string;
  name: string;
  description: string;
  tasks: string;
  enabled: boolean;
}

interface ParametrizationQualityControlInterface {
  id: string;
  description: string;
  process: ProcessInterface;
}

export interface QualityControlInterface {
  id: string;
  evaluationDate: Date;
  enabled: boolean;
  closed: boolean;
  parametrization: ParametrizationQualityControlInterface;
}

const PATH = '/qualityControl'

const list = async (): Promise<QualityControlInterface[]> => {
  try {
    const response = await api.get<QualityControlInterface[]>(PATH, { headers });

    return response.data;
  } catch (err) {
    throw new Error('no qualityControl found');
  }
}

const find = async (id: string): Promise<QualityControlInterface> => {
  try {
    const response = await api.get<QualityControlInterface>(`${PATH}/${id}`, { headers });

    return response.data;
  } catch (err) {
    throw new Error('no qualityControl found');
  }
}

export { list, find }