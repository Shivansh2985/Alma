import React from 'react';
import { UserPlus, UserCog, Monitor, Smartphone } from 'lucide-react';

// Helper function to get a simple device name and icon from the user agent string
const getDeviceInfo = (userAgent) => {
  const ua = userAgent.toLowerCase();
  let device = 'Desktop';
  let browser = 'Unknown Browser';
  let os = 'Unknown OS';

  // Check for device type
  if (/mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua)) {
    device = 'Mobile';
  }

  // Check for OS
  if (ua.includes('windows')) os = 'Windows';
  else if (ua.includes('mac')) os = 'macOS';
  else if (ua.includes('linux')) os = 'Linux';
  else if (ua.includes('android')) os = 'Android';
  else if (ua.includes('iphone') || ua.includes('ipad')) os = 'iOS';

  // Check for Browser
  if (ua.includes('firefox')) browser = 'Firefox';
  else if (ua.includes('chrome')) browser = 'Chrome';
  else if (ua.includes('safari')) browser = 'Safari';
  else if (ua.includes('msie') || ua.includes('trident')) browser = 'IE';

  const icon = device === 'Mobile' 
    ? <Smartphone size={16} className="text-gray-500" /> 
    : <Monitor size={16} className="text-gray-500" />;
  
  const name = `${browser} on ${os}`;

  return { icon, name };
};

export default function DataAuditTrail({ logs }) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">Data Audit Info</h2>
      <p className="mt-1 text-gray-600">A log of recent changes to the alumni data.</p>
      
      {logs.length === 0 ? (
        <p className="mt-4 text-gray-500">No changes have been made yet.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {logs.map((log, index) => {
            const { icon: deviceIcon, name: deviceName } = getDeviceInfo(log.device);
            return (
              <li key={index} className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm">
                <div className="flex-shrink-0">
                  {log.action === 'Added Alumni' ? (
                    <UserPlus className="h-6 w-6 text-green-500" />
                  ) : (
                    <UserCog className="h-6 w-6 text-blue-500" />
                  )}
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-gray-800">
                    {log.action}: <span className="font-bold">{log.name}</span>
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
                    {/* Display both the icon and the name now */}
                    <span className="flex items-center gap-1.5">
                      {deviceIcon}
                      {deviceName}
                    </span>
                    <span>{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

