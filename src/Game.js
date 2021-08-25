import React, {useState, useEffect} from 'react';
import axios from "axios";

const Pokemons = () => {
    const [pokemon, setPokemon] = useState([])
    const [goal, setGoal] = useState({})
    const [answers, setAnswers] = useState([])
    const [message, setMessage] = useState('')
    const [score, setScore] = useState(0)
    const [freeAttempt, setFreeAttempt] = useState(10)
    const [isActive, setIsActive] = useState(false
    )


    useEffect(() => {
        axios('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
            .then(res => setPokemon(res.data.pokemon))
    }, [])


    const handleStart = () => {
        const random = Math.round((Math.random() * 151) + 1)
        // console.log(random)
        setGoal(pokemon.find(item => item.id === random))


        const numbers = [random, Math.round((Math.random() * 151) + 1), Math.round((Math.random() * 151) + 1), Math.round((Math.random() * 151) + 1)]

        function makeRandomArr() {
            return Math.random() - 0.5;
        }

        numbers.sort(makeRandomArr)


        setAnswers(numbers.map(num => {
            return pokemon.find(poke => poke.id === num)
        }))
        setIsActive(true)
        if (freeAttempt -1 === 0){
            setAnswers([])
            setGoal([])
            setMessage('')
        }
        // if (setIsActive===false && freeAttempt -1 === 0){
        //     setScore(0)
        //     setFreeAttempt(10)
        // }
    }
    const compareAnswer = (id) => {
        if (id === goal.id) {
            setMessage('Угадал')
            setScore(score + 1)
        } else{
            setMessage("Проиграл")
        }
        setFreeAttempt(freeAttempt - 1)
        if (freeAttempt -1 === 0){
            handleStart()
        }
        handleStart()

    }
    return (
        <div key={pokemon.id} className='all-elements'>
            <p className="pokemon-title">Проверь свои знания по покемонам</p>
            <div className='btn-flex'>
                <button onClick={handleStart} className='btn-start'>{isActive?'Restart' : 'Start'}</button>
            </div>
            <img src={goal.img} className='img' alt=""/>
            <form className='bnt-answers'>
                {
                    answers.map(el => <button onClick={() => compareAnswer(el.id)} key={el.id} className='bnt-answer' >{el.name}</button>
                    )
                }
            </form>
            <h3 className='message-title'>{message}</h3>
            <h4 className='freeAttempt'>У вас осталось {freeAttempt} игр</h4>

            {
                Boolean(!freeAttempt) && <div className='score'>Вы набрали из 10 : {score} </div>
            }
        </div>
    );
};

export default Pokemons;