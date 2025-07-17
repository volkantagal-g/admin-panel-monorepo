import { Card, Row, Col } from 'antd';
import Highcharts from 'highcharts';
import HighchartsTreeMap from 'highcharts/modules/treemap';
import HighchartsTreeGraph from 'highcharts/modules/treegraph';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getRolesSelector } from '@shared/redux/selectors/common';
import { Creators } from '@shared/redux/actions/common';
import { createMap } from '@shared/utils/common';
import SelectRole from '@shared/containers/Select/Role';

HighchartsTreeMap(Highcharts);
HighchartsTreeGraph(Highcharts);
HighchartsExporting(Highcharts);

const CHART_TITLE_HEIGHT = 50;
const CHART_HEIGHT_PER_NODE = 40;

type SelectedRole = {
  key: string;
  value: string;
  label: string;
};

type SeriesDataEntry = {
  id: string;
  name: string;
  parent?: string;
  level: number;
};

type Role = {
  _id: string;
  name: string;
  parent?: string;
}

type RoleWithChildren = Role & {
  children: RoleWithChildren[];
}

const Charts = () => {
  const { t } = useTranslation('rolePage');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Creators.getRolesRequest());
  }, [dispatch]);

  const roles = useSelector(getRolesSelector.getData) as RoleType[];
  const rolesPending = useSelector(getRolesSelector.getIsPending);

  const [selectedRoles, setSelectedRoles] = useState<SelectedRole[]>([]);
  const [excludedRoles, setExcludedRoles] = useState<MongoIDType[]>([]);

  const chartRef = useRef<HighchartsReact.RefObject>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    if (rolesPending) {
      chartRef.current.chart.showLoading();
    }
    else {
      chartRef.current.chart.hideLoading();
    }
  }, [chartRef, rolesPending]);

  const [chartOptions, totalNodesRequired] = useMemo(() => {
    if (rolesPending) return [[], 0];

    const roleMap = createMap(roles.map((r: Role) => ({ ...r, children: [] }))) as Record<string, RoleWithChildren>;
    Object.values(roleMap).forEach(role => {
      if (role.parent) roleMap[role.parent]?.children.push(role);
    });

    const data: SeriesDataEntry[] = [];

    const shownRoles = new Set();

    let nodesPerLevelMap: number[] = [];
    const addRole = (role: RoleWithChildren, level : number) => {
      if (shownRoles.has(role._id.toString())) return;
      shownRoles.add(role._id.toString());

      if (nodesPerLevelMap.length < level) nodesPerLevelMap.push(1);
      else nodesPerLevelMap[level - 1] += 1;

      data.push({
        id: role._id,
        name: role.name,
        ...((role.parent && level > 1) ? { parent: role.parent } : {}),
        level,
        ...((role.children.length) ? {} : { marker: { radius: 0 } }),
      });

      role.children.forEach((childRole: RoleWithChildren) => addRole(childRole, level + 1));
    };

    let totalNodeSpaceRequired = 0;
    if (selectedRoles.length) {
      selectedRoles.forEach(r => {
        nodesPerLevelMap = [];
        addRole(roleMap[r.key], 1);
        totalNodeSpaceRequired += Math.max(...nodesPerLevelMap);
      });
    }
    else {
      Object.values(roleMap).forEach(parentRole => {
        if (!parentRole.children.length) return;
        if (parentRole.parent) return;

        nodesPerLevelMap = [];
        addRole(parentRole, 1);
        totalNodeSpaceRequired += Math.max(...nodesPerLevelMap);
      });

      const excluded = roles.filter(r => roleMap[r._id].children.length === 0).map(r => r._id.toString());
      setExcludedRoles(excluded);
    }

    const options = {
      accessibility: false,
      chart: {
        type: 'treegraph',
        spacingTop: 0,
        spacingBottom: 0,
      },
      title: { text: t('ROLE_HIERARCHY') },
      credits: { enabled: false },
      series: [{
        clip: false,
        marker: {
          symbol: 'circle',
          radius: 5,
          fillColor: '#ffffff',
          lineColor: '#5d3ebc',
          lineWidth: 3,
        },
        dataLabels: {
          align: 'left',
          pointFormat: '{point.name}',
          style: {
            color: '#000000',
            textOutline: '3px #ffffff',
            whiteSpace: 'nowrap',
          },
          x: 15,
          verticalAlign: 'middle',
          crop: false,
        },
        collapseButton: { enabled: false },
        data,
      }],
      tooltip: { enabled: false },
    };

    return [options, totalNodeSpaceRequired];
  }, [roles, rolesPending, selectedRoles, t]);

  return (
    <Card>
      <Row className="mb-5">
        <Col span={24}>
          <SelectRole
            disabled={rolesPending}
            value={selectedRoles}
            mode="multiple"
            onChange={setSelectedRoles}
            excludedRoles={excludedRoles}
            labelInValue
          />
        </Col>
      </Row>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
        ref={chartRef}
        immutable
        containerProps={{
          style: { height: CHART_HEIGHT_PER_NODE * totalNodesRequired + CHART_TITLE_HEIGHT },
          'data-testid': 'role-hierarchy-chart',
        }}
      />
    </Card>
  );
};

export default Charts;
