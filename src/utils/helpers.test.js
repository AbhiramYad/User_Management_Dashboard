import { describe, it, expect } from 'vitest';
import { splitName, mapUserData } from './helpers';
import { DEPARTMENTS } from './constants';

describe('splitName helpers', () => {
  it('should split standard first and last name', () => {
    const result = splitName('Leanne Graham');
    expect(result).toEqual({ firstName: 'Leanne', lastName: 'Graham' });
  });

  it('should split multi-word last names correctly', () => {
    const result = splitName('Ervin Howell Ledger');
    expect(result).toEqual({ firstName: 'Ervin', lastName: 'Howell Ledger' });
  });

  it('should handle single names with no space', () => {
    const result = splitName('Clementina');
    expect(result).toEqual({ firstName: 'Clementina', lastName: '' });
  });

  it('should handle empty names and whitespace', () => {
    expect(splitName('')).toEqual({ firstName: '', lastName: '' });
    expect(splitName('   ')).toEqual({ firstName: '', lastName: '' });
  });

  it('should handle missing parameters', () => {
    expect(splitName(undefined)).toEqual({ firstName: '', lastName: '' });
  });
});

describe('mapUserData mapper', () => {
  it('should correctly map user schema and assign departments', () => {
    const mockApiUser = {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      company: { name: 'Keebler LLC' }
    };

    const mapped = mapUserData(mockApiUser, 1);
    expect(mapped.id).toBe(5);
    expect(mapped.firstName).toBe('Chelsey');
    expect(mapped.lastName).toBe('Dietrich');
    expect(mapped.email).toBe('Lucio_Hettinger@annie.ca');
    expect(mapped.department).toBe(DEPARTMENTS[1 % DEPARTMENTS.length]);
  });
});
