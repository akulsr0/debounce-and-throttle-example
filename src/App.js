import React from 'react';

function debounce(cb, wait = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb.apply(null, args);
    }, wait);
  };
}

function throttle(cb, wait = 500) {
  let ran = false;
  return (...args) => {
    if (!ran) {
      cb.apply(null, args);
      ran = true;
      setTimeout(() => {
        ran = false;
      }, wait);
    }
  };
}

function App() {
  function onChangeSearchInput(e) {
    console.log(e.target.value);
  }

  React.useEffect(() => {
    const onMouseMove = throttle(function (e) {
      console.log(e.clientX, e.clientY);
    });
    addEventListener('mousemove', onMouseMove);
    return () => removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div>
      <h1>Debounce and Throttle</h1>
      <p>
        <strong>Debounce: </strong>Open Console, and write in search input to
        see debounced logs.
      </p>
      <p>
        <strong>Throttle: </strong>Open Console, and move the mouse around
        viewport to see throttled mouse move logs.
      </p>
      <input placeholder="Search" onChange={debounce(onChangeSearchInput)} />
    </div>
  );
}

export default App;
