import React from 'react';
import Jumbotron from "react-bootstrap/Jumbotron";
import './App.css';
import Peli from "./Peli";
import logo from './AWorkXkirkas.png';

function App() {

  return (
    <div className="App">
        <Peli/>
      <Jumbotron className="Jumbotron">
        <h1 className="jumbootsikko">Academykonsulttien levinneisyyspeli</h1>
          <h2>Tervetuloa kokeilemaan miten kauan konsulttisi selviävät urallaan.</h2>
          <img src={logo} className="Logo"/>

          <p>
              Tervetuloa pelaamaan! Sinun roolisi tässä pelissä on tuoda uusia konsultteja urakentälle.
              Jotta konsultit jatkaisivat uraansa mahdollisimman pitkään, onsinun luotava heille mahdollisuudet menestyä.
              Tämä toteutuu luomalla uusille konsulteillesi parhaat mahdolliset verkostot. Verkostoissa ei voi olla liikaa ihmisiä, koska tällöin piirit kääntyvät sisäänpäin ja näivettyvät.
              Toisaalta jos jätät konsulttisi yksin kentälle, he kokevat olonsa uhatuksi ja lähtevät takaisin omiin vanhoihin ammatteihinsa.
              Klikkaile ruudukosta konsulteillesi sopivat positiot ja katso miten Academyn ilosanoma leviää <br/><br/>- Jos leviää.
              <br/> Jos konsulttiesi urat jäävät polkemaan paikalleen, lähetä lisää porukkaa auttamaan heidät uudelle kiihdytyskaistalle.

        Tämä peli on toteutettu vanhalla "the Game of Life"-tyylillä.
        </p>
      </Jumbotron>

    </div>
  );
}

export default App;
