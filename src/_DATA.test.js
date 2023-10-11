import { _saveQuestion, _saveQuestionAnswer } from "./_DATA"

describe('saveQuestion', () => {

    it('will return saved question and all expected field are populated', async () => {
        const questionParameter = {
            optionOneText : "option1", 
            optionTwoText: "option2",
            author:"author"
        }
        const result = await _saveQuestion(questionParameter)
        expect(result.optionOne.text).toEqual('option1')
        expect(result.optionTwo.text).toEqual('option2')
        expect(result.author).toEqual('author')
  
    })

    it('will return an error if inconsitent data is passed to the function', async() => {
        const inconsistentQuestionParameter = {
            optionOneText: 'option1',
            optionTwoText: 'option2'}
        await expect(_saveQuestion(inconsistentQuestionParameter)).rejects.toEqual('Please provide optionOneText, optionTwoText, and author')

    })
})

describe('saveQuestionAnswer',  () => {
    it('will return true if correctly formated data is passed to the function', async() => {
        const authedUser = 'sarahedo'
        const qid = '8xf0y6ziyjabvozdd253nd'
        const answer = 'optionOne'
        const promise = await _saveQuestionAnswer({authedUser, qid, answer})
        const result = await promise;
        expect(result).toBe(true);
    })
    it('will return error if there is invalid input data', async() => {
    
        const qid = '8xf0y6ziyjabvozdd253nd'
        const answer = 'optionOne'
        await expect(_saveQuestionAnswer({ qid, answer})).rejects.toBe('Please provide authedUser, qid, and answer');

    })

})

