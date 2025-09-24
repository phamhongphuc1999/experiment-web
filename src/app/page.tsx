import Link from 'next/link';
import CommonContainer from 'src/components/box/CommonContainer';

export default function Home() {
  return (
    <CommonContainer>
      <p>
        Hello, what do you want to do? Let's play{' '}
        <Link href="/caro" className="text-orange-400 underline">
          caro
        </Link>
        .
      </p>
      <p>
        You can learn about me in{' '}
        <Link
          href="https://peter-present.xyz/"
          target="_blank"
          className="text-orange-400 underline"
        >
          my portfolio
        </Link>
        .
      </p>
    </CommonContainer>
  );
}
