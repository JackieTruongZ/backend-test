export interface Session {
    sessionId: string;
    userId: string;
    startTime: string; // ISO string representing the start time of the login session
    expirationTime: string; // ISO string representing the expiration time of the login session (e.g., 1 hour after session creation)
    ipAddress: string; // IP address of the user
    userAgent: string; // User agent information of the user's browser
    deviceInfo: any; // Information about the user's device
}

export interface SessionWithId {
    _id: string;
    sessionId: string;
    userId: string;
    startTime: string; // ISO string representing the start time of the login session
    expirationTime: string; // ISO string representing the expiration time of the login session (e.g., 1 hour after session creation)
    ipAddress: string; // IP address of the user
    userAgent: string; // User agent information of the user's browser
    deviceInfo: any; // Information about the user's device
}

// export interface SessionData {
//     [key: string]: any;
// }

// export interface Session {
//     sid: string;
//     data: SessionData;
// }

// export interface SessionWithId {
//     _id: string;
//     sid: string;
//     data: SessionData;
// }
