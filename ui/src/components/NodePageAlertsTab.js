import React from 'react';
import { useSelector } from 'react-redux';
import { FormattedDate, FormattedTime } from 'react-intl';
import styled from 'styled-components';
import { Chips } from '@scality/core-ui';
import { fontSize, padding } from '@scality/core-ui/dist/style/theme';
import { useTable } from 'react-table';
import AlertSeveritySelector from './AlertSeveritySelector';
import { useQuery } from '../services/utils';
import { TabContainer } from './CommonLayoutStyle';
import { STATUS_WARNING, STATUS_CRITICAL } from '../constants';

const ActiveAlertsTableContainer = styled.div`
  color: ${(props) => props.theme.brand.textPrimary};
  padding: 1rem;
  font-family: 'Lato';
  font-size: ${fontSize.base};
  border-color: ${(props) => props.theme.brand.borderLight};
  table {
    border-spacing: 0;

    th {
      font-weight: bold;
      height: 56px;
    }

    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      text-align: left;
      padding: 5px;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

const HeadRow = styled.tr`
  width: 100%;
  /* To display scroll bar on the table */
  display: table;
  table-layout: fixed;
`;

const Body = styled.tbody`
  /* To display scroll bar on the table */
  display: block;
  height: calc(100vh - 250px);
  overflow: auto;
  overflow-y: scroll;
`;

const NodePageAlertsTab = (props) => {
  const { alertsNode } = props;
  const theme = useSelector((state) => state.config.theme);
  const query = useQuery();
  // Retrieve the severity filter from URL.
  // Filter more than one severity, the URL should be:
  // `/newNodes/<node-name>/alerts?severity=warning&severity=critical`
  let alertSeverity = query.getAll('severity');

  // Display all the alerts when there is no severity filter
  if (alertSeverity?.length === 0) {
    alertSeverity.push(STATUS_WARNING, STATUS_CRITICAL);
  }

  const alertsNumInTotal = alertsNode?.length;
  const criticalAlertsNum = alertsNode?.filter(
    (alert) => alert.labels.severity === STATUS_CRITICAL,
  )?.length;
  const warningAlertsNum = alertsNode?.filter(
    (alert) => alert.labels.severity === STATUS_WARNING,
  )?.length;

  const activeAlertListData = alertsNode
    ?.map((alert) => {
      return {
        name: alert.labels.alertname,
        severity: alert.labels.severity,
        alertDescription: alert.annotations.message,
        activeSince: alert.startsAt,
      };
    })
    .filter((alert) => alertSeverity.includes(alert.severity));

  // React Table for the volume list
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
                  return (
                    <th {...headerStyleProps}>{column.render('Header')}</th>
                  );
                })}
              </HeadRow>
            );
          })}
        </thead>
        <Body {...getTableBodyProps()}>
          {activeAlertListData.length === 0 ? (
            <HeadRow
              style={{
                width: '100%',
                paddingTop: padding.base,
                height: '60px',
              }}
            >
              <td
                style={{
                  textAlign: 'center',
                  background: theme.brand.primaryDark1,
                }}
              >
                No Active Alert
              </td>
            </HeadRow>
          ) : null}
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <HeadRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  let cellProps = cell.getCellProps({
                    style: { ...cell.column.cellStyle },
                  });
                  if (cell.column.Header === 'Active since') {
                    return (
                      <td {...cellProps}>
                        <span>
                          <FormattedDate value={cell.value} />{' '}
                          <FormattedTime
                            hour="2-digit"
                            minute="2-digit"
                            second="2-digit"
                            value={cell.value}
                          />
                        </span>
                      </td>
                    );
                  } else if (cell.column.Header === 'Severity') {
                    if (cell.value === STATUS_WARNING) {
                      return (
                        <td {...cellProps}>
                          <Chips
                            text={cell.render('Cell')}
                            variant={STATUS_WARNING}
                          />
                        </td>
                      );
                    } else if (cell.value === STATUS_CRITICAL) {
                      return (
                        <td {...cellProps}>
                          <Chips
                            text={cell.render('Cell')}
                            variant={STATUS_CRITICAL}
                          />
                        </td>
                      );
                    }
                  }
                  return <td {...cellProps}>{cell.render('Cell')}</td>;
                })}
              </HeadRow>
            );
          })}
        </Body>
      </table>
    );
  }
  // columns for alert table
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        cellStyle: { width: '200px' },
      },
      {
        Header: 'Severity',
        accessor: 'severity',
        cellStyle: { textAlign: 'center', width: '100px' },
      },
      { Header: 'Description', accessor: 'alertDescription' },
      {
        Header: 'Active since',
        accessor: 'activeSince',
        cellStyle: { textAlign: 'center', width: '150px' },
      },
    ],
    [],
  );

  return (
    <TabContainer>
      <AlertSeveritySelector
        theme={theme}
        alertSeverity={alertSeverity}
        alertsNumInTotal={alertsNumInTotal}
        criticalAlertsNum={criticalAlertsNum}
        warningAlertsNum={warningAlertsNum}
      ></AlertSeveritySelector>
      <ActiveAlertsTableContainer>
        <Table columns={columns} data={activeAlertListData} />
      </ActiveAlertsTableContainer>
    </TabContainer>
  );
};

export default NodePageAlertsTab;
