import { fork, allSettled } from 'effector';
import { $todos, fetchTodosFx } from './fetchDataFactory';

test('fetchTodosFx updates store correctly', async () => {
    fetchTodosFx.use(() => [
        { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
        { userId: 1, id: 2, title: 'quis ut nam facilis et officia qui', completed: false },
    ]);

    const scope = fork();

    await allSettled(fetchTodosFx, { scope });

    expect(scope.getState($todos)).toEqual([
        { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
        {
            completed: false,
            id: 2,
            title: 'quis ut nam facilis et officia qui',
            userId: 1,
        },
    ]);
});
