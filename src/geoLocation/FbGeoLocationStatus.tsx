import { useContext } from 'react';
import { Icon, Popup, SemanticCOLORS, SemanticICONS } from 'semantic-ui-react';
import { formatDistanceToNow } from 'date-fns';
import { usePermissions, PERM_NAME_GEOLOCATION } from '../hooks/usePermissions';
import { FbGeoLocationContext } from './FbGeoLocationContext';
import { FbI18nContext } from '../contexts';

const factor = 1000000;
const formatFloat = f => Math.round(f * factor) / factor;

export function FbGeoLocationStatus() {
  const { location } = useContext(FbGeoLocationContext);
  const { i18n } = useContext(FbI18nContext);
  const { coords, timestamp } = location  ?? {};
  
  const { prompt, granted, denied, error } = usePermissions(PERM_NAME_GEOLOCATION);
  const name: SemanticICONS = 'map marker alternate';
  let message = 'unknown', color: SemanticCOLORS = 'grey', accuracyInfo, latInfo, lonInfo, locTime;

  if (prompt) {
    message = i18n._('geo_status_prompt');
    color = 'yellow';
  }
  if (granted) {
    message = i18n._('geo_status_granted');
    color = 'green';
  }
  if (denied) {
    message = i18n._('geo_status_denied');
    color = 'red';
  }
  if (error) {
    message += i18n._('geo_status_error') + ' ' + error;
  }

  if (coords) {
    const { latitude, longitude, accuracy } = coords;
    const ts = formatDistanceToNow(new Date(timestamp));
    latInfo = `latitude: ${formatFloat(latitude)}`;
    lonInfo = `longitude: ${formatFloat(longitude)}`;
    locTime = `time: ${ts} ago`;
    accuracyInfo = `accuracy: within ${accuracy}m`;
  }

  const iconProps = { name, color };
  const icon = (<Icon {...iconProps} ariaLabel={message} />);
  return (
    <Popup on={['hover', 'click']} trigger={icon}>
      <p>{message}</p>
      {coords && <p>{latInfo}<br />{lonInfo}<br />{locTime}<br />{accuracyInfo}<br /></p>}
    </Popup>
  );
}
