import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FormattedDate, FormattedTime } from 'react-intl';
import styled from 'styled-components';
import { Chips, Checkbox } from '@scality/core-ui';
import {
  fontSize,
  padding,
  fontWeight,
  grayDarkest,
} from '@scality/core-ui/dist/style/theme';
import { useTable } from 'react-table';
import { STATUS_WARNING, STATUS_CRITICAL } from '../constants';
import { TabContainer } from './CommonLayoutStyle';

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
const AlertServeritySelectorContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${padding.large} 0 0 ${padding.larger};
  justify-content: space-between;
`;

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 390px;
  .fa-times-circle {
    color: red;
  }
  .fa-exclamation-triangle {
    color: yellow;
  }
`;

const TabTitleContainer = styled.div`
  display: flex;
`;

const TabTitle = styled.span`
  font-weight: ${fontWeight.bold};
  color: ${(props) => props.theme.brand.textSecondary};
`;

const AlertNumber = styled.div`
  width: 24px;
  font-weight: ${fontWeight.bold};
  background-color: ${grayDarkest};
  border-radius: 3px;
  padding-left: ${padding.smaller};
`;

const Selector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 140px;
  padding-right: ${padding.right};
`;

const NodePageAlertsTab = (props) => {
  const { alertsNode } = props;
  const theme = useSelector((state) => state.config.theme);
  const alertsNumInTotal = alertsNode.length;
  const criticalAlertsNum = 0;
  const warningAlertsNum = 2;
  const [isCriticalSelected, setIsCriticalSelected] = useState(false);
  const [isWarningSelected, setIsWarningSelected] = useState(false);
  const activeAlertListData = alertsNode?.map((alert) => {
    return {
      name: alert.labels.alertname,
      severity: alert.labels.severity,
      alert_description: alert.annotations.message,
      active_since: alert.startsAt,
    };
  });

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
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.Header === 'Active since') {
                    return (
                      <td {...cell.getCellProps()}>
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
                    if (cell.value === 'warning') {
                      return (
                        <td {...cell.getCellProps()}>
                          <Chips text={cell.render('Cell')} variant="warning" />
                        </td>
                      );
                    } else if (cell.value === 'critical') {
                      return (
                        <td {...cell.getCellProps()}>
                          <Chips
                            text={cell.render('Cell')}
                            variant="critical"
                          />
                        </td>
                      );
                    }
                  }
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  // columns for alert table
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        cellStyle: { width: '70px' },
      },
      {
        Header: 'Severity',
        accessor: 'severity',
        cellStyle: { textAlign: 'center', width: '70px' },
      },
      { Header: 'Description', accessor: 'alert_description' },
      { Header: 'Active since', accessor: 'active_since' },
    ],
    [],
  );

  const onClickSelector = (severity) => {
    if (severity === STATUS_CRITICAL) {
      setIsCriticalSelected(!isCriticalSelected);
    } else if (severity === STATUS_WARNING) {
      setIsWarningSelected(!isWarningSelected);
    }
  };

  return (
    <TabContainer>
      <AlertServeritySelectorContainer>
        <TabTitleContainer>
          <TabTitle theme={theme}>Active Alerts</TabTitle>
          <AlertNumber>{alertsNumInTotal}</AlertNumber>
        </TabTitleContainer>
        <SelectorContainer>
          <Selector>
            <Checkbox
              checked={isCriticalSelected}
              label="Critical"
              onChange={() => onClickSelector(STATUS_CRITICAL)}
            />
            <div>
              <i className="fas fa-times-circle"></i>
            </div>
            <div>{criticalAlertsNum}</div>
          </Selector>
          <Selector>
            <Checkbox
              checked={isWarningSelected}
              label="Warning"
              onChange={() => onClickSelector(STATUS_WARNING)}
            />
            <div>
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <div>{warningAlertsNum}</div>
          </Selector>
        </SelectorContainer>
      </AlertServeritySelectorContainer>
      <ActiveAlertsTableContainer>
        <Table columns={columns} data={activeAlertListData} />
      </ActiveAlertsTableContainer>
    </TabContainer>
  );
};

export default NodePageAlertsTab;
