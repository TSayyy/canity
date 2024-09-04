import {
  ADD_ALL_PEERS,
  ADD_PEER,
  ADD_PEER_NAME,
  ADD_PEER_STREAM,
  CHANGE_CAMERA_STATE,
  CHANGE_MIC_STATE,
  REMOVE_PEER,
} from "./peersActions";

export type PeerUser = {
  stream?: MediaStream;
  userId: string;
  userName?: string;
  peerId?: string;
  isCameraEnabled?: boolean;
  isMicEnabled?: boolean;
};
export type PeerState = {
  [userId: string]: PeerUser;
};

type PeerAction =
  | {
      type: typeof ADD_PEER;
      payload: { userId: string; userName: string; peerId: string; isCameraEnabled?: boolean; isMicEnabled?: boolean };
    }
  | {
      type: typeof REMOVE_PEER;
      payload: { userId: string };
    }
  | {
      type: typeof ADD_ALL_PEERS;
      payload: { peers: PeerState };
    }
  | {
      type: typeof ADD_PEER_STREAM;
      payload: { userId: string; stream: MediaStream };
    }
  | {
      type: typeof ADD_PEER_NAME;
      payload: { userId: string; userName: string };
    }
  | {
      type: typeof CHANGE_CAMERA_STATE;
      payload: { userId: string; isCameraEnabled: boolean };
    }
  | {
      type: typeof CHANGE_MIC_STATE;
      payload: { userId: string; isMicEnabled: boolean };
    };

export function peersReducer(state: PeerState, action: PeerAction) {
  switch (action.type) {
    case ADD_PEER: {
      const { userId, userName, peerId, isCameraEnabled, isMicEnabled } = action.payload;
      return {
        ...state,
        [userId]: { userId, userName, peerId, isCameraEnabled, isMicEnabled },
      };
    }
    case REMOVE_PEER: {
      const { userId } = action.payload;
      const newState = { ...state };
      delete newState[userId];
      return newState;
    }
    case ADD_ALL_PEERS: {
      const { peers } = action.payload;
      return peers;
    }
    case ADD_PEER_STREAM: {
      const { userId, stream } = action.payload;
      return {
        ...state,
        [userId]: { ...state[userId], stream },
      };
    }
    case ADD_PEER_NAME: {
      const { userId, userName } = action.payload;
      return {
        ...state,
        [userId]: { ...state[userId], userName },
      };
    }
    case CHANGE_CAMERA_STATE: {
      const { userId, isCameraEnabled } = action.payload;
      return {
        ...state,
        [userId]: { ...state[userId], isCameraEnabled },
      };
    }
    case CHANGE_MIC_STATE: {
      const { userId, isMicEnabled } = action.payload;
      return {
        ...state,
        [userId]: { ...state[userId], isMicEnabled },
      };
    }
  }
}
