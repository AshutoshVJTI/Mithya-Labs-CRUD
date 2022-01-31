import "./cards.css";
import Card from '@mui/material/Card';

interface CardProps {
    data: {
        name: string,
        gender: string,
        age: string,
        id: number,
    }[],
    updater: (id: number) => void,
    deleter: (id: number) => void,
}

const Cards = (props: CardProps) => {
  const fillForm = (val: CardProps["data"][0]) => {
    props.updater(val.id);
  };
  const deleteCard = (val: CardProps["data"][0]) => {
    props.deleter(val.id);
  };

  return (
    <>
      <div>
        {props.data
          .slice(0)
          .reverse()
          .map((val: CardProps["data"][0]) => {
            return (
              <Card variant="outlined" id="singleCard">
              <div id="cards">
                <span>Name: {val.name}</span>
                <span>Gender: {val.gender}</span>
                <span>Age: {val.age}</span>
                <div>
                  <input
                    id="cardbuttons"
                    type="button"
                    value="update"
                    onClick={() => fillForm(val)}
                  />
                  <input
                    id="cardbuttons"
                    type="button"
                    value="delete"
                    onClick={() => deleteCard(val)}
                  />
                </div>
              </div>
                </Card>
            );
          })}
      </div>
    </>
  );
};

export default Cards;
