import { renderHook, act } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import { logInAsync } from 'expo-google-app-auth'
import { AuthProvider, useAuth } from '../../hooks/auth';

jest.mock('expo-google-app-auth')

describe('Auth Hook', () => {
  it('should be able to sign in with Google existing', async () => {
    const googleMocked = mocked(logInAsync as any);

    googleMocked.mockReturnValueOnce({
      type: 'success',
      user: {
        id: 'any_id',
        email: 'any@email.com',
        name: 'Any Name',
        photoUrl: 'any_photo.png',
      }
    });

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    await waitForNextUpdate();

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.name).toBe('Any Name');
    expect(result.current.user.email).toBe('any@email.com');
  })

  it('user should not connect if cancel authentication with Google', async () => {
    const googleMocked = mocked(logInAsync as any);

    googleMocked.mockReturnValueOnce({
      type: 'cancel'
    });

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    await waitForNextUpdate();

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty('id');
  })

  it('should be error with incorretly Google parameters', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    await waitForNextUpdate();

    try {
      await act(() => result.current.signInWithGoogle());
    } catch (error) {
      expect(result.current.user).toEqual({});
    }
  })
})