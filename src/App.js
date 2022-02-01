import { useState } from "react";
import { data } from "./data";
import "./App.css";

function App() {

  const [sights, setSights] = useState(data);
  

  const removeItem = (id) => {
    let newSights = sights.filter((element) => element.id !== id);
    setSights(newSights);
  };

  const setShowMore = (id) => {
    const newSights = [];
    sights.forEach((sight) => {
      if (sight.id === id) {
        const changedSight = { ...sight, showMore: !sight.showMore };
        newSights.push(changedSight);
      } else {
        newSights.push(sight);
      }
    });
    setSights(newSights);
  };

  const [t, setT] = useState(0);
  const [datas, setDatas] = useState(data);
  let newArr = [...datas];

  const [count, setCount] = useState([0, 0, 0, 0, 0, 0]);

  const nextSight = (e, index) => {
    setDatas(newArr);

    const slide = document.querySelectorAll("#slide");
    newArr[index] = sights[index];

    setT((t) => {
      t++;
      if (t > 2) {
        t = 0;
      }
      return t;
    });
    slide[index].setAttribute("src", newArr[index].image[t]);
    return slide;
  };

  const previousSight = (e, index) => {
    const slide = document.querySelectorAll("#slide");
    newArr[index] = sights[index];
    setDatas(newArr);
    setT((t) => {
      t--;
      if (t < 0) {
        t = 2;
      }
      return t;
    });

    slide[index].setAttribute("src", newArr[index].image[t]);
    return slide;
  };

  const rateUpdate = (e, index) => {
    const rateHolder = document.querySelectorAll('#rateHolder');
    setCount((count => {
      count[index]++;
      return count;
    }))
    rateHolder[index].innerHTML = (sights[index].rating) + count[index];
    return rateHolder;
  }

  return (
    <div>
      <div className="container">
        <h1>Top {sights.length} sights in Montreal</h1>
      </div>
      {sights.map((element) => {
        const { id, name, image, description, showMore, rating } = element;
        const index = sights.indexOf(element);

        return (
          <div className="container" key={id}>
            <div>
              <h2>
                {id}. {name}
              </h2>
            </div>
            <div>
              <img id="slide" className="photo" src={image[0]} alt="sight" />
            </div>
            <div className="buttons">
              <button
                className="btn"
                onClick={(e) => previousSight(e, index)}
                id={id}
              >
                Previous
              </button>
              <button
                className="btn"
                onClick={(e) => nextSight(e, index)}
                id={id}
              >
                Next
              </button>
            </div>
            <div className="container">
              <p>
                {showMore ? description : description.substring(0, 240) + "..."}
                <button
                  className="show"
                  onClick={() => setShowMore(id)}
                >
                  {showMore ? "Show less" : "Show more"}
                </button>
              </p>
            </div>
            <div className="container rate">
              <h3 className="numberRate" id="rateHolder" value="">
                {rating}
              </h3>
              <button
                className="btnRate"
                id={id}
                onClick={(e) => rateUpdate(e, index)}
              >
                {" "}
                ⭐{" "}
              </button>
            </div>
            <div className="container">
              <button className="btnRemove" onClick={() => removeItem(id)}>
                Remove
              </button>
            </div>
          </div>
        );
      })}
      <div className="container">
        <button className="btnDeleteAll" onClick={() => setSights([])}>
          {" "}
          Delete all{" "}
        </button>
      </div>
    </div>
  );
}

export default App;
