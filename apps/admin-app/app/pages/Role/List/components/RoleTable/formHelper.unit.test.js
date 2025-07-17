import { validationSchema } from './formHelper';

describe('Role/List/components/RoleRequests/formHelper', () => {
  it('should return validation schema', () => {
    const schema = validationSchema();
    expect(schema).toBeDefined();
  });

  it('should throw an error when request reason is not provided in request validation schema', () => {
    const schema = validationSchema();
    const values = { };
    expect(() => schema.validateSync(values)).toThrow();
  });
});
