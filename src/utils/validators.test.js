import { describe, it, expect } from 'vitest';
import { validateUser } from './validators';

describe('validateUser client-side validators', () => {
  it('should pass on valid inputs', () => {
    const validData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      department: 'Engineering'
    };

    const errors = validateUser(validData);
    expect(errors).toEqual({});
  });

  it('should identify empty fields', () => {
    const invalidData = {
      firstName: '',
      lastName: ' ',
      email: '',
      department: ''
    };

    const errors = validateUser(invalidData);
    expect(errors.firstName).toBeDefined();
    expect(errors.lastName).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.department).toBeDefined();
  });

  it('should enforce name length boundaries', () => {
    const invalidData = {
      firstName: 'A',
      lastName: 'B',
      email: 'valid@email.com',
      department: 'Sales'
    };

    const errors = validateUser(invalidData);
    expect(errors.firstName).toBe('First Name must be at least 2 characters');
    expect(errors.lastName).toBe('Last Name must be at least 2 characters');
  });

  it('should enforce correct email address syntax structures', () => {
    const checkEmail = (email) => validateUser({
      firstName: 'Alice',
      lastName: 'Smith',
      email,
      department: 'HR'
    });

    expect(checkEmail('invalid-email').email).toBeDefined();
    expect(checkEmail('invalid@').email).toBeDefined();
    expect(checkEmail('invalid@domain').email).toBeDefined();
    expect(checkEmail('alice@domain.').email).toBeDefined();
    expect(checkEmail('alice@domain.c').email).toBeDefined(); // should be at least .co, .com (2+ chars)
    expect(checkEmail('alice.smith@domain.com').email).toBeUndefined();
  });
});
