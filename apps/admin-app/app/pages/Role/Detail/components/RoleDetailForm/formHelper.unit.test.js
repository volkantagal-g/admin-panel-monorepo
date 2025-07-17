import { validationSchema, getInitialValues } from './formHelper';

describe('Role/Detail/components/RoleDetailForm/formHelper', () => {
  it('should return validation schema successfully', () => {
    const schema = validationSchema();
    expect(schema).toBeDefined();
  });

  it('should retrieve initial values successfully', () => {
    const role = {
      name: 'Test Role',
      description: { en: 'English Description', tr: 'Turkish Description' },
      roleOwners: [{ _id: '1', name: 'Owner 1' }, { _id: '2', name: 'Owner 2' }],
      isActive: true,
    };
    const initialValues = getInitialValues(role);
    expect(initialValues).toEqual({
      name: 'Test Role',
      description: { en: 'English Description', tr: 'Turkish Description' },
      roleOwners: [
        { value: '1', label: 'Owner 1' },
        { value: '2', label: 'Owner 2' },
      ],
      isActive: true,
    });
  });
});
