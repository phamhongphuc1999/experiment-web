import { beVietnamPro } from 'src/configs/font-family';
import { useWordPairsStore } from 'src/states/wordPairs.state';

export default function RevealSpot() {
  const { currentRound, result, status: gameStatus } = useWordPairsStore();

  return gameStatus == 'revealing' ? (
    <div className="border p-2">
      {result[currentRound].reorderPairs.map((pair) => {
        const point = result[currentRound].points[pair.id];
        const status = point.status;
        const isReveal = gameStatus == 'revealing' && status == 'wrong';

        return isReveal ? (
          <div key={pair.id}>
            <p className="no-copy">
              <span className={beVietnamPro.className}>{pair.vi}</span> {'->'}{' '}
              <span className="text-destructive">{point.userEn}</span> {'->'}{' '}
              <span className="text-green-400">{pair.en}</span>
            </p>
          </div>
        ) : null;
      })}
    </div>
  ) : null;
}
