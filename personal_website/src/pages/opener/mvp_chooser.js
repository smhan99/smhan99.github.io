import winedata from "../../data/opener/wine_flavor_counts.json"
import surveyres from "../../data/opener/survey_results.json"
import grapefood from "../../data/opener/grape-food.json"
import winecols from "../../data/opener/wine_cols.json"

import Grid from '@mui/material/Grid';

import { useState, useEffect, useMemo } from 'react'
import { useTable } from 'react-table'

import "../../styles/Wine.css"

const flavors = ['Floral','Green Fruit','Citrus Fruit','Stone Fruit','Tropical Fruit','Red Fruit',
  'Black Fruit','Dried/Cooked Fruit','Herbaceous','Herbal','Pungent Spice','Other',
  'Yeast','MLF','Oak','Oxidation','Fruit Development (White)','Fruit Development (Red)',
  'Bottle Age']

const euclideanTotal = 19 * Math.sqrt(10)

function Mvp_chooser() {
  const [data, setFirstTen] = useState([]);
  // const data = useMemo(() => firstTen, []);
  const columns = useMemo(() => winecols, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  // Weights
  const [flavorWeight, setFlavorWeight] = useState(1.0);
  const [aromaWeight, setAromaWeight] = useState(1.0);
  const [pairingWeight, setPairingWeight] = useState(1.0);

  // Distance Type : Euclidean (0), Manhattan (1)
  const [distType, setDistType] = useState(0)
  const distTypes = ["Euclidean", "Manhattan"]

  // Pct Calculation Type : Total (0), Normalized (total = 10) (2)
  const [pctType, setPctType] = useState(0)
  const pctTypes = ["Total", "Normalized (Total = 10)"]
  
  // person : Jay, Hannah, Roy (0, 1, 2)
  const [person, setPerson] = useState(0)
  const people = ["Jay", "Hannah", "Roy"]

  const getpt = () => {
    var pt = 0
    Object.keys(surveyres[people[person]].Fruit).forEach((element) => {
      pt += surveyres[people[person]].Fruit[element]
    })
    return pt;
  }

  const setTen = () => {
    // console.log("setting ten again...");
    // console.log(data);
    // console.log("distType: " + distType)
    var calculated = JSON.parse(JSON.stringify(winedata));
    calculated.map((wine) => {
      var score = 0.
      // flavors
      var personalTotal = pctType == 0 ? getpt() : 10;
      var flavScore = 0.
      const personname = people[person]
      flavors.forEach((flavor) => {
        var flavorExists = Object.keys(surveyres[personname].Fruit).includes(flavor);
        var personalscore = flavorExists ? (surveyres[personname].Fruit[flavor] / parseFloat(personalTotal)) * 10 : 0;
        var winescore = (pctType == 0 ? (parseFloat(wine[flavor]) / parseFloat(wine.Total)) : (parseFloat(wine[flavor]) / 10)) * 10;
        var toadd = Math.abs(personalscore - winescore);
        // if (wine.Name === "Seghesio Family Vineyards Zinfandel Sonoma County 2021" && !flavorExists) {
        //   console.log("winename: " + wine.Name)
        //   console.log("flavor: " + flavor)
        //   console.log("exists: " + flavorExists)
        //   console.log("personalscore: " + personalscore)
        //   console.log("winescore: " + winescore)
        //   console.log("toadd: " + toadd)
        // }
        
        
        toadd = distType == 0 ? toadd ** 2 : toadd;
        // if (wine.Name === "Seghesio Family Vineyards Zinfandel Sonoma County 2021") {
        //   console.log("toadd: " + toadd + " " + (distType == 0))
        // }
        flavScore += parseFloat(toadd);
      })
      
      // console.log("flavscore: " + flavScore)
      flavScore = (distType == 0 ? euclideanTotal - Math.sqrt(flavScore) : 190. - flavScore);
      // console.log("flavscore: " + flavScore)
      score += (flavScore * flavorWeight);
      // if (wine.Name == "Seghesio Family Vineyards Zinfandel Sonoma County 2021") {
      //   console.log("score = " + score)
      // }
      
      // aromas
      var aroma = surveyres[personname].Souvenir
      var aromaPct = pctType === 0 ? parseFloat(wine[aroma]) / parseFloat(wine.Total) : parseFloat(wine[aroma]) / 10.
      score += (aromaPct * 10 * aromaWeight)

      //pairing
      var food = surveyres[personname].Meal
      var grape = grapefood[food]
      score += ((wine["Grape Variety"] === grape) ? 10 : 0) * pairingWeight

      //update
      wine.score = score;
      return wine
    });
    // console.log(winedata[0])
    // console.log(calculated[0])
    calculated.sort((wineA, wineB) => {
      return wineB.score - wineA.score;
    });

    calculated = calculated.slice(0, 10);
    calculated.forEach((wine, ind) => {
      wine.rank = ind + 1;
      wine.score = Number(wine.score.toFixed(2));
      return wine;
    })
    // console.log(calculated);
    // setFirstTen([]);
    setFirstTen(calculated);
  }

  const changeWeight = (tp, val) => {
    if (tp === "flavor") {
      setFlavorWeight(val / parseFloat(100.));
      // console.log("flavor")
    } else if (tp === "aroma") {
      setAromaWeight(val / parseFloat(100.));
      // console.log("aroma")
    } else {
      setPairingWeight(val / parseFloat(100.));
      // console.log("pairing")
    }
  }

  const changeType = (tp, val) => {
    if (tp === "distance") {
      setDistType(val);
      // console.log("distance")
    } else if (tp === "pct") {
      setPctType(val);
      // console.log("pct")
    } else {
      setPerson(val);
      // console.log("person")
    }
  }

  useEffect(() => {
    setTen();
  }, [flavorWeight, aromaWeight, pairingWeight, distType, pctType, person])

  return (
    <div className='mvp'>
      <h1>MVP</h1>
      <div class="information">
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <div id="wine_selection">
            <div class="selections_display">
              <h2> Flavor Weight : {flavorWeight} </h2>
              <h2> Aroma Weight : {aromaWeight} </h2>
              <h2> Pairing Weight : {pairingWeight} </h2>
              <h2> Dist Type : {distTypes[distType]} </h2>
              <h2> Pct Type : {pctTypes[pctType]} </h2>
              <h2> Person : {people[person]} </h2>
            </div>
            <div id="wine-input-wrapper">
              <label for="flavor">Flavor slider</label>
              <input id="flavor" type="range" min='0' max='100' step='1' value={flavorWeight * 100} onChange={e => changeWeight("flavor", e.target.value)} />
              <label for="aroma">Aroma slider</label>
              <input id="aroma" type="range" min='0' max='100' step='1' value={aromaWeight * 100} onChange={e => changeWeight("aroma", e.target.value)} />
              <label for="pairing">Pairing slider</label>
              <input id="pairing" type="range" min='0' max='100' step='1' value={pairingWeight * 100} onChange={e => changeWeight("pairing", e.target.value)} />
              
              <label for="distance">Select Distance Type: </label>
              <div class="custom-select">
                <select name="distance" id="distance" onChange={e => changeType("distance", e.target.value)}>
                  <option value={0}>Euclidean</option>
                  <option value={1}>Manhattan</option>
                </select>
                <div class="select-arrow"></div>
              </div>
              

              <label for="pct">Select Pct Type: </label>
              <div class="custom-select">
                <select name="pct" id="pct" onChange={e => changeType("pct", e.target.value)}>
                  <option value={0}>Total</option>
                  <option value={1}>Normalized</option>
                </select>
                <div class="select-arrow"></div>
              </div>

              <label for="person">Select Person: </label>
              <div class="custom-select">
                <select name="person" id="person" onChange={e => changeType("person", e.target.value)}>
                  <option value={0}>Jay</option>
                  <option value={1}>Hannah</option>
                  <option value={2}>Roy</option>
                </select>
                <div class="select-arrow"></div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={10}>
          <div id="wine_table">
            <div className='topten'>
              <table {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Grid>
      </Grid>
      </div>
    </div>
  )
}

export default Mvp_chooser;