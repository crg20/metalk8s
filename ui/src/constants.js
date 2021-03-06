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
export const STATUS_RUNNING = 'Running';
export const STATUS_SUCCEEDED = 'Succeeded';

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

export const PORT_NODE_EXPORTER = '9100';

export const queryTimeSpansCodes = [
  {
    label: 'now-7d',
    value: LAST_SEVEN_DAYS,
  },
  {
    label: 'now-24h',
    value: LAST_TWENTY_FOUR_HOURS,
  },
  {
    label: 'now-1h',
    value: LAST_ONE_HOUR,
  },
];
