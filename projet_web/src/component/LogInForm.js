import React, { Component } from 'react';
import InputField           from './InputField';
import SubmitButton         from './SubmitButton';

class LogInForm extends Component {
    state = {  } 
    render() { 
        return (
            <div className='logInForm'>
                Log in
                <InputField
                    type='text'
                    placeholder="Email"
                />
                <InputField
                    type='password'
                    placeholder="Password"
                />
                <SubmitButton
                    text={'Log in'}
                    disabled={false}
          
                />
            </div>
        );
    }
}
 
export default LogInForm;