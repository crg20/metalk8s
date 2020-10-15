import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedDate, FormattedTime } from 'react-intl';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  padding,
  fontSize,
  fontWeight,
} from '@scality/core-ui/dist/style/theme';
import { Button, Steppers, Loader } from '@scality/core-ui';
import isEmpty from 'lodash.isempty';
import { deployNodeAction } from '../ducks/app/nodes';
import { TabContainer } from './CommonLayoutStyle';
import { API_STATUS_UNKNOWN } from '../constants.js';
import { intl } from '../translations/IntlGlobalProvider';

const InformationSpan = styled.div`
  padding-bottom: ${padding.base};
  padding-left: ${padding.large};
  display: flex;
`;

const InformationLabel = styled.span`
  display: inline-block;
  min-width: 150px;
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.base};
  color: ${(props) => props.theme.brand.textSecondary};
`;

const InformationValue = styled.span`
  color: ${(props) => props.theme.brand.textPrimary};
  font-size: ${fontSize.base};
`;

const NodeNameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${padding.base} 0 ${padding.larger} ${padding.base};
`;

const NodeName = styled.div`
  display: flex;
  align-items: center;
  font-size: ${fontSize.larger};
`;

// TODO: The color of the circle should depend on the Health
const NodeStatusCircle = styled.div`
  color: ${(props) => {
    return props.color;
  }};
  padding-right: ${padding.small};
`;

const StatusText = styled.span`
  color: ${(props) => {
    return props.textColor;
  }};
`;

const DeployButton = styled(Button)`
  margin-right: ${padding.base};
`;

const NodeInformationWrapper = styled.div``;

const NodeDeploymentWrapper = styled.div`
  padding: ${padding.smaller} 0 0 ${padding.small};

  margin: ${padding.base} ${padding.base} 0 ${padding.base};
  background-color: ${(props) => props.theme.brand.primaryDark1};
`;

const NodeDeploymentTitle = styled.div`
  color: ${(props) => props.theme.brand.textPrimary};
  font-weight: ${fontWeight.bold};
  font-size: ${fontSize.base};
`;

const NodeDeploymentStatus = styled.div`
  padding: ${padding.base};
  font-size: ${fontSize.base};
`;

const InfoMessage = styled.div`
  color: ${(props) => props.theme.brand.textPrimary};
  font-size: ${fontSize.base};
  padding: ${padding.base};
`;

const NodeDeploymentContent = styled.div`
  display: flex;
`;

const ErrorLabel = styled.span`
  color: ${(props) => props.theme.brand.danger};
