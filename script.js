const toiletPaper = document.getElementById('toilet-paper');
const skibidiButton = document.getElementById('skibidi-button');
let clicks = { amount: 0 };
let isToiletPaperFull = false;

var button = document.getElementById("Skibidi");
button.onclick = function() {
  clicks.amount++;
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CLICK':
      return {
        ...state,
        clicks: { amount: state.clicks.amount + 1 },
      };
    case 'REFILL_TOILET_PAPER':
      return {
        ...state,
        isToiletPaperFull: true,
      };
    default:
      return state;
  }
};

const [state, dispatch] = React.useReducer(reducer, { clicks, isToiletPaperFull });

React.useEffect(() => {
  const intervalId = setInterval(() => {
    if (!state.isToiletPaperFull) {
      dispatch({ type: 'REFILL_TOILET_PAPER' });
    }
  }, 5000);

  return () => clearInterval(intervalId);
}, []);

const handleClick = () => {
  dispatch({ type: 'CLICK' });
};

const handleMouseEnter = () => {
  toiletPaper.classList.add('full');
  toiletPaper.querySelector('.paper').style.transform = 'scaleY(2)';
};

const handleMouseLeave = () => {
  toiletPaper.classList.remove('full');
  toiletPaper.querySelector('.paper').style.transform = 'scaleY(1)';
};
