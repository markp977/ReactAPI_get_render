import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        pokemonData: [],
        placeHolderData: []
    }
  };

componentDidMount() {
  this.getPokemonData();
  this.getPlaceholderData();
}

getPokemonData = () => {
  const pokemonDataCollection = [];
  for (let i=0; i < 10; i++) {
    
    let randomId = Math.round(Math.random() * 149) + 1;
    let url = `https://pokeapi.co/api/v2/pokemon/${randomId}`;
    let fetches = [];
    fetches.push(
    fetch(url) // Call the fetch function passing the url of the API as a parameter
    .then((resp) => resp.json())
    .then((data) => {
      let pokeData = {
          id: data.id,
          name: data.name,
          abilities: data.abilities,
          types: data.types,
          sprite: data.sprites.front_default
      }
      pokemonDataCollection.push(pokeData);
      
    })
    )
    Promise.all(fetches).then(() => {
      this.setState({pokemonData:pokemonDataCollection})
    });
  }
  
}

renderPokemonData = () => {
  const {
	  pokemonData
  } = this.state
  
  const markUp = pokemonData.map(item => {
      return (
      <DataContainer>
        <SubHeader>Name: {item.name}</SubHeader>
        <Image src={item.sprite} width='200' alt='itemName'/>
        <Body>Type: {item.types[0].type.name}</Body>
        <Body>Ability: {item.abilities[0].ability.name}</Body>
      </DataContainer>
      )
    }
  )
  return markUp
}

getPlaceholderData = () => {
  let url = 'https://jsonplaceholder.typicode.com/posts/';
  fetch(url) // Call the fetch function passing the url of the API as a parameter
  .then(resp => resp.json())
  .then(response => this.setState({placeHolderData: response}))
}

renderPlaceholderData = () => {
  const {
    placeHolderData
  } = this.state
  
  const markUp = placeHolderData.slice(0, 10).map(post => {
      return (
        <DataContainer>
          <SubHeader>{post.title}</SubHeader>
          <Image src='https://via.placeholder.com/150/56a8c2' alt="placeholder" />
          <Body>{post.body}</Body>
        </DataContainer>
      )
    }
  )
  console.log('markup: ', markUp);
  return markUp
}

render() {
  return (
    <Wrapper>
      <ApiContainer>
        {this.renderPokemonData()}
      </ApiContainer>
      <ApiContainer>
        {this.renderPlaceholderData()}
      </ApiContainer>
    </Wrapper>
  );
}
}

const Wrapper =styled.div`
    width:50%;
    margin:0 auto;
    font-family: Arial, Helvetica, sans-serif;
`;

const ApiContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const DataContainer = styled.div`
    width: 45%;
    margin:0 20px 20px 0;
    padding: 15px;
    border:1px solid #ccc;
    text-align: center;
`;

const SubHeader = styled.h2`
  font-size: 24px;
  text-transform: capitalize;
  font-weight: bold;
  margin-bottom: 20px
`;

const Body = styled.p`
  font-size: 16px;
  text-transform: capitalize;
  margin-bottom: 20px
`;

const Image = styled.img`
  margin-bottom: 20px
`;


const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
