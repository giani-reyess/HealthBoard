export class BodyCalculator {
    
    #height : number
    #weight : number
    #age : number
    #sex : string
    #waist : number

    public constructor(height: number,
                       weight: number,
                       age: number,
                       sex: string,
                       waist: number
    ) {
        this.#height = height
        this.#weight = weight
        this.#age = age
        this.#sex = sex
        this.#waist = waist
    }

    public leanBodyMass() {
        
        // For mens
        if (this.#sex === "man") {
            let BLM = (0.3281 * this.#weight) + (0.33929 * this.#height) - 29.5336
            return +BLM.toFixed(2)
        }

        // For womens 
        if (this.#sex === "woman") {
            let BLM = (0.29569 * this.#weight) + (0.41813 * this.#height) - 43.2933
            return +BLM.toFixed(2)
        }
    }


    public bodyMassIndex() : number{
        let formula: number = this.#weight / (this.#height / 100) **2 
        return +formula.toFixed(2)
    }


    public bodyFatPercentage(){
        
        // For mens
        if (this.#sex == "man"){
            let BFP: number = (1.20 * this.bodyMassIndex() + 0.23 * this.#age) - 16.2
            return +BFP.toFixed(2)
        }
        // For mens under 15
        if (this.#sex == "man" && this.#age <= 15){ 
            let BFP = 1.51 * this.bodyMassIndex() - 0.70 * this.#age - 2.2
            return +BFP.toFixed(2)
        }
        
        // For womens 
        if (this.#sex == "woman"){
            let BFP = 1.20 * this.bodyMassIndex() + 0.23 * this.#age - 5.4
            return +BFP.toFixed(2)
        }
        
        // For womens under 15
        if (this.#sex == "woman" && this.#age <= 15){ 
            let BFP = 1.51 * this.bodyMassIndex() - 0.70 * this.#age + 1.4
            return +BFP.toFixed(2) 
        } 
    }

    public basal_Metabolic_Rate(){
        
        let s: number = 0
        
        if (this.#sex == "man") { s =+ 5 }
        if (this.#sex == "woman") { s =- 161 }
            
        let BMR = (this.#weight * 10 ) + (this.#height * 6.25) - (this.#age * 5) + s 
        return +BMR.toFixed(2) 
    } 
    
}

