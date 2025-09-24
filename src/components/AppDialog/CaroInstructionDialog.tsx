/* eslint-disable quotes */
import { CloudConnection, Data, Setting } from 'iconsax-reactjs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../shadcn-ui/dialog';
import AppTooltip from '../AppTooltip';

export default function CaroInstructionDialog() {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">
        <AppTooltip contentProps={{ side: 'bottom' }} tooltipContent="Instructions">
          <Data size={16} />
        </AppTooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Caro instruction</DialogTitle>
        </DialogHeader>
        <div className="scroll-hidden h-[75vh] overflow-auto">
          <p className="text-lg">1. How to play?</p>
          <p className="text-sm">
            {
              "Your goal is to make five pieces of the same color in a vertical, horizontal or diagonal line, without being blocked at two opponent's pieces or an opponent's piece and the edge of the board."
            }
          </p>
          <p className="mt-2 text-lg">2. Setting</p>
          <div className="text-sm">
            {'Click on the icon'} <Setting className="inline" size={14} />{' '}
            {
              'to open the config dialog. In the config dialog, you can change the play mode and the board size. When you press save button, your changes will be applied and the new game will be started.'
            }
          </div>
          <p className="mt-2 text-lg">3. Play mode</p>
          <p className="text-sm">{'This game has two modes: offline and online.'}</p>
          <p className="text-sm">
            {'You and your friend can play in one device on offline play mode.'}
          </p>
          <p className="text-sm">
            {
              'Meanwhile, in online play mode, you and your friend can connect to other peer-to-peer online ('
            }
            <CloudConnection className="inline" size={14} />
            {
              '). One of you will be the host, and the other will be the guest. The host create the connection and share the the signal (your signal) to the guest, the guest create the connection and parse host signal (friend signal) to find host device. After that, system will create guest signal, guest have to share the signal to the host to complete the connection. After the connection is established, you can start playing and chatting with each other.'
            }
          </p>
          <p className="text-chart-3 text-sm">
            {
              'Warning: because I cannot afford to maintain a server to create a completely automatic flow, the peer-to-peer, with a little inconvenience, is fit for me. You can share your signal with your friend via any chat app like messenger,...'
            }
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
