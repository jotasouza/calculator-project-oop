class CalcController{
    constructor(){
        this._lastOperator         = ''
        this._lastNumber           = ''

        this._operation            = []
        this._locale               = 'pt-BR'
        this._timeElement          = document.querySelector('#hora')
        this._dateElement          = document.querySelector('#data')
        this._displayCalcElement   = document.querySelector('#display')
        this._currentDate
        this.initialize()
        this.initButtonsEvents()
        this.initKeyboard()
    }

    get displayCalc(){
        return this._displayCalcElement.innerHTML
    }

    set displayCalc(newValue){
        this._displayCalcElement.innerHTML =  newValue
    }

    get currentDate(){
        return new Date()
    }

    set currentDate(newDate){
        this._currentDate = newDate
    }

    get displayTime(){
        return this._timeElement.innerHTML
    }

    set displayTime(newValue){
        return this._timeElement.innerHTML = newValue
    }

    get displayDate(){
        return this._dateElement.innerHTML
    }

    set displayDate(newValue){
        return this._dateElement.innerHTML = newValue
    }
    
    initialize(){
        this.setDisplayDateTime()

        setInterval(() => {

                this.setDisplayDateTime()
                
        }, 1000)

        this.setLastNumberToDisplay()
    }

    //método que faz a captura das teclas
    initKeyboard(){

        document.addEventListener('keyup', event => {

            switch(event.key){
                case 'Escape':
                    this.clearAll()
                    break
                case 'Backspace':
                    this.clearEntry()
                    break
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    this.addOperation(event.key)
                    break
                case 'Enter':
                case '=':
                    this.calculate()
                    break
                case '.':
                case ',':
                    this.addDot()
                    break
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(parseInt(event.key))
                    break                
            }
        })

    }

    addEventListenerAll(element, events, fn){
        
        events.split(' ').forEach( event => {
            element.addEventListener(event, fn, false)
        })
    }

    //método que limpa todas as operações
    clearAll(){
        this._operation = []
        this._lastNumber = ''
        this._lastOperator = ''

        this.setLastNumberToDisplay()
    }

    //método que limpa apenas a última entrada
    clearEntry(){
        
        this._operation.pop()

        this.setLastNumberToDisplay()
    }

    //método que retorna a ultima operação do array
    getLastOperation(){
      return this._operation[this._operation.length - 1]
    }

    //método que seta a ultima operação do array
    setLastOperation(value){
        return this._operation[this._operation.length - 1] = value
      }

    //método que verifica se a última operação é um operador
    isOperator(value){
        const arrOperators = ['+', '-', '*', '/', '%']

       return (arrOperators.indexOf(value) > -1)
       
    }

    //método responsável por fazer o push no array de operações
    pushOperator(value){
        this._operation.push(value)

        if(this._operation.length > 3){

            this.calculate()
        }
    }

    //método que retorna o eval da operação
    getResult(){
        return eval(this._operation.join(''))
    }

    //metodo responsavel por realizar as operações
    calculate(){

        let lastOperation = ''

        this._lastOperator = this.getLastItem()

        if(this._operation.length < 3){
            let firstItem = this._operation[0]
            this._operation = [firstItem, this._lastOperator, this._lastNumber]
        }

        //verifica se o ultimo item do array é um número ou uma operação
        //para tratar a excessão de pressionar mais de uma vez a tecla igual
        if(this._operation.length > 3){
            lastOperation = this._operation.pop()
            
            this._lastNumber = this.getResult()

        }else if(this._operation.length === 3){

            this._lastNumber = this.getLastItem(false)
        }

        let result = this.getResult()

        if(lastOperation   === '%'){

            result = result / 100

            this._operation = [result]

        }else{ 

            this._operation = [result]

            if(lastOperation){
                this._operation.push(lastOperation)
            }

        }

        this.setLastNumberToDisplay()

    }

    getLastItem(isOperator = true){

        let lastItem;

        for(let i = this._operation.length - 1; i >= 0; i--){

            if(this.isOperator(this._operation[i]) == isOperator){
                lastItem = this._operation[i]
                break
            }
        }

        if(!lastItem){

            lastItem = (isOperator) ? this._lastOperator : this._lastNumber

        }

            return lastItem

    }
    
    
    //método que mostra o ultimo numero no display
    setLastNumberToDisplay(){

        let lastNumber = this.getLastItem(false);

        if(!lastNumber){

            lastNumber = 0
        }

        this.displayCalc = lastNumber
    }

    //método que adiciona uma operação ao array de operações
    addOperation(value){

        if(isNaN(this.getLastOperation())){

            if(this.isOperator(value)){

                this.setLastOperation(value)
               

            }else {

                this.pushOperator(value)
                this.setLastNumberToDisplay()

            }

        }else {

            if(this.isOperator(value)){
                
                this.pushOperator(value)

            }else {

                let newValue =  this.getLastOperation().toString() + value.toString()
                this.setLastOperation(newValue)

                this.setLastNumberToDisplay()

            }

        }
        
       
        console.log(this._operation)
    }

    //método que defini um erro no display, caso a operação não esteja prevista
    setError(){
        this.displayCalc = 'Error'
    }

    //método para tratar quando é inserido o ponto
    //float
    addDot(){
        let lastOperation = this.getLastOperation()  

        if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1){
            return
        }

        if(this.isOperator(lastOperation) || !lastOperation){
            this.pushOperator('0.')
        }else{
            this.setLastOperation(lastOperation.toString() + '.')
        }

        this.setLastNumberToDisplay()
    }

    //método que recebe o rotorno do botão e executa determinada função
    executeButton(valueButton){

        switch(valueButton){
            case 'ac':
                this.clearAll()
                break

            case 'ce':
                this.clearEntry()
                break

            case 'soma':
                this.addOperation('+')
                break
            
            case 'subtracao':
                this.addOperation('-')
                break

            case 'multiplicacao':
                this.addOperation('*')
                break

            case 'divisao':
                this.addOperation('/')
                break
            
            case 'porcento':
                this.addOperation('%')
                break
    
            case 'ponto':
                this.addDot()
                break    

            case 'igual':
                this.calculate()
                break

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(valueButton))
                break

            default:
                this.setError()
                break
            
        }

    }

    initButtonsEvents(){

       let buttons = document.querySelectorAll('#buttons > g, #parts > g')

       buttons.forEach( (button, index) =>{

            this.addEventListenerAll(button, 'click drag', event  => {
                
                let textButton = button.className.baseVal.replace('btn-', '')

                this.executeButton(textButton)

            })

            this.addEventListenerAll(button, 'mouseover mouseup mousedown', event  => {
                button.style.cursor = 'pointer'
            })

       })

    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale)
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale)
    }
}
