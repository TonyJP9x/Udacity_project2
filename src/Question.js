import React from 'react';
import { useDispatch } from 'react-redux';
import { newSelectedQuestions } from './Slices/QuestionSlice';
import { Link } from 'react-router-dom';

function Question({flag, data}) {
    const dispatch = useDispatch();

    const handleOnClick = (item) => {
      dispatch(newSelectedQuestions(item));
    };
  
    const timeStamp = (timeStamp) => {
      const date = new Date(timeStamp);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const time = `${hours % 12 || 12}:${minutes.toString().padStart(2, "0")} ${
        hours < 12 ? "AM" : "PM"
      }`;
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const dateStr = `${month}/${day}/${year}`;
      return `${time} | ${dateStr}`;
    };
    return (
        
          <div
            className="card border-secondary mb-3 "
            style={{ width: "100%", paddingLeft: "0px", paddingRight: "0px" }}
          >
            <div className="card-header">{flag ? "New Questions": "Answered"}</div>
            <div
              className="card-body text-secondary"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {data.sort((a, b) => b.timestamp - a.timestamp).map((item, index) => (
                <div
                  key={index}
                  className="card bg-light mb-3"
                  style={{ maxWidth: "18rem" }}
                >
                  <div className="card-header">
                    <strong>{item.author}</strong>
                    <br />
                    {timeStamp(item.timestamp)}
                  </div>
                  <div className="card-body">
                    <Link to={`/questions/${item.id}`}>
                      <button
                        style={{ width: "100%" }}
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => handleOnClick(item)}
                      >
                        Show
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
       

    );
}

export default Question;