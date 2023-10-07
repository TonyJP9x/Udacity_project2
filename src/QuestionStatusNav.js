import React from 'react';
import { Link } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Question from './Question';

function QuestionStatusNav({handleAction}) {
  

    return (
        <div>
                <div style={{marginBottom: '2px'}}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="row" style={{width:'100%'}}>
            <div className="col-10" style={{display:'flex', paddingLeft:'30px'}}>
              <button  className="navbar-brand"  onClick={() => handleAction(true)}>
                New Questions
              </button>
       
              <button  className="navbar-brand" onClick={() =>handleAction(false)}>
                Answered
              </button>
     
            </div>
       
                   
       
      
          </div>

      </nav>
    </div>
        </div>
    );
}

export default QuestionStatusNav;