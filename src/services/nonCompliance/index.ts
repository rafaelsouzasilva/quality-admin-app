import { api, headers } from '../api';

import { QualityControlInterface } from '../qualityControl';

export interface NonComplianceInterface {
  id: string;
  title: string;
  description: string;
  date: Date;
  origin: string;
  enabled: boolean;
  violatedRuleCode: string;
  violatedRuleDescription: string;
  qualityControl: QualityControlInterface;
}

const PATH = '/nonCompliance'

const create = async (
    data: Omit<NonComplianceInterface, 'íd'>
): Promise<NonComplianceInterface> => {
  try {
    const response = await api.post<NonComplianceInterface>(PATH, data, { headers });

    return response.data
  } catch (err) {
    throw new Error('error when creating year');
  }
}

const update = async (
  data: NonComplianceInterface,
): Promise<NonComplianceInterface> => {
  try {
    const response = await api.patch<NonComplianceInterface>(`${PATH}/${data.id}`, data , { headers });

    return response.data
  } catch (err) {
    throw new Error('error when updating nonCompliance');
  }
}

const list = async (): Promise<NonComplianceInterface[]> => {
  try {
    const response = await api.get<NonComplianceInterface[]>(PATH, { headers });

    return response.data;
  } catch (err) {
    throw new Error('no nonCompliance found');
  }
}

const find = async (id: string): Promise<NonComplianceInterface> => {
  try {
    const response = await api.get<NonComplianceInterface>(`${PATH}/${id}`, { headers });

    return response.data;
  } catch (err) {
    throw new Error('no nonCompliance found');
  }
}

const remove = async (id: string): Promise<boolean> => {
  try {
    await api.delete<NonComplianceInterface>(`${PATH}/${id}`, { headers });
    return true;
  } catch (err) {
    throw new Error('no nonCompliance found');
  }
}

export { create, update, remove, list, find }