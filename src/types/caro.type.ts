export type TTurnType = 0 | 1;
export type TRoleType = 'host' | 'guest';
export type TConnectionType = 'init' | 'connecting' | 'connected';
export type TPlayModeType = 'offline' | 'online' | 'machine';
export type TCaroGameType = 'normal' | 'blind';
export type TCaroWinModeType = 'blockOpponent' | 'non-blockOpponent';
export type TCaroSizeBoardType = 3 | 10 | 15;
export type TChatType = 'yourChat' | 'friendChat';
export type TMyGameType = 'caro' | 'connect4';
export type TMyAllGameType = TMyGameType | 'pikachu';

export type TCaroWinType = 'leftDiagonal' | 'rightDiagonal' | 'vertical' | 'horizontal';

export type TWinStateType = {
  winMode: Array<TCaroWinType>;
  locations: {
    [location: number]: Partial<{ [type in TCaroWinType]: boolean }>;
  };
};

export type TConnect4WinType = TCaroWinType;

export type TConnect4WinStateType = {
  winMode: Array<TConnect4WinType>;
  locations: {
    [key: string]: Partial<{ [type in TConnect4WinType]: boolean }>;
  };
};

export type TCaroMessageType = 'chat' | 'move' | 'newGame' | 'undo' | 'sync';
