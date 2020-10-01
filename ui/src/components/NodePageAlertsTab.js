import React from 'react';
import { useSelector } from 'react-redux';
import { FormattedDate, FormattedTime } from 'react-intl';
import styled from 'styled-components';
import { Chips } from '@scality/core-ui';
import {
  fontSize,
  padding,
  fontWeight,
  grayDarkest,
} from '@scality/core-ui/dist/style/theme';
import { useTable } from 'react-table';
import { TabContainer } from './CommonLayoutStyle';

const ActiveAlertsTableContainer = styled.div`
  color: ${(props) => props.theme.brand.textPrimary};
  padding: 1rem;
  font-family: 'Lato';
  font-size: ${fontSize.base};
  border-color: ${(props) => props.theme.brand.borderLight};
  table {
    border-spacing: 0;

    tr {
      :last-child {
        td {
          border-bottom: 0;
          font-weight: normal;
        }
      }
    }

    th {
      font-weight: bold;
      height: 56px;
    }

    td {
      height: 80px;
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      height: 30px;
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
  padding-right: ${padding.right};
`;

const SelectorText = styled.span`
  padding: 0 ${padding.smaller} 0 ${padding.smaller};
`;

const NodePageAlertsTab = (props) => {
  const theme = useSelector((state) => state.config.theme);
  const alertsNumInTotal = 2;
  const criticalAlertsNum = 0;
  const warningAlertsNum = 2;
  // const { alertlist } = props;

  // const activeAlertListData = alertlist?.map((alert) => {
  //   return {
  //     name: alert.labels.alertname,
  //     severity: alert.labels.severity,
  //     alert_description: alert.annotations.message,
  //     active_since: alert.activeAt,
  //   };
  // });
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
                  } else {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  }
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
      { Header: 'Name', accessor: 'name' },
      { Header: 'Severity', accessor: 'severity' },
      { Header: 'Description', accessor: 'alert_description' },
      { Header: 'Active since', accessor: 'active_since' },
    ],
    [],
  );

  return (
    <TabContainer>
      <AlertServeritySelectorContainer>
        <TabTitleContainer>
          <TabTitle theme={theme}>Active Alerts</TabTitle>
          <AlertNumber>{alertsNumInTotal}</AlertNumber>
        </TabTitleContainer>
        <SelectorContainer>
          <Selector>
            <input
              type="checkbox"
              id="severity"
              name="severity"
              value="critical"
            ></input>
            <i className="fas fa-times-circle"></i>
            <SelectorText>Critical</SelectorText>
            <span>{criticalAlertsNum}</span>
          </Selector>
          <Selector>
            <input
              type="checkbox"
              id="severity"
              name="severity"
              value="critical"
            ></input>
            <i className="fas fa-exclamation-triangle"></i>
            <SelectorText>Warning</SelectorText>
            <span>{warningAlertsNum}</span>
          </Selector>
        </SelectorContainer>
      </AlertServeritySelectorContainer>
      <ActiveAlertsTableContainer>
        <Table columns={columns} data={[]} />
      </ActiveAlertsTableContainer>
    </TabContainer>
  );
};

export default NodePageAlertsTab;
