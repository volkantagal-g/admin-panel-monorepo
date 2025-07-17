import { rejectRequestValidationSchema, approveRequestValidationSchema, objectIdValidationSchema } from './formHelper';

describe('Role/List/components/RoleRequests/formHelper', () => {
  it('should return validation schema for rejecting a request successfully', () => {
    const validationSchema = rejectRequestValidationSchema();
    expect(validationSchema).toBeDefined();
  });

  it('should return validation schema for approving a request successfully', () => {
    const validationSchema = approveRequestValidationSchema();
    expect(validationSchema).toBeDefined();
  });

  it('should return validation schema for validating object ID successfully', () => {
    const validationSchema = objectIdValidationSchema();
    expect(validationSchema).toBeDefined();
  });

  it('should throw an error when response reason is not provided in reject request validation schema', () => {
    const validationSchema = rejectRequestValidationSchema();
    const values = { id: '123' };
    expect(() => validationSchema.validateSync(values)).toThrow();
  });

  it('should throw an error when time limit is not provided in approve request validation schema', () => {
    const validationSchema = approveRequestValidationSchema();
    const values = { id: '123', responseReason: 'reason' };
    expect(() => validationSchema.validateSync(values)).toThrow();
  });

  it('should throw an error when duration type is not provided in approve request validation schema', () => {
    const validationSchema = approveRequestValidationSchema();
    const values = { id: '123', responseReason: 'reason', timeLimit: 'TEMPORARY' };
    expect(() => validationSchema.validateSync(values)).toThrow();
  });
});
