export class KeyBoard{
    #switchEl
    #fontSelectEl
    #containerEl
    #keyBoardEl
    #inputGroupEl
    #inputEl
    #keyPress = false
    #mouseDown = false

    constructor() {
        this.#assignElement()
        this.#addEvent()
    }
    #assignElement(){
        this.#containerEl = document.getElementById('container')
        this.#switchEl =  this.#containerEl.querySelector('#switch') //특정 단위부터 찾도록 알고있는 범위 내에서 미리 범위를 변수로 설정. 단, 이때는 QuerySelector 를 사용해야만 함
        this.#fontSelectEl = this.#containerEl.querySelector('#font')
        this.#keyBoardEl = this.#containerEl.querySelector('#keyboard')
        this.#inputGroupEl = this.#containerEl.querySelector('#input-group')
        this.#inputEl = this.#inputGroupEl.querySelector("#input")
    }

    #addEvent() {
        this.#switchEl.addEventListener('change', (e) => {
            document.documentElement.setAttribute(
                'theme', e.target.checked ? 'dark-mode' : ''
            )
        })

        this.#fontSelectEl.addEventListener('change', (e) => {
            document.body.style.fontFamily = e.target.value
        })

        document.addEventListener('keydown', (e) => {
            if(this.#mouseDown) return
            this.#keyPress = true
            this.#keyBoardEl.querySelector(`[data-code="${e.code}"]`)?.classList.add("active")
            this.#inputGroupEl.classList.toggle(
                'error', 
                e.key==='Process'

            )
        })

        document.addEventListener('keyup', (e) => {
            if(this.#mouseDown) return
            this.#keyPress = false
            this.#keyBoardEl.querySelector(`[data-code="${e.code}"]`)?.classList.remove("active")
        })

        this.#inputEl.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,'')
        })

        this.#keyBoardEl.addEventListener('mousedown', (e) => {
            if(this.#keyPress) return
            this.#mouseDown = true
            e.target.closest('div.key')?.classList.add("active")
        })

        document.addEventListener('mouseup', (e) => {
            if(this.#keyPress) return
            this.#mouseDown = false
            const keyEl = e.target.closest('div.key')
            const isActive = !!keyEl?.classList.contains('active')
            const val = keyEl?.dataset.val
            
            if(isActive && !!val && val != 'Space' && val != 'Backspace'){
                this.#inputEl.value += val
            }

            if(isActive && val === 'Space') {
                this.#inputEl.value += ' '
            }

            if(isActive && val === 'Backspace') {
                this.#inputEl.value = this.#inputEl.value.slice(0, -1)
            }
            this.#keyBoardEl.querySelector('.active')?.classList.remove("active")
        })
        
        
        
    }
}