import { useState } from "react";
import PlayerInput from "../PlayerInput/PlayerInput";
import PlayerPreview from "../PlayerInput/PlayerPreview";
import { Link } from "react-router-dom";
function Battle() {
    const [playerData, setPlayerData] = useState({
        playerOneName: '',
        playerOneImage: null,
        playerTwoName: '',
        playerTwoImage: null
    })
    const handleSubmit = (userName, id) => {
        setPlayerData(prevState => (
            {
                ...prevState,
                [`${id}Name`]: userName,
                [`${id}Image`]: `https://github.com/${userName}.png?size=200`,
            }
        ))
    }
    const handleReset = (id) =>{
        setPlayerData(prevState => (
            {
                ...prevState,
                [`${id}Name`]: '',
                [`${id}Image`]: null,
            }
        ))
    }
    return (
            <div>
                <div className="row">
                    {!playerData.playerOneImage ? 
                        <PlayerInput 
                            id='playerOne'
                            label='Player 1' 
                            onSubmit={handleSubmit}
                        />
                    : 
                    <PlayerPreview 
                        avatar={playerData.playerOneImage}
                        userName={playerData.playerOneName}>

                        <button className="reset" onClick={() => handleReset('playerOne')}>Reset</button>
                    </PlayerPreview>
                    }
                    {
                        !playerData.playerTwoImage ? 
                            <PlayerInput 
                                id='playerTwo'
                                label='Player 2' 
                                onSubmit={handleSubmit}
                            />
                        : 
                            <PlayerPreview 
                                avatar={playerData.playerTwoImage}
                                userName={playerData.playerTwoName}>
                                <button className="reset" onClick={() => handleReset('playerTwo')}>Reset</button>
                            </PlayerPreview>
                    }
                </div>
                {playerData.playerOneImage && playerData.playerTwoImage && 
                    <Link className="button" to={{
                        pathname: 'results',
                        search: `?playerOneName=${playerData.playerOneName}&playerTwoName=${playerData.playerTwoName}`
                    }} >Battle</Link>
                }
            </div>
        );
}
export default Battle;