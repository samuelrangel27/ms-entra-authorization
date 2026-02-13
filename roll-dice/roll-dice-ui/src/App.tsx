import { useState } from 'react';
import './App.css';

interface DiceResult {
  values: number[];
}

function App() {
  const [numberOfDice, setNumberOfDice] = useState<number>(1);
  const [diceValues, setDiceValues] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const rollDice = async () => {
    if (numberOfDice < 1 || numberOfDice > 100) {
      setError('Please enter a number between 1 and 100');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:5000/roll-dice?numberOfDice=${numberOfDice}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to roll dice');
      }

      const values: number[] = await response.json();
      setDiceValues(values);
    } catch (err) {
      setError('Failed to connect to the API. Make sure the server is running on http://localhost:5000');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      rollDice();
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🎲 Dice Roller</h1>
          <p>Roll the dice and test your luck!</p>
        </header>

        <div className="controls">
          {error && <div className="error">{error}</div>}

          <div className="control-group">
            <div className="form-group">
              <label htmlFor="numberOfDice" className="form-label">
                Number of Dice
              </label>
              <input
                id="numberOfDice"
                type="number"
                min="1"
                max="100"
                value={numberOfDice}
                onChange={(e) => setNumberOfDice(parseInt(e.target.value) || 1)}
                onKeyPress={handleKeyPress}
                className="form-input"
                disabled={loading}
              />
            </div>
            <button
              onClick={rollDice}
              disabled={loading}
              className="btn"
            >
              {loading ? 'Rolling...' : 'Roll Dice'}
            </button>
          </div>
        </div>

        {diceValues.length > 0 ? (
          <div className="dice-grid">
            {diceValues.map((value, index) => (
              <div key={index} className="dice-card">
                <div className="dice-value">{value}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🎲</div>
            <div className="empty-state-text">
              Enter the number of dice and click "Roll Dice" to get started
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
