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
      <p className="mt-2">More routes in my app</p>
      <ul className="list-inside list-disc">
        <Link href="/weather" className="inline-block hover:text-orange-400 hover:underline">
          <li>weather</li>
        </Link>
        <br />
        <Link href="/encrypt" className="inline-block hover:text-orange-400 hover:underline">
          <li>encrypt</li>
        </Link>
      </ul>
    </CommonContainer>
  );
}
