class CalcController{
    constructor(){
        this._operation            = []
        this._locale               = 'pt-BR'
        this._timeElement          = document.querySelector('#hora')
        this._dateElement          = document.querySelector('#data')
        this._displayCalcElement   = document.querySelector('#display')
        this._currentDate
        this.initialize()
        this.initButtonsEvents()
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
    }

    addEventListenerAll(element, events, fn){
        
        events.split(' ').forEach( event => {
            element.addEventListener(event, fn, false)
        })
    }

    //método que limpa todas as operações
    clearAll(){
        this._operation = []
        this.displayCalc(0)
    }

    //método que limpa apenas a última entrada
    clearEntry(){
        let clear = this.getLastOperation().toString().split(',').
        console.log(clear)
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

    //metodo responsavel por realizar as operações
    calculate(){

        let lastOperator = this._operation.pop()

        let result = eval(this._operation.join(''))

        this._operation = [result, lastOperator]

        this.setLastNumberToDisplay()

    }

    //método que mostra o ultimo numero no display
    setLastNumberToDisplay(){

        let lastNumber;

        for(let i = this._operation.length - 1; i >= 0; i--){
            if(!this.isOperator(this._operation[i])){
                lastNumber = this._operation[i]
                break
            }
        }

        this.displayCalc = lastNumber
    }

    //método que adiciona uma operação ao array de operações
    addOperation(value){

        if(isNaN(this.getLastOperation())){

            if(this.isOperator(value)){

                this.setLastOperation(value)
               

            }else if(isNaN(value)) {

               console.log('Outra coisa', value)

            }else {

                this.pushOperator(value)
                this.setLastNumberToDisplay()

            }

        }else {

            if(this.isOperator(value)){
                
                this.pushOperator(value)

            }else {

                let newValue =  this.getLastOperation().toString() + value.toString()
                this.setLastOperation(parseInt(newValue))

                this.setLastNumberToDisplay()

            }

        }
        
       
        console.log(this._operation)
    }

    //método que defini um erro no display, caso a operação não esteja prevista
    setError(){
        this.displayCalc = 'Error'
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
                this.addOperation('.')
                break    

            case 'igual':
                //this.calculate()
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
