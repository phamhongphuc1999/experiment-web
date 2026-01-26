export type TurnType = 0 | 1;
export type RoleType = 'host' | 'guest';
export type ConnectionType = 'init' | 'connecting' | 'connected';
export type PlayModeType = 'offline' | 'online' | 'machine';
export type CaroGameType = 'normal' | 'blind';
export type CaroWinModeType = 'blockOpponent' | 'non-blockOpponent';
export type CaroSizeBoardType = 3 | 10 | 15;
export type ChatType = 'yourChat' | 'friendChat';
export type MyGameType = 'caro' | 'connect4';
export type MyAllGameType = MyGameType | 'pikachu';

export type CaroWinType = 'leftDiagonal' | 'rightDiagonal' | 'vertical' | 'horizontal';

export type WinStateType = {
  winMode: Array<CaroWinType>;
  locations: {
    [location: number]: Partial<{ [type in CaroWinType]: boolean }>;
  };
};

export type Connect4WinType = CaroWinType;

export type Connect4WinStateType = {
  winMode: Array<Connect4WinType>;
  locations: {
    [key: string]: Partial<{ [type in Connect4WinType]: boolean }>;
  };
};

export type CaroMessageType = 'chat' | 'move' | 'newGame' | 'undo' | 'sync';
