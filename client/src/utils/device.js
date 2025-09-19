
export function getDeviceId() {
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
        deviceId = crypto.randomUUID(); // built-in UUID generator
        localStorage.setItem("deviceId", deviceId);
    }
    return deviceId;
}

export function getDeviceInfo() {
    return {
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
    };
}