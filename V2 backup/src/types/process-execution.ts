import { z } from 'zod';

export interface ProcessParameter {
  name: string;
  value: string;
}

export interface ProcessDefinition {
  name: string;
  parameters: string[];
}

export interface ProcessList {
  [processName: string]: string[];
}

export const processParameterSchema = z.object({
  name: z.string(),
  value: z.string()
});

export const processExecutionSchema = z.object({
  processName: z.string(),
  parameters: z.array(processParameterSchema)
});