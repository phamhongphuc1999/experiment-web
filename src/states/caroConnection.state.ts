import * as uuid from 'uuid';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type CaroConnectionStateType = {
  pc: RTCPeerConnection | undefined;
  channel: RTCDataChannel | undefined;
  yourRTC: RTCSessionDescriptionInit | undefined;
  friendRTC: RTCSessionDescriptionInit | undefined;
  events: {
    createConnectionForHost: () => Promise<void>;
    createConnectionForGuard: (friendRTC: RTCSessionDescriptionInit) => Promise<void>;
    receiveRTC: (friendRTC: RTCSessionDescriptionInit) => Promise<void>;
  };
};

export const useCaroConnectionStore = create<CaroConnectionStateType, [['zustand/immer', unknown]]>(
  immer((set) => {
    return {
      pc: undefined,
      channel: undefined,
      yourRTC: undefined,
      friendRTC: undefined,
      events: {
        createConnectionForHost: async () => {
          const pc = new RTCPeerConnection();
          const channel = pc.createDataChannel(uuid.v4());
          const yourRTC = await pc.createOffer();

          set((state) => {
            state.pc = pc;
            state.channel = channel;
            state.yourRTC = yourRTC;
          });
        },
        createConnectionForGuard: async (friendRTC: RTCSessionDescriptionInit) => {
          const pc = new RTCPeerConnection();
          await pc.setRemoteDescription(friendRTC);
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);

          set((state) => {
            state.pc = pc;
            state.yourRTC = answer;
            state.friendRTC = friendRTC;
          });
        },
        receiveRTC: async (friendRTC: RTCSessionDescriptionInit) => {
          set((state) => {
            state.friendRTC = friendRTC;
          });
        },
      },
    };
  })
);
