import React from 'react';
import { useSelector } from 'react-redux';
import { useTable } from 'react-table';
import styled from 'styled-components';
import { fontSize, padding } from '@scality/core-ui/dist/style/theme';
import { TabContainer } from './CommonLayoutStyle';
import {
  STATUS_RUNNING,
  STATUS_PENDING,
  STATUS_FAILED,
  STATUS_UNKNOWN,
} from '../constants';
import { intl } from '../translations/IntlGlobalProvider';

const PodTableContainer = styled.div`
  color: ${(props) => props.theme.brand.textPrimary};
  padding: ${padding.large};
  font-family: 'Lato';
  font-size: ${fontSize.base};
  border-color: ${(props) => props.theme.brand.borderLight};
  .ReactTable .rt-thead {
    overflow-y: scroll;
  }
  table {
    border-spacing: 0;
    th {
      font-weight: bold;
      height: 56px;
      text-align: left;
      padding: ${padding.smaller};
    }
  }
`;

const HeadRow = styled.tr`
  width: 100%;
  /* To display scroll bar on the table */
  display: table;
  table-layout: fixed;
`;

const TableRow = styled(HeadRow)`
  height: 40px;
`;

// * table body
const Body = styled.tbody`
  /* To display scroll bar on the table */
  display: block;
  height: calc(100vh - 250px);
  overflow: auto;
  overflow-y: scroll;
`;

const Cell = styled.td`
  overflow-wrap: break-word;
  border-top: 1px solid #424242;
`;

// Color specification:
// Pod Running + All Containers are running => Green
// Pod Running + At least one container is running => Orange
// Pod Pending => Orange
// Pod Succeeded => Green
// Pod Failed => Red
// Pod Unknown => Red
const StatusText = styled.div`
  color: ${(props) => {
    const { status, numContainer, numContainerRunning } = props;
    if (status === STATUS_RUNNING && numContainer === numContainerRunning) {
      return props.theme.brand.healthy;
    } else if (status === STATUS_RUNNING || status === STATUS_PENDING) {
      return props.theme.brand.warning;
    } else if (status === STATUS_FAILED || status === STATUS_UNKNOWN) {
      return props.theme.brand.danger;
    }
  }}};
`;

const ExternalLink = styled.a`
  color: ${(props) => props.theme.brand.border};
`;

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => {
          return (
            <HeadRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                const headerStyleProps = column.getHeaderProps({
                  style: column.cellStyle,
                });
                return <th {...headerStyleProps}>{column.render('Header')}</th>;
              })}
            </HeadRow>
          );
        })}
      </thead>
      <Body {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                let cellProps = cell.getCellProps({
                  style: {
                    ...cell.column.cellStyle,
                  },
                });
                if (cell.column.Header !== 'Name' && cell.value === undefined) {
                  return (
                    <Cell {...cellProps}>
                      <div>{intl.translate('unknown')}</div>
                    </Cell>
                  );
                } else {
                  return <Cell {...cellProps}>{cell.render('Cell')}</Cell>;
                }
              })}
            </TableRow>
          );
        })}
      </Body>
    </table>
  );
}

const NodePagePodsTab = (props) => {
  const { pods } = props;
  const config = useSelector((state) => state.config);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        cellStyle: { width: '250px' },
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: (cellProps) => {
          const { status, numContainer, numContainerRunning } = cellProps.value;
          return status === STATUS_RUNNING ? (
            <StatusText
              status={status}
              numContainer={numContainer}
              numContainerRunning={numContainerRunning}
            >
              {`${status} (${numContainerRunning}/${numContainer})`}
            </StatusText>
          ) : (
            <StatusText status={status}>{status}</StatusText>
          );
        },
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Namespace',
        accessor: 'namespace',
        cellStyle: { width: '150px' },
      },
      {
        Header: 'Logs',
        accessor: 'log',
        cellStyle: { textAlign: 'center' },
        Cell: ({ value }) => {
          return (
            <ExternalLink
              href={`${config.api.url_grafana}/dashboard/db/logs?orgId=1&var-logs=Loki&var-logmetrics=Prometheus&var-metrics=Prometheus&var-podlogs=.*&var-systemlogs=.%2B&var-deployment=calico-kube-controllers&var-pod=${value}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-chart-line" />
            </ExternalLink>
          );
        },
      },
    ],
    [config],
  );
  return (
    <TabContainer>
      <PodTableContainer>
        <Table columns={columns} data={pods} />
      </PodTableContainer>
    </TabContainer>
  );
};

export default NodePagePodsTab;
