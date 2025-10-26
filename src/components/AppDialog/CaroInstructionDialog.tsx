/* eslint-disable quotes */
import { Bluetooth, InfoCircle, Setting2 } from 'iconsax-reactjs';
import { DIALOG_KEY } from 'src/configs/constance';
import { useDialogStore } from 'src/states/dialog.state';
import AppTooltip from '../AppTooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../shadcn-ui/dialog';

export default function CaroInstructionDialog() {
  const { dialog, setDialog } = useDialogStore();

  function onSettingClick() {
    setDialog(DIALOG_KEY.caroInstructionDialog, false);
    setDialog(DIALOG_KEY.caroConfigDialog, true);
  }

  return (
    <Dialog
      open={dialog[DIALOG_KEY.caroInstructionDialog]}
      onOpenChange={(open) => setDialog(DIALOG_KEY.caroInstructionDialog, open)}
    >
      <DialogTrigger className="cursor-pointer">
        <AppTooltip contentProps={{ side: 'bottom' }} tooltipContent="Instructions">
          <InfoCircle size={16} />
        </AppTooltip>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl!">
        <DialogHeader>
          <DialogTitle>Caro instruction</DialogTitle>
        </DialogHeader>
        <div className="scroll-hidden h-[75vh] overflow-auto">
          <p className="text-lg">1. How to play?</p>
          <p className="text-justify text-sm">
            {
              'Your goal is to make five pieces of the same color in a vertical, horizontal or diagonal line. The player1 will take the first move. After the first game is over, the winner will take the first move.'
            }
          </p>
          <p className="mt-2 text-lg">2. Setting</p>
          <div className="text-justify text-sm">
            {'Click on the icon'}{' '}
            <Setting2 onClick={onSettingClick} className="inline cursor-pointer" size={14} />{' '}
            {
              'to open the config dialog. In the config dialog, you can change control the caro board. When you press save button, your changes will be applied and the new game will be started.'
            }
          </div>
          <p className="mt-2 text-lg">3. Play mode</p>
          <p className="text-justify text-sm">
            {'This game has three modes:'} <span className="text-green-400">offline</span>
            {', '}
            <span className="text-green-400">online</span>
            {', and '}
            <span className="text-green-400">machine</span>
            {'. You and your friend can play in one device on offline play mode.'}
          </p>
          <p className="text-justify text-sm">
            {
              'Meanwhile, in online play mode, you and your friend can connect to other peer-to-peer online ('
            }
            <Bluetooth className="inline" size={14} />
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
              'The host, currently as the player1, has the right to control the configuration and take the first move. When the connection is established, the configuration will be synced to the guest. After the first game is over, the right to control the configuration and play the first move will be transferred to the winner.'
            }
          </p>
          <p className="mt-2 text-lg">5. Game type</p>
          <p className="text-justify text-sm">
            {'This game support two game types:'} <span className="text-green-400">normal</span>{' '}
            {'and'} <span className="text-green-400">blind</span>.
          </p>
          <p className="text-justify text-sm">
            {
              'Normal type is just an ordinary traditional caro game, where two players perform their move until one of them wins.'
            }
          </p>
          <p className="text-justify text-sm">
            {
              "In blind type, only the latest move is shown on the game board; others are hidden, and players must depend on their memory to play their move. If a player makes at least a pre-defined number of mistakes (try to play from the grid that has already been played), the game's over, and the remaining player is the winner."
            }
          </p>
          <p className="text-justify text-sm">
            {
              'You can enable override mode. In this mode, you can play on the grid that the opponent has already played.'
            }
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
