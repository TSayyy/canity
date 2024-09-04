import { ScreenPeerState } from "./screenPeerReducer";

export const ADD_SCREEN_PEER = "ADD_SCREEN_PEER" as const;
export const REMOVE_SCREEN_PEER = "REMOVE_SCREEN_PEER" as const;
export const ADD_ALL_SCREEN_PEERS = "ADD_ALL_SCREEN_PEERS" as const;
export const ADD_SCREEN_PEER_STREAM = "ADD_SCREEN_PEER_STREAM" as const;
export const ADD_SCREEN_PEER_NAME = "ADD_SCREEN_PEER_NAME" as const;

export function addScreenPeer(userId: string, screenId: string, stream: MediaStream) {
  return {
    type: ADD_SCREEN_PEER,
    payload: {
      userId,
      screenId,
      stream,
    },
  };
}

export function removeScreenPeer(userId: string) {
  return {
    type: REMOVE_SCREEN_PEER,
    payload: {
      userId,
    },
  };
}

export function addAllScreenPeers(peers: ScreenPeerState) {
  return {
    type: ADD_ALL_SCREEN_PEERS,
    payload: {
      peers,
    },
  };
}

export function addScreenPeerStream(userId: string, stream: MediaStream) {
  return {
    type: ADD_SCREEN_PEER_STREAM,
    payload: {
      userId,
      stream,
    },
  };
}

export function addScreenPeerName(userId: string, userName: string) {
  return {
    type: ADD_SCREEN_PEER_NAME,
    payload: {
      userId,
      userName,
    },
  };
}
