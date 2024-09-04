import {
  ADD_ALL_SCREEN_PEERS,
  ADD_SCREEN_PEER,
  ADD_SCREEN_PEER_NAME,
  ADD_SCREEN_PEER_STREAM,
  REMOVE_SCREEN_PEER,
} from "./screenPeerActions";

export type ScreenPeerState = {
  [userId: string]: {
    stream?: MediaStream;
    userId: string;
    userName?: string;
    screenId: string;
  };
};

type PeerAction =
  | {
      type: typeof ADD_SCREEN_PEER;
      payload: { userId: string; stream: MediaStream; screenId: string };
    }
  | {
      type: typeof REMOVE_SCREEN_PEER;
      payload: { userId: string };
    }
  | {
      type: typeof ADD_ALL_SCREEN_PEERS;
      payload: { peers: ScreenPeerState };
    }
  | {
      type: typeof ADD_SCREEN_PEER_STREAM;
      payload: { userId: string; stream: MediaStream };
    }
  | {
      type: typeof ADD_SCREEN_PEER_NAME;
      payload: { userId: string; userName: string };
    };

export function screenPeersReducer(state: ScreenPeerState, action: PeerAction) {
  switch (action.type) {
    case ADD_SCREEN_PEER: {
      const { userId, stream, screenId } = action.payload;
      return {
        ...state,
        [userId]: { userId, stream, screenId },
      };
    }
    case REMOVE_SCREEN_PEER: {
      const { userId } = action.payload;
      const newState = { ...state };
      delete newState[userId];
      return newState;
    }
    case ADD_ALL_SCREEN_PEERS: {
      const { peers } = action.payload;
      return peers;
    }
    case ADD_SCREEN_PEER_STREAM: {
      const { userId, stream } = action.payload;
      return {
        ...state,
        [userId]: { ...state[userId], stream },
      };
    }
    case ADD_SCREEN_PEER_NAME: {
      const { userId, userName } = action.payload;
      return {
        ...state,
        [userId]: { ...state[userId], userName },
      };
    }
  }
}
