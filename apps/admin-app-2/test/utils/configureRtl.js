import { configure } from '@testing-library/react';

// increase timeout for pipeline environment
configure({ asyncUtilTimeout: 4000 });
