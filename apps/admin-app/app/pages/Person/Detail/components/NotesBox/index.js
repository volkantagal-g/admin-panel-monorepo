import { useState } from 'react';
import { Row, Col } from 'antd';

import Notes from '@shared/shared/Notes';
import { usePermission } from '@shared/hooks';
import { DEFAULT_PERSON_NOTE_TYPE, DEFAULT_ROW_SPACING, ANT_SPACING_24 } from '../../constants';

const NotesBox = ({ getNotes, createNote, updateNote, personId, versionProblem, isPending, notes, editPermKey }) => {
  const { canAccess } = usePermission();

  const [filters] = useState({ to: personId, toType: DEFAULT_PERSON_NOTE_TYPE });

  const hasAccess = canAccess(editPermKey);

  return (
    <Row className="mb-2" gutter={DEFAULT_ROW_SPACING}>
      <Col span={ANT_SPACING_24}>
        <Notes
          getNotes={getNotes}
          createNote={!versionProblem && hasAccess && createNote}
          updateNote={!versionProblem && hasAccess && updateNote}
          filters={filters}
          notes={notes}
          isPending={isPending}
        />
      </Col>
    </Row>
  );
};

export default NotesBox;
