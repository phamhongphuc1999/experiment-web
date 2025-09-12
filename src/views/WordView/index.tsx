'use client';

import { useCategories } from 'src/hooks/queries/word.query';
import { postgrestMoment } from 'src/services';

export default function WordView() {
  const { data } = useCategories();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Title</th>
            <th>Create at</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((category) => {
            return (
              <tr key={category.id}>
                <th>{category.id}</th>
                <th>{category.title}</th>
                <th>{postgrestMoment(category.create_at).format('MMM DD, YYYY h:mm')}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
