import AuthGuard from 'src/guards/AuthGuard';
import PAppHomeView from 'src/views/PApp/PAppHomeView';

export default function PAppHome() {
  return (
    <AuthGuard className="container">
      <PAppHomeView />
    </AuthGuard>
  );
}
