export const REFRESH_TIMEOUT = 15000;
export const REFRESH_METRCIS_GRAPH = 60000;
export const FR_LANG = 'FR';
export const EN_LANG = 'EN';
export const LANGUAGE = 'language';

export const STATUS_WARNING = 'warning';
export const STATUS_CRITICAL = 'critical';
export const STATUS_SUCCESS = 'success';
export const STATUS_NONE = 'none';
export const STATUS_HEALTH = 'health';

export const API_STATUS_READY = 'ready';
export const API_STATUS_NOT_READY = 'not_ready';
export const API_STATUS_UNKNOWN = 'unknown';

export const STATUS_BOUND = 'Bound';
export const STATUS_PENDING = 'Pending';
export const STATUS_TERMINATING = 'Terminating';
export const STATUS_FAILED = 'Failed';
export const STATUS_AVAILABLE = 'Available';
export const STATUS_RELEASED = 'Released';
export const STATUS_UNKNOWN = 'Unknown';
export const STATUS_READY = 'Ready';

export const SPARSE_LOOP_DEVICE = 'sparseLoopDevice';
export const RAW_BLOCK_DEVICE = 'rawBlockDevice';

export const VOLUME_CONDITION_EXCLAMATION = 'exclamation';
export const VOLUME_CONDITION_UNLINK = 'unlink';
export const VOLUME_CONDITION_LINK = 'link';

// metrics chart
export const LAST_SEVEN_DAYS = 'Last 7 days';
export const LAST_TWENTY_FOUR_HOURS = 'Last 24 hours';
export const LAST_ONE_HOUR = 'Last 1 hour';

export const SAMPLE_DURATION_LAST_SEVEN_DAYS = 7 * 24 * 60 * 60;
export const SAMPLE_DURATION_LAST_TWENTY_FOUR_HOURS = 24 * 60 * 60;
export const SAMPLE_DURATION_LAST_ONE_HOUR = 60 * 60;

export const SAMPLE_FREQUENCY_LAST_SEVEN_DAYS = 60 * 60;
export const SAMPLE_FREQUENCY_LAST_TWENTY_FOUR_HOURS = 720;
export const SAMPLE_FREQUENCY_LAST_ONE_HOUR = 30;

export const PORT_NUMBER_PROMETHEUS = '9100';

// alert
const NODE_FILESYSTEM_SPACE_FILLINGUP = 'NodeFilesystemSpaceFillingUp';
const NODE_FILESYSTEM_ALMOST_OUTOF_SPACE = 'NodeFilesystemAlmostOutOfSpace';
const NODE_FILESYSTEM_FILES_FILLINGUP = 'NodeFilesystemFilesFillingUp';
const NODE_FILESYSTEM_ALMOST_OUTOF_FILES = 'NodeFilesystemAlmostOutOfFiles';
const NODE_NETWORK_RECEIVE_ERRS = 'NodeNetworkReceiveErrs';
const NODE_NETWORK_TRANSMIT_ERRS = 'NodeNetworkTransmitErrs';
const NODE_HIGHNUMBER_CONNTRACKENTRIES_USED =
  'NodeHighNumberConntrackEntriesUsed';
const NODE_CLOCK_SKEW_DETECTED = 'NodeClockSkewDetected';
const NODE_CLOCK_NOT_SYNCHRONISING = 'NodeClockNotSynchronising';
const NODE_NETWORK_INTERFACE_FLAPPING = 'NodeNetworkInterfaceFlapping';
const KUBE_NODE_NOT_READY = 'KubeNodeNotReady';
const KUBE_NODE_UNREACHABLE = 'KubeNodeUnreachable';
const KUBELET_TOOMANY_PODS = 'KubeletTooManyPods';
const KUBE_NODE_READINESS_FLAPPING = 'KubeNodeReadinessFlapping';
const KUBELET_PLEG_DURATION_HIGH = 'KubeletPlegDurationHigh';
const KUBELET_POD_STARTUP_LATENCY_HIGH = 'KubeletPodStartUpLatencyHigh';

export const NODE_ALERTS_GROUP = [
  NODE_FILESYSTEM_SPACE_FILLINGUP,
  NODE_FILESYSTEM_ALMOST_OUTOF_SPACE,
  NODE_FILESYSTEM_FILES_FILLINGUP,
  NODE_FILESYSTEM_ALMOST_OUTOF_FILES,
  NODE_NETWORK_RECEIVE_ERRS,
  NODE_NETWORK_TRANSMIT_ERRS,
  NODE_HIGHNUMBER_CONNTRACKENTRIES_USED,
  NODE_CLOCK_SKEW_DETECTED,
  NODE_CLOCK_NOT_SYNCHRONISING,
  NODE_NETWORK_INTERFACE_FLAPPING,
  KUBE_NODE_NOT_READY,
  KUBE_NODE_UNREACHABLE,
  KUBELET_TOOMANY_PODS,
  KUBE_NODE_READINESS_FLAPPING,
  KUBELET_PLEG_DURATION_HIGH,
  KUBELET_POD_STARTUP_LATENCY_HIGH,
];
