import { Link } from 'react-router-dom';
import { EnvelopeSimple, Password } from 'phosphor-react';

import plane from '../../assets/plane.jpg';

import './styles.scss';

export function Login() {
  return (
    <div className='login'>
      <div className='form'>
        <form>
          <h2>Sign In to Annotations</h2>
          <div className='labels'>
            <label>
              <p>Email Address</p>
              <div className='input'>
                <EnvelopeSimple size={20} />
                <input type='email' />
              </div>
            </label>
            <label>
              <div className='sub-title'>
                <p>Password</p>
                <p className='forgot'>Forgot password?</p>
              </div>
              <div className='input'>
                <Password size={20} />
                <input type='password' />
              </div>
            </label>
            <div className='buttons'>
              <button className='sign-in'>Sign In</button>
              <Link to='/add-user'>
                <p>Sign Up</p>
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div className='image'>
        <img src={plane} alt='Plane blue' />
      </div>
    </div>
  );
}
