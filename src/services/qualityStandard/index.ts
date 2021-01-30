import { api, headers } from '../api';

export interface QualityStandardInterface {
  code: string;
  description: string;
}

const PATH = '/qualityStandard'

const list = async (): Promise<QualityStandardInterface[]> => {
  try {
    const response = await api.get<QualityStandardInterface[]>(PATH, { headers });

    return response.data;
  } catch (err) {
    throw new Error('no qualityStandard found');
  }
}

export { list }