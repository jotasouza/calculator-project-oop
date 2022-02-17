class CalcController{
    constructor(){
        this._locale               = 'pt-BR'
        this._timeElement          = document.querySelector('#hora')
        this._dateElement          = document.querySelector('#data')
        this._displayCalcElement   = document.querySelector('#display')
        this._currentDate
        this.initialize()
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

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale)
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale)
    }
}
