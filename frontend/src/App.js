import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

const hidden = {
  "Mirror Shard": 2141.205,
  "Tempering Orb": 624.3,
  "Sacred Crystallised Lifeforce": 313.5,
  "Secondary Regrading Lens": 209.0,
  "Tailoring Orb": 209.0,
  "Tainted Divine Teardrop": 208.7,
  "Orb of Dominance": 180.0,
  "Hunter's Exalted Orb": 134.0,
  "Awakener's Orb": 94.0,
  "Tainted Exalted Orb": 69.0,
  "Tainted Chaos Orb": 68.64285714285714,
  "Prime Regrading Lens": 56.666666666666664,
  "Redeemer's Exalted Orb": 40.0,
  "Crusader's Exalted Orb": 40.0,
  "Warlord's Exalted Orb": 40.0,
  "Orb of Conflict": 29.85774,
  "Eldritch Chaos Orb": 27.473684210526315,
  "Exceptional Eldritch Ichor": 23.7,
  "Tainted Mythic Orb": 23.176470588235293,
  "Blessing of Chayula": 22.0,
  "Eldritch Orb of Annulment": 18.0,
  "Otherworldly Scouting Report": 14.0,
  "Exceptional Eldritch Ember": 11.461539,
  "Comprehensive Scouting Report": 11.5,
  "Charged Compass": 10.857142857142858,
  "Blessing of Uul-Netol": 10.0,
  "Unstable Catalyst": 10.0,
  "Tainted Blessing": 10.0,
  "Influenced Scouting Report": 9.851851111111111,
  "Eldritch Exalted Orb": 9.0,
  "Blessing of Esh": 7.368421052631579,
  "Blessing of Tul": 7.0,
  "Tainted Orb of Fusing": 6.0,
  "Blessing of Xoph": 5.0,
  "Fertile Catalyst": 5.002008333333333,
  "Singular Scouting Report": 4.726815263157895,
  "Awakened Sextant": 3.21442,
  "Grand Eldritch Ichor": 2.9267625,
  "Veiled Chaos Orb": 0.1571425,
  "Accelerating Catalyst": 2.482325,
  "Delirious Scouting Report": 2.125,
  "Blighted Scouting Report": 2.0,
  "Grand Eldritch Ember": 2.0,
  "Tainted Jeweller's Orb": 1.88889,
  "Harbinger's Orb": 1.3328795,
  "Greater Eldritch Ichor": 1.3092882352941178,
  "Greater Eldritch Ember": 0.975,
  "Exalted Shard": 1.0,
  "Tempering Catalyst": 1.0049,
  "Tainted Armourer's Scrap": 0.9878569230769231,
  "Vaal Scouting Report": 0.865225294117647,
  "Lesser Eldritch Ember": 0.9056878571428572,
  "Explorer's Scouting Report": 0.803225,
  "Intrinsic Catalyst": 0.71429,
  "Noxious Catalyst": 0.5689257142857143,
  "Tainted Chromatic Orb": 0.33333,
  "Lesser Eldritch Ichor": 0.5264916666666667,
  "Turbulent Catalyst": 0.33479846153846154,
  "Tainted Blacksmith's Whetstone": 0.32854666666666665,
  "Annulment Shard": 0.9803933333333333,
  "Imbued Catalyst": 0.31216571428571427,
  "Abrasive Catalyst": 0.30441,
  "Elevated Sextant": 29.85774,
  "Vivid Crystallised Lifeforce": 0.056639,
  "Orb of Annulment": 8.986015384615385,
  "Wild Crystallised Lifeforce": 0.03553,
  "Operative's Scouting Report": 3.4,
  "Primal Crystallised Lifeforce": 0.02496  
};

const data = {
  "Mirror of Kalandra": 41743.0,
  "Divine Orb": 209.0,
  "Sacred Orb": 32.666666666666664,
  "Exalted Orb": 17.41597,
  "Prismatic Catalyst": 9.506777777777778,
  "Ritual Vessel": 5.0,
  "Ancient Orb": 0.5826728571428571,
  "Surveyor's Compass": 1.6228094736842105,
  "Orb of Unmaking": 1.338208,
  "Gemcutter's Prism": 1.1944466666666667,
  "Stacked Deck": 1.0,
  "Chaos Orb": 1,
  "Regal Orb": 0.7095266666666666,
  "Oil Extractor": 0.64285625,
  "Orb of Regret": 0.511515,
  "Vaal Orb": 0.528036,
  "Enkindling Orb": 0.47619,
  "Blessed Orb": 0.475515,
  "Instilling Orb": 0.4495955555555556,
  "Orb of Scouring": 0.35281090909090906,
  "Orb of Horizons": 0.218894375,
  "Orb of Alteration": 0.18555444444444444,
  "Orb of Fusing": 0.16369666666666666,
  "Chromatic Orb": 0.13127285714285714,
  "Glassblower's Bauble": 0.13333,
  "Cartographer's Chisel": 0.11111,
  "Engineer's Orb": 0.11244105263157894,
  "Orb of Alchemy": 0.09091,
  "Orb of Binding": 0.07533882352941176,
  "Orb of Chance": 0.065077,
  "Orb of Augmentation": 0.057066,
  "Jeweller's Orb": 0.05458,
  "Portal Scroll": 0.01667,
  "Orb of Transmutation": 0.01063,
  "Scroll of Wisdom": 0.006165333333333333,
  "Blacksmith's Whetstone": 0.006413846153846154
};

function App() {
  const [denom, setDenom] = useState(1);
  const [highlighted, setHighlighted] = useState('Chaos Orb');
  return (
    <div className="App">
      {/* {Object.entries(data).forEach(([a, b]) => <span>a</span>)} */}
      {/* {Object.entries(data).forEach(([key, value]) => console.log(`${key}: ${value}`))} */}
      <table>
        {Object.entries(data).sort(([k,v]) => -v).map(([key, value]) => {
          const bgcolor = (key===highlighted) ? '#373' : ''
          return (
            <tr onClick={e => {
              setDenom(value);
              setHighlighted(key);
            }}>
              <td
                style={{backgroundColor: bgcolor}}
              >
                {key}
              </td>
              <td
                style={{textAlign: 'right', backgroundColor: bgcolor}}
              >
                {(value / denom).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </td>
              <td
                style={{textAlign: 'right', backgroundColor: bgcolor}}
              >
                {(denom / value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </td>
            </tr>
          );
        }
        )}
      </table>
    </div>
  );
}

export default App;
