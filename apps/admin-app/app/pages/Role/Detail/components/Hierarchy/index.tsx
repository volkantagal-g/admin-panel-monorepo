import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Skeleton, Tree } from 'antd';
import { ReactNode, useEffect } from 'react';
import { DataNode } from 'antd/lib/tree';

import { Creators } from '../../redux/actions';
import { roleHierchySelector } from '../../redux/selectors';
import { ROUTE } from '@app/routes';

const RoleLink = ({ id, role }: { id: MongoIDType, role: DataNode }) => {
  const { _id, name } = role as unknown as RoleType;
  if (_id === id) return <span>{name}</span>;

  return (
    <Link to={ROUTE.ROLE_DETAIL.path.replace(':id', _id)}>
      {name}
    </Link>
  );
};

const Hierarchy = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const isPending = useSelector(roleHierchySelector.getIsPending);
  const hierarchy = useSelector(roleHierchySelector.getData);

  useEffect(() => {
    dispatch(Creators.getRoleHierarchyRequest({ id }));
  }, [dispatch, id]);

  const title = (role: DataNode) => <RoleLink id={id!} role={role} />;

  return (
    <Skeleton active loading={isPending}>
      <Tree
        treeData={hierarchy}
        titleRender={title}
        defaultExpandAll
        selectable={false}
      />
    </Skeleton>
  );
};

export default Hierarchy;
