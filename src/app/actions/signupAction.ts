'use server';

export async function signup(data: FormData) {
  console.log('이 코드는 서버에서 실행돼요!!!!', data);
  console.log(data);
  return {
    status: 'success',
    message: 'ok',
  };
}
