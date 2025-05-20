import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

configure({
  asyncUtilTimeout: 2000,
  testIdAttribute: 'data-testid',
}); 