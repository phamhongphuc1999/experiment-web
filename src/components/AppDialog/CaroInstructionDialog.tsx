/* eslint-disable quotes */
import { Airdrop, Information, Setting } from 'iconsax-reactjs';
import AppTooltip from '../AppTooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../shadcn-ui/dialog';

export default function CaroInstructionDialog() {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">
        <AppTooltip contentProps={{ side: 'bottom' }} tooltipContent="Instructions">
          <Information size={16} />
        </AppTooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Caro instruction</DialogTitle>
        </DialogHeader>
        <div className="scroll-hidden h-[75vh] overflow-auto">
          <p className="text-lg">1. How to play?</p>
          <p className="text-justify text-sm">
            {
              "Your goal is to make five pieces of the same color in a vertical, horizontal or diagonal line, without being blocked at two opponent's pieces."
            }
          </p>
          <p className="text-justify text-sm">
            {
              'The player1 will take the first move. After the first game is over, the winner will take the first move.'
            }
          </p>
          <p className="mt-2 text-lg">2. Setting</p>
          <div className="text-justify text-sm">
            {'Click on the icon'} <Setting className="inline" size={14} />{' '}
            {
              'to open the config dialog. In the config dialog, you can change the play mode and the board size. When you press save button, your changes will be applied and the new game will be started.'
            }
          </div>
          <p className="mt-2 text-lg">3. Play mode</p>
          <p className="text-justify text-sm">{'This game has two modes: offline and online.'}</p>
          <p className="text-justify text-sm">
            {'You and your friend can play in one device on offline play mode.'}
          </p>
          <p className="text-justify text-sm">
            {
              'Meanwhile, in online play mode, you and your friend can connect to other peer-to-peer online ('
            }
            <Airdrop className="inline" size={14} />
            {
              '). One of you will be the host, and the other will be the guest. The host create the connection and share the signal (your signal) to the guest, the guest create the connection and parse host signal (friend signal) to find host device. After that, system will create guest signal, guest have to share the signal to the host to complete the connection. After the connection is established, you can start playing and chatting with each other.'
            }
          </p>
          <p className="text-chart-3 text-justify text-sm">
            {
              'Warning: because I cannot afford to maintain a server to create a completely automatic flow, the peer-to-peer, with a little inconvenience, is fit for me. You can share your signal with your friend via any chat app like messenger,...'
            }
          </p>
          <p className="mt-2 text-lg">4. Online play mode</p>
          <p className="text-justify text-sm">
            {
              'The host, currently as the player1, has the right to change the board size. When the connection is established, the board size will be synced to the guest. After the first game is over, the right to change board size and play the first move will be transferred to the winner.'
            }
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
