import Authenticator from '@/lib/auth';
import type { Email } from '@/types/login';

export function SignInForm() {
  const handleSignIn = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as Email;
    const password = formData.get('password') as string;
    const username = formData.get('username') as string;

    console.log(formData);
    console.log(email);
    console.log(password);
    console.log(username);

    const signup = await Authenticator.signUp(username, email, password);

    if (signup) {
      console.log('successfully Signed up');
      console.log(signup);
    } else if (!signup) {
      throw new Error('Account creation failed');
    }
  };

  return (
    <form onSubmit={handleSignIn} className="signInForm">
      <div>
        <label htmlFor="email" className="Label">
          Email{' '}
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="Input"
          placeholder="proxy@index.org"
        />
      </div>
      <div>
        <label htmlFor="password" className="Label">
          Password{' '}
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="Input"
          placeholder="A strong password, a strong Proselyte."
        />
      </div>
      <div>
        <label htmlFor="username" className="Label">
          Username{' '}
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="Input"
          placeholder="A memorable, unique name."
        />
      </div>
      <div>
        <input type="submit" value={'Sign in'} className="Submission" />
      </div>
    </form>
  );
}

export function LogInForm() {
  const handleLogIn = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as Email;
    const password = formData.get('password') as string;

    const login = await Authenticator.login(email, password);

    if (login) {
      console.log('successfully logged in');
    } else if (!login) {
      throw new Error('Failed Login');
    }
  };

  return (
    <form onSubmit={handleLogIn} className="logInForm">
      <div>
        <label htmlFor="email" className="Label">
          Email{' '}
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="Input"
          placeholder="proxy@index.org"
        />
      </div>
      <div>
        <label htmlFor="password" className="Label">
          Password{' '}
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="Input"
          placeholder="Remember your creed."
        />
      </div>
      <div>
        <input type="submit" value="Log In" className="Submission" />
      </div>
    </form>
  );
}