`;

const NodePageOverviewTab = (props) => {
  const { nodeTableData, nodes, volumes, pods } = props;
  // Retrieve the node name from URL parameter
  const { name } = useParams();
  const dispatch = useDispatch();

  const jobs = useSelector((state) =>
    state.app.salt.jobs.filter(
      (job) => job.type === 'deploy-node' && job.node === name,
    ),
  );

  let activeJob = jobs.find((job) => !job.completed);
  if (activeJob === undefined) {
    // Pick most recent one
    const sortedJobs = jobs.sort(
      (jobA, jobB) => Date(jobA.completedAt) >= Date(jobB.completedAt),
    );
    activeJob = sortedJobs[0];
  }

  let steps = [{ title: intl.translate('node_registered') }];
  let success = false;
  if (activeJob) {
    if (activeJob.events.find((event) => event.tag.includes('/new'))) {
      steps.push({ title: intl.translate('deployment_started') });
    }

    if (activeJob.completed) {
      const status = activeJob.status;
      steps.push({
        title: intl.translate('completed'),
        content: (
          <span>
            {!status.success && (
              <ErrorLabel>
                {`${intl.translate('error')}: ${status.step} - ${
                  status.comment
                }`}
              </ErrorLabel>
            )}
          </span>
        ),
      });
      success = status.success;
    } else {
      steps.push({
        title: intl.translate('deploying'),
        content: <Loader size="larger" />,
      });
    }
  }

  // TODO: Remove this workaround and actually handle showing a failed step
  //       in the Steppers component
  const activeStep = success ? steps.length : steps.length - 1;

  // The node object used by Node List Table
  const currentNode = nodeTableData?.find((node) => node.name.name === name);
  const currentNodeReturnByK8S = nodes?.find((node) => node.name === name);

  const creationTimestamp = currentNodeReturnByK8S
    ? new Date(currentNodeReturnByK8S.creationTimestamp)
    : '';

  const volumesAttachedCurrentNode = volumes.filter(
    (volume) => volume.spec.nodeName === name,
  );

  const podsScheduledOnCurrentNode = pods.filter(
    (pod) => pod.nodeName === name,
  );

  return (
    <TabContainer>
      <NodeNameContainer>
        <NodeName>
          <NodeStatusCircle>
            <i className="fas fa-circle fa-2x"></i>
          </NodeStatusCircle>
          <div>{name}</div>
        </NodeName>
        {currentNodeReturnByK8S?.status === API_STATUS_UNKNOWN ? (
          !currentNodeReturnByK8S?.deploying ? (
            <DeployButton
              text={intl.translate('deploy')}
              variant="secondary"
              onClick={() => {
                dispatch(deployNodeAction({ name }));
              }}
            />
          ) : (
            <DeployButton
              text={intl.translate('deploying')}
              disabled
              icon={<Loader size="smaller" />}
            />
          )
        ) : null}
      </NodeNameContainer>

      <NodeInformationWrapper>
        <InformationSpan>
          <InformationLabel>Control Plane IP</InformationLabel>
          <InformationValue>
            {currentNode?.name?.controlPlaneIP ?? intl.translate('unknown')}
          </InformationValue>
        </InformationSpan>
        <InformationSpan>
          <InformationLabel>Workload Plane IP</InformationLabel>
          <InformationValue>
            {currentNode?.name?.workloadPlaneIP ?? intl.translate('unknown')}
          </InformationValue>
        </InformationSpan>
        <InformationSpan>
          <InformationLabel>Roles</InformationLabel>
          <InformationValue>{currentNode?.roles}</InformationValue>
        </InformationSpan>
        <InformationSpan>
          <InformationLabel>Status</InformationLabel>
          <InformationValue>
            {currentNode?.status?.computedStatus?.map((cond) => {
              return (
                <StatusText
                  key={cond}
                  textColor={currentNode?.status?.statusColor}
                >
                  {intl.translate(`${cond}`)}
                </StatusText>
              );
            })}
          </InformationValue>
        </InformationSpan>
        <InformationSpan>
          <InformationLabel>{intl.translate('creationTime')}</InformationLabel>
          {creationTimestamp ? (
            <InformationValue>
              <FormattedDate
                value={creationTimestamp}
                year="numeric"
                month="short"
                day="2-digit"
              />{' '}
              <FormattedTime
                hour="2-digit"
                minute="2-digit"
                second="2-digit"
                value={creationTimestamp}
              />
            </InformationValue>
          ) : (
            ''
          )}
        </InformationSpan>
        <InformationSpan>
          <InformationLabel>K8s Version</InformationLabel>
          <InformationValue>
            {currentNodeReturnByK8S?.kubeletVersion ??
              intl.translate('unknown')}
          </InformationValue>
        </InformationSpan>
        <InformationSpan>
          <InformationLabel>Volumes</InformationLabel>
          <InformationValue>
            {volumesAttachedCurrentNode?.length ?? intl.translate('unknown')}
          </InformationValue>
        </InformationSpan>
        <InformationSpan>
          <InformationLabel>Pods</InformationLabel>
          <InformationValue>
            {podsScheduledOnCurrentNode?.length ?? intl.translate('unknown')}
          </InformationValue>
        </InformationSpan>
      </NodeInformationWrapper>
      {currentNodeReturnByK8S?.status === API_STATUS_UNKNOWN ? (
        <NodeDeploymentWrapper>
          <NodeDeploymentTitle>
            {intl.translate('node_deployment')}
          </NodeDeploymentTitle>
          {activeJob === undefined ? (
            <InfoMessage>
              {intl.translate('no_deployment_found', { name: name })}
            </InfoMessage>
          ) : activeJob.completed && isEmpty(activeJob.status) ? (
            <InfoMessage>{intl.translate('refreshing_job')}</InfoMessage>
          ) : (
            <NodeDeploymentContent>
              <NodeDeploymentStatus>
                <Steppers steps={steps} activeStep={activeStep} />
              </NodeDeploymentStatus>
            </NodeDeploymentContent>
          )}
        </NodeDeploymentWrapper>
      ) : null}
    </TabContainer>
  );
};

export default NodePageOverviewTab;
