import { Router } from 'express';
/// shared interface across the project
export interface IServices {
  path: string;
  r: Router;
}
